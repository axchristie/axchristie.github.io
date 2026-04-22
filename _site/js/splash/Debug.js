import * as THREE from 'three'
import * as dat from 'lil-gui'
import Experience from './Experience.js'

export default class Debug
{
	constructor()
	{
		// Setup
		this.experience = new Experience()
		this.sizes = this.experience.sizes
		this.time = this.experience.time
		this.mouse = this.experience.mouseControls.mouse
		this.customUniforms = this.experience.customUniforms
		this.colorObject = this.experience.uniforms.colorObject
		this.active = window.location.hash === '#debug'

		if(this.active)
		{
			//this.createStats()

			this.ui = new dat.GUI()

			this.createDebugUI()
		}
	}

	createStats()
	{
		this.stats = new Stats()
		this.stats.showPanel(0)
		document.body.appendChild(this.stats.dom)
		this.statsElement = document.getElementsByTagName('canvas')[1]
		this.statsElement.style.top = "6vh"
		this.statsElement.style.left = "1vh"
		this.statsElement.style.width = "100px"
		this.statsElement.style.height = "60px"
	}

	createDebugUI()
	{
		// Mouse
		this.debugFolderMouse = this.ui.addFolder('Mouse')

		this.debugFolderMouse
			.add(this.mouse.x, 'value')
			.name('x')
			.listen()

		this.debugFolderMouse
			.add(this.mouse.y, 'value')
			.name('y')
			.listen()

		// Shader Position
		this.debugFolderShaderPosition = this.ui.addFolder('Position')

		this.debugFolderShaderPosition
			.add(this.customUniforms.shaderPosition, 'x')
			.min(-5)
			.max(5)
			.step(0.01)
			.name('x')

		this.debugFolderShaderPosition
			.add(this.customUniforms.shaderPosition, 'y')
			.min(-5)
			.max(5)
			.step(0.01)
			.name('y')

		this.debugFolderShaderPosition
			.add(this.customUniforms.shaderPosition, 'z')
			.min(-5)
			.max(5)
			.step(0.01)
			.name('z')

		// Shader Rotation
		this.debugFolderShaderRotation = this.ui.addFolder('Rotation')

		this.debugFolderShaderRotation
			.add(this.customUniforms.shaderRotation, 'x')
			.min(-Math.PI)
			.max(Math.PI)
			.step(0.001)
			.name('x')
		
		this.debugFolderShaderRotation
			.add(this.customUniforms.shaderRotation, 'y')
			.min(-Math.PI)
			.max(Math.PI)
			.step(0.001)
			.name('y')
		
		this.debugFolderShaderRotation
			.add(this.customUniforms.shaderRotation, 'z')
			.min(-Math.PI)
			.max(Math.PI)
			.step(0.001)
			.name('z')

		// Color
		this.debugFolderColor = this.ui.addFolder('Color')

		this.debugFolderColor
			.addColor(this.colorObject, 'surfaceColor')

		this.debugFolderColor
			.addColor(this.colorObject, 'depthColor')

		// Big Waves
		this.debugFolderBigWaves = this.ui.addFolder('Big Waves')

		this.debugFolderBigWaves
			.add(this.customUniforms.uBigWavesSpeed, 'value')
			.min(0)
			.max(0.01)
			.step(0.0001)
			.name('Speed')

		this.debugFolderBigWaves
			.add(this.customUniforms.uBigWavesFrequency.value, 'x')
			.min(0)
			.max(20)
			.step(0.01)
			.name('X Frequency')

		this.debugFolderBigWaves
			.add(this.customUniforms.uBigWavesFrequency.value, 'y')
			.min(0)
			.max(20)
			.step(0.01)
			.name('Y Frequency')

		this.debugFolderBigWaves
			.add(this.customUniforms.uBigWavesElevation, 'value')
			.min(0)
			.max(1)
			.step(0.001)
			.name('Elevation')

		// Small Waves
		this.debugFolderSmallWaves = this.ui.addFolder('Small Waves')

		this.debugFolderSmallWaves
			.add(this.customUniforms.uSmallWavesSpeed, 'value')
			.min(0)
			.max(0.01)
			.step(0.0001)
			.name('Speed')

		this.debugFolderSmallWaves
			.add(this.customUniforms.uSmallWavesFrequency, 'value')
			.min(0)
			.max(20)
			.step(0.01)
			.name('Frequency')

		this.debugFolderSmallWaves
			.add(this.customUniforms.uSmallWavesElevation, 'value')
			.min(0)
			.max(1)
			.step(0.001)
			.name('Elevation')

		this.debugFolderSmallWaves
			.add(this.customUniforms.uSmallWavesIterations, 'value')
			.min(0)
			.max(5)
			.step(1)
			.name('Iterations')
	}
}
