import * as THREE from 'three'
import Experience from '../Experience.js'
import World from './World.js'

export default class Shader
{
	constructor()
	{
		// Setup
		this.experience = new Experience()
		this.world = new World()
		this.scene = this.experience.scene
		this.time = this.experience.time
		this.mouse = this.experience.mouseControls.mouse

		// Debug
		this.debug = this.experience.debug
	
		// Initialization
		this.shaderGeometry()
		this.shaderMaterial()
		this.shaderMesh()

		// Custom Uniforms
		this.customUniforms = this.experience.uniforms.customUniforms
		this.colorObject = this.experience.uniforms.colorObject

		// Shader Injection
		this.shaderMaterial.onBeforeCompile = (shader) =>
		{
			this.vertexShaderInitialization(shader)
			this.vertexShaderTransformation(shader)
			this.fragmentShaderInitialization(shader)
			this.fragmentShaderTransformation(shader)
		}
	}

	layout()
	{
		//const portrait = this.experience.sizes.aspectRatio < 1
	}

	shaderGeometry()
	{
		this.shaderGeometry = new THREE.PlaneGeometry(15, 10, 384, 384)
	}

	shaderMaterial()
	{
		this.shaderMaterial = new THREE.MeshStandardMaterial({
			side: THREE.DoubleSide,
			wireframe: true,
		})
	}

	shaderMesh()
	{
		this.shaderMesh = new THREE.Mesh(this.shaderGeometry, this.shaderMaterial)
		this.world.magicGroup.add(this.shaderMesh)
		this.shaderMesh.userData.relativeQuat = new THREE.Quaternion()
		this.shaderMesh.userData.relativeQuat.copy(this.experience.camera.instance.quaternion).invert().multiply(this.shaderMesh.quaternion)
	}

