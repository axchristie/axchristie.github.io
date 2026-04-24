import * as THREE from 'three'
import gsap from "gsap"
import Experience from '../Experience.js'
import World from '../world/World.js'

export default class DOMEvents
{
	constructor()
	{
		// Setup
		this.experience = new Experience()
		this.world = new World()
		this.camera = this.experience.camera

		// Custom Uniforms
		this.customUniforms = this.experience.customUniforms

		// Test
		this.test()
	}

	test()
	{
		this.blah = document.querySelector('.splash-front')
		this.blah.onclick = () =>
		{
			// Camera
			gsap.to(this.experience.customUniforms.camera.value, { z: 20, duration: 2, ease: 'linear' })

			// Shader
			gsap.to(this.experience.customUniforms.shaderScale, { z: 0.2, duration: 1, ease: 'linear' })

			// Magic Group
			gsap.to(this.customUniforms.magicGroup.value, { y: 2, duration: 2, ease: 'linear' })

			// Magic BackgroundGroup
			gsap.to(this.customUniforms.magicBackgroundGroup.value, { y: 30, duration: 2, ease: 'linear' })

			// splash-front
			setTimeout(() => {
				this.blah.style.visibility = 'hidden'
			}, 2000)
		}

	}
}
