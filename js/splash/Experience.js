import * as THREE from 'three'
import Camera from './Camera.js'
import CustomUniforms from './CustomUniforms.js'
import Debug from './Debug.js'
import MouseControls from './interaction/Mouse.js'
import Renderer from './Renderer.js'
import Sizes from './utils/Sizes.js'
import Time from './utils/Time.js'
import World from './world/World.js'

let instance = null

export default class Experience
{
	constructor(canvas)
	{
		// Singleton
		if(instance) { return instance }
		instance = this

		// Options
		this.canvas = canvas

		// Setup
		this.sizes = new Sizes()
		this.time = new Time()
		this.scene = new THREE.Scene()
		this.camera = new Camera()	
		this.renderer = new Renderer()
		this.uniforms = new CustomUniforms()
		this.customUniforms = this.uniforms.customUniforms

		// Controls
		this.mouseControls = new MouseControls()
		this.mouse = this.mouseControls.mouse

		// Mobile
		this.isMobile = false

		// Debug
		this.debug = new Debug()

		// World
		this.world = new World()

		// Fire resize to capture isMobile
		this.sizes.resize()

		// Remove sections
		this.sections = document.querySelector('.sections')
		this.sections.remove()

		// Resize event
		window.addEventListener('resize', () =>
			{
				this.resize()
			})

		// Update event
		window.requestAnimationFrame(() =>
			{
				this.update()
			})
	}

	resize()
	{
		this.sizes.resize()
		this.camera.resize()
		this.renderer.resize()
	}

	update()
	{
		/*
		if(this.debug.active)
		{
			this.debug.stats.begin()
		}
		*/

		this.time.tick()
		this.camera.update()
		this.world.update()
		this.renderer.update()

		window.requestAnimationFrame(() =>
			{
				this.update()
			})

		/*
		if(this.debug.stats)
		{
			this.debug.stats.end()
		}
		*/
	}
}