	vertexShaderInitialization(shader)
	{
		// Uniforms
		shader.uniforms.uTime = this.customUniforms.uTime
		
		shader.uniforms.uMouseX = this.mouse.x
		shader.uniforms.uMouseY = this.mouse.y

		shader.uniforms.uBigWavesSpeed = this.customUniforms.uBigWavesSpeed
		shader.uniforms.uBigWavesFrequency = this.customUniforms.uBigWavesFrequency
		shader.uniforms.uBigWavesElevation = this.customUniforms.uBigWavesElevation

		shader.uniforms.uSmallWavesSpeed = this.customUniforms.uSmallWavesSpeed
		shader.uniforms.uSmallWavesFrequency = this.customUniforms.uSmallWavesFrequency
		shader.uniforms.uSmallWavesElevation = this.customUniforms.uSmallWavesElevation
		shader.uniforms.uSmallWavesIterations = this.customUniforms.uSmallWavesIterations

		shader.uniforms.uSurfaceColor = this.customUniforms.uSurfaceColor
		shader.uniforms.uDepthColor = this.customUniforms.uDepthColor
		shader.uniforms.uColorOffset = this.customUniforms.uColorOffset
		shader.uniforms.uColorMultiplier = this.customUniforms.uColorMultiplier
		
		// Injection
		shader.vertexShader = shader.vertexShader.replace(
			`#include <common>`,
			`#include <common>
			
			// Uniforms
			uniform float uTime;

			uniform float uMouseX;
			uniform float uMouseY;

			uniform float uBigWavesSpeed;
			uniform vec2 uBigWavesFrequency;
			uniform float uBigWavesElevation;

			uniform float uSmallWavesSpeed;
			uniform float uSmallWavesFrequency;
			uniform float uSmallWavesElevation;
			uniform float uSmallWavesIterations;

			// Varyings
			varying float vElevation;

			// Classic Perlin 3D Noise 
			// by Stefan Gustavson
			//
			vec4 permute(vec4 x)
			{
			    return mod(((x*34.0)+1.0)*x, 289.0);
			}
			vec4 taylorInvSqrt(vec4 r)
			{
			    return 1.79284291400159 - 0.85373472095314 * r;
			}
			vec3 fade(vec3 t)
			{
			    return t*t*t*(t*(t*6.0-15.0)+10.0);
			}
			
			float cnoise(vec3 P)
			{
			    vec3 Pi0 = floor(P); // Integer part for indexing
			    vec3 Pi1 = Pi0 + vec3(1.0); // Integer part + 1
			    Pi0 = mod(Pi0, 289.0);
			    Pi1 = mod(Pi1, 289.0);
			    vec3 Pf0 = fract(P); // Fractional part for interpolation
			    vec3 Pf1 = Pf0 - vec3(1.0); // Fractional part - 1.0
			    vec4 ix = vec4(Pi0.x, Pi1.x, Pi0.x, Pi1.x);
			    vec4 iy = vec4(Pi0.yy, Pi1.yy);
			    vec4 iz0 = Pi0.zzzz;
			    vec4 iz1 = Pi1.zzzz;
			
			    vec4 ixy = permute(permute(ix) + iy);
			    vec4 ixy0 = permute(ixy + iz0);
			    vec4 ixy1 = permute(ixy + iz1);
			
			    vec4 gx0 = ixy0 / 7.0;
			    vec4 gy0 = fract(floor(gx0) / 7.0) - 0.5;
			    gx0 = fract(gx0);
			    vec4 gz0 = vec4(0.5) - abs(gx0) - abs(gy0);
			    vec4 sz0 = step(gz0, vec4(0.0));
			    gx0 -= sz0 * (step(0.0, gx0) - 0.5);
			    gy0 -= sz0 * (step(0.0, gy0) - 0.5);
			
			    vec4 gx1 = ixy1 / 7.0;
			    vec4 gy1 = fract(floor(gx1) / 7.0) - 0.5;
			    gx1 = fract(gx1);
			    vec4 gz1 = vec4(0.5) - abs(gx1) - abs(gy1);
			    vec4 sz1 = step(gz1, vec4(0.0));
			    gx1 -= sz1 * (step(0.0, gx1) - 0.5);
			    gy1 -= sz1 * (step(0.0, gy1) - 0.5);
			
			    vec3 g000 = vec3(gx0.x,gy0.x,gz0.x);
			    vec3 g100 = vec3(gx0.y,gy0.y,gz0.y);
			    vec3 g010 = vec3(gx0.z,gy0.z,gz0.z);
			    vec3 g110 = vec3(gx0.w,gy0.w,gz0.w);
			    vec3 g001 = vec3(gx1.x,gy1.x,gz1.x);
			    vec3 g101 = vec3(gx1.y,gy1.y,gz1.y);
			    vec3 g011 = vec3(gx1.z,gy1.z,gz1.z);
			    vec3 g111 = vec3(gx1.w,gy1.w,gz1.w);
			
			    vec4 norm0 = taylorInvSqrt(vec4(dot(g000, g000), dot(g010, g010), dot(g100, g100), dot(g110, g110)));
			    g000 *= norm0.x;
			    g010 *= norm0.y;
			    g100 *= norm0.z;
			    g110 *= norm0.w;
			    vec4 norm1 = taylorInvSqrt(vec4(dot(g001, g001), dot(g011, g011), dot(g101, g101), dot(g111, g111)));
			    g001 *= norm1.x;
			    g011 *= norm1.y;
			    g101 *= norm1.z;
			    g111 *= norm1.w;
			
			    float n000 = dot(g000, Pf0);
			    float n100 = dot(g100, vec3(Pf1.x, Pf0.yz));
			    float n010 = dot(g010, vec3(Pf0.x, Pf1.y, Pf0.z));
			    float n110 = dot(g110, vec3(Pf1.xy, Pf0.z));
			    float n001 = dot(g001, vec3(Pf0.xy, Pf1.z));
			    float n101 = dot(g101, vec3(Pf1.x, Pf0.y, Pf1.z));
			    float n011 = dot(g011, vec3(Pf0.x, Pf1.yz));
			    float n111 = dot(g111, Pf1);
			
			    vec3 fade_xyz = fade(Pf0);
			    vec4 n_z = mix(vec4(n000, n100, n010, n110), vec4(n001, n101, n011, n111), fade_xyz.z);
			    vec2 n_yz = mix(n_z.xy, n_z.zw, fade_xyz.y);
			    float n_xyz = mix(n_yz.x, n_yz.y, fade_xyz.x); 
			    return 2.2 * n_xyz;
			}
			`
		)
	}

