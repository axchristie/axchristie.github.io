import * as THREE from 'three'
import gsap from "gsap"
import Experience from '../Experience.js'

export default class DOMEvents
{
	constructor()
	{
		// Setup
		this.experience = new Experience()

		// Test
		this.test()
	}

	test()
	{
		this.blah = document.querySelector('.splash-front')
		this.blah.onclick = () =>
		{
			//gsap.to(this.experience.customUniforms.camera.value, { z: -20, duration: 2, ease: 'linear' })
			//gsap.to(this.experience.customUniforms.shaderRotation, { x: 0, duration: 2, ease: 'linear' })
			//gsap.to(this.experience.customUniforms.shaderPosition, { y: -8, duration: 2, ease: 'linear' })
			gsap.to(this.experience.customUniforms.shaderPosition, { z: 15, duration: 2, ease: 'linear' })
		}

	}
}
