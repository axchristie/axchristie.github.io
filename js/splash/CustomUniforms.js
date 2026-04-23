import * as THREE from 'three'
import Experience from './Experience.js'

export default class CustomUniforms
{
	constructor()
	{
		this.experience = new Experience()
		this.time = this.experience.time
		this.createColorObject()
		this.createCustomUniforms()
	}

	createColorObject()
	{
		this.colorObject = {}
		this.colorObject.surfaceColor = '#6661f7'
		this.colorObject.depthColor = '#6606c9'
	}
	
	createCustomUniforms()
	{
		this.customUniforms = {
			shaderPosition: new THREE.Vector3(0, 0, 0),
			shaderRotation: new THREE.Vector3(Math.PI * 0.5, 0, 0),

			uTime: { value: this.time.elapsed },

			uBigWavesSpeed: { value: 0.0005 },
			uBigWavesFrequency: { value: new THREE.Vector2(0.74, 1.72) },
			uBigWavesElevation: { value: 0.75 },

			uSmallWavesSpeed: { value: 0.00005 },
			uSmallWavesFrequency: { value: 3.0 },
			uSmallWavesElevation: { value: 0.5 },

			uSurfaceColor: { value: new THREE.Color(this.colorObject.surfaceColor) },
			uDepthColor: { value: new THREE.Color(this.colorObject.depthColor) },
			uColorOffset: { value: 0.08 },
			uColorMultiplier: { value: 1.0 },
			uSmallWavesIterations: { value: 4.0 },

			camera: { value: new THREE.Vector3(0, 0, 10) }

		}
	}
}
