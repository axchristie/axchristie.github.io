import * as THREE from 'three'
import gsap from "gsap"
import Experience from '../Experience.js'

export default class DOMEvents
{
	constructor()
	{
		// Setup
		this.experience = new Experience()
		this.camera = this.experience.camera

		// Test
		this.test()
	}

	test()
	{
		this.blah = document.querySelector('.splash-front')
		this.blah.onclick = () =>
		{
			/*
			gsap.to(this.experience.customUniforms.camera.value, { y: 5, duration: 2, ease: 'linear' })
			gsap.to(this.experience.customUniforms.camera.value, { x: 5, duration: 2, ease: 'linear' })
			setTimeout(() => {
				this.blah.style.visibility = 'hidden'
			}, 300)
			*/

			setTimeout(() => {
			}, 500)

			gsap.to(this.experience.customUniforms.camera.value, { z: 20, duration: 2, ease: 'linear' })
				gsap.to(this.experience.customUniforms.shaderPosition, { y: 2.0, duration: 2, ease: 'linear' })
				gsap.to(this.experience.customUniforms.title.value, { y: 4.0, duration: 2, ease: 'linear' })
				gsap.to(this.experience.customUniforms.shaderScale, { z: 0.2, duration: 1, ease: 'linear' })

			setTimeout(() => {
			}, 2000)
			setTimeout(() => {
				this.blah.style.visibility = 'hidden'
				//gsap.to(this.experience.customUniforms.shaderPosition, { y: 11.0, duration: 2, ease: 'linear' })
				//gsap.to(this.experience.customUniforms.title.value, { y: 18.0, duration: 2, ease: 'linear' })
			}, 4000)
		}

	}
}
