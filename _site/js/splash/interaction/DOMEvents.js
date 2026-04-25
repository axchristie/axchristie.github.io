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
			//gsap.to(this.customUniforms.magicBackgroundGroup.value, { y: 30, duration: 2, ease: 'linear' })
			gsap.to(this.customUniforms.magicBackgroundGroup.value, { y: 54, duration: 2, ease: 'linear' })

			// splash-front
			setTimeout(() => {
				this.blah.style.visibility = 'hidden'
				document.body.appendChild(this.experience.el)

				const el = document.querySelector('.test')
				const rect = el.getBoundingClientRect()
				
				const absoluteTop = window.scrollY + rect.top
				const offset = window.innerHeight * 0.75
				
				window.scrollTo({
				  top: absoluteTop - offset,
				  behavior: 'smooth'
				})
			}, 2000)

			setTimeout(() => {
				///gsap.to(this.customUniforms.magicBackgroundGroup.value, { y: 54, duration: 2, ease: 'linear' })
			}, 2000)

		}

	}
}