	vertexShaderTransformation(shader)
	{
		shader.vertexShader = shader.vertexShader.replace(
			`#include <begin_vertex>`,
			`#include <begin_vertex>

			float elevation = sin(transformed.x * uBigWavesFrequency.x + uTime * uBigWavesSpeed) *
					sin(transformed.y * uBigWavesFrequency.y + uTime * uBigWavesSpeed) *
					uBigWavesElevation;

			for(float i = 1.0; i <= uSmallWavesIterations; i++)
			{
				elevation -= cnoise(
						vec3(
							transformed.xy * uSmallWavesFrequency * i * (uMouseY * 1.0),
							uTime * uSmallWavesSpeed
							))
						* uSmallWavesElevation / i
						;
			}


			//elevation += cnoise(vec3(transformed.xy * uSmallWavesFrequency * (uMouseY * 2.0), uTime * uSmallWavesSpeed) * uSmallWavesElevation);

			transformed.z += elevation;

			// Varyings
			vElevation = elevation;
			`
		)
	}

	fragmentShaderInitialization(shader)
	{
		shader.fragmentShader = shader.fragmentShader.replace(
			`#include <packing>`,
			`#include <packing>

			uniform float uTime;
			uniform float uMouseX;
			uniform float uMouseY;

			uniform vec3 uSurfaceColor;
			uniform vec3 uDepthColor;
			uniform float uColorOffset;
			uniform float uColorMultiplier;

			varying float vElevation;
			`
		)
	}

	fragmentShaderTransformation(shader)
	{
		shader.fragmentShader = shader.fragmentShader.replace(
			`#include <color_fragment>`,
			`#include <color_fragment>

			float mixStrength = (vElevation + uColorOffset) * uColorMultiplier;
			vec3 color = mix(uSurfaceColor, uDepthColor, mixStrength);

			//color *= vec3(sin(uMouseX + 0.5), cos(uMouseX + 0.5), sin(uMouseX + 0.5));
			
			diffuseColor = vec4(color, 1.0);
			`
		)
	}

	update()
	{
		this.customUniforms.uTime.value = this.time.elapsed
		//this.customUniforms.uSurfaceColor.value = new THREE.Color(this.colorObject.surfaceColor) - silly
		this.customUniforms.uSurfaceColor.value = this.colorObject.surfaceColor.clone()
		//this.customUniforms.uDepthColor.value = new THREE.Color(this.colorObject.depthColor) - silly
		this.customUniforms.uDepthColor.value = this.colorObject.depthColor.clone()
		
		this.shaderMesh.position.copy(this.customUniforms.shaderPosition)
		this.shaderMesh.scale.copy(this.customUniforms.shaderScale)
		//this.shaderMesh.rotation.x = this.customUniforms.shaderRotation.x
		//this.shaderMesh.rotation.y = this.customUniforms.shaderRotation.y
		//this.shaderMesh.rotation.z = this.customUniforms.shaderRotation.z

		this.shaderMesh.lookAt(this.experience.camera.instance.position)
		this.shaderMesh.rotateX(Math.PI * 0.5)

		//this.shaderMesh.quaternion.copy(this.experience.camera.instance.quaternion).multiply(this.shaderMesh.userData.relativeQuat)


		//console.log(this.mouse.x.value, this.mouse.y.value)
	}
}
