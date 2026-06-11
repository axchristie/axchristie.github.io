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

		// state
		this.state = 'splash'	// splash, transition, navbar

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
			gsap.to(this.customUniforms.magicBackgroundGroup.value, { y: 74, duration: 2, ease: 'linear' })

			// splash-front
			setTimeout(() => {
				this.state = 'transition'

				this.blah.style.visibility = 'hidden'
				//document.body.removeChild(this.blah)
				//document.body.appendChild(this.blah)
				
				document.body.appendChild(this.experience.el)

				const el = document.querySelector('.test')
				const rect = el.getBoundingClientRect()
				
				const absoluteTop = window.scrollY + rect.top
				const offset = window.innerHeight * 0.70
				
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

	/************
	 ** UPDATE **
	 ***********/
	updateSplash()
	{
		//console.log('splashy')
	}

	updateTransition()
	{
		//console.log('transitionz')
		//console.log(this.experience.mouseControls.scrollProgress)

		if(this.customUniforms.title.value.y < 16.5)
		{
			this.customUniforms.title.value.y = (this.experience.mouseControls.scrollProgress * 30)
			this.customUniforms.shaderPosition.y = (this.experience.mouseControls.scrollProgress * 21) - 1.7
			//console.log(this.customUniforms.title.value.y)
		}

		if(this.customUniforms.magicBackgroundGroup.value.y < 74)
		{
			//this.customUniforms.magicGroup.value.y = (this.experience.mouseControls.scrollProgress * 10)
			this.customUniforms.magicBackgroundGroup.value.y = 60 + (this.experience.mouseControls.scrollProgress * 50)
		}

		// COME BACK TO ADD NAV STATE
		//if(document.body.contains(this.blah)){ console.log('y') }
		let rect = document.querySelector('.test').getBoundingClientRect()
		console.log(rect.top)

		if(rect.top < 10 && document.body.contains(this.blah))
		{
			document.body.removeChild(this.blah)
		}
		
			//gsap.to(this.customUniforms.magicBackgroundGroup.value, { y: 30, duration: 2, ease: 'linear' })
	}

	update()
	{
		switch(this.state) {
			case 'splash':
				this.updateSplash()
				break

			case 'transition':
				this.updateTransition()
				break

			default:
				console.log("We don't have a proper state")
		}
	}
}
