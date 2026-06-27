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

		this.navbarScrollMultiplier = 2.5

		// state
		this.state = 'splash'	// splash, navbar, goback

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

			// Add section
			setTimeout(() => {
				this.blah.style.visibility = 'hidden'
				//document.body.removeChild(this.blah)
				//document.body.appendChild(this.blah)
				
				document.body.appendChild(this.experience.el)

				//const el = document.querySelector('.test')
				const rect = this.experience.el.getBoundingClientRect()
				
				const absoluteTop = window.scrollY + rect.top
				const offset = window.innerHeight * 0.4
				
				window.scrollTo({
				  top: absoluteTop - offset,
				  behavior: 'smooth'
				})
			}, 2000)
		}

	}

	/************
	 ** UPDATE **
	 ***********/
	updateSplash()
	{
		//console.log('splashy')
		if(this.experience.mouseControls.scrollProgress > 0.2){ this.state = 'navbar' }
	}

	updateNavbar()
	{
		//console.log(this.experience.mouseControls.scrollProgress)

		// Position title and shader from scrollProgress
		this.customUniforms.title.value.y = (this.experience.mouseControls.scrollProgress * 20 * this.navbarScrollMultiplier)
		this.customUniforms.shaderPosition.y = (this.experience.mouseControls.scrollProgress * 14 * this.navbarScrollMultiplier) - 1.7

		// Clamp title and shader pos to make them sticky
		if(this.customUniforms.title.value.y > 16.5){
			this.customUniforms.title.value.y = 16.5
			this.customUniforms.shaderPosition.y = 9.87
		}

		if(this.customUniforms.magicBackgroundGroup.value.y < 74)
		{
			//this.customUniforms.magicGroup.value.y = (this.experience.mouseControls.scrollProgress * 10)
			this.customUniforms.magicBackgroundGroup.value.y = 60 + (this.experience.mouseControls.scrollProgress * 50)
		}

		// Fire goback state
		if(this.experience.mouseControls.scrollProgress < 0.15){ this.state = 'goback' }

			//this.customUniforms.magicBackgroundGroup.value.y = 73.9

		// Transition to navbar once .test class hits top of window
		//let rect = document.querySelector('.test').getBoundingClientRect()
		//if(rect.top < 10){ this.state = 'navbar' }
		//if(this.experience.mouseControls.scrollProgress < 0.1){ this.state = 'navbar' }
	}

	updateGoBack()
	{
		// Title and Shader
		this.customUniforms.title.value.y = 2.0
		this.customUniforms.shaderPosition.y = 0

		// Camera
		gsap.to(this.experience.customUniforms.camera.value, { z: 10, duration: 2, ease: 'linear' })

		// Shader
		gsap.to(this.experience.customUniforms.shaderScale, { z: 1, duration: 1, ease: 'linear' })

		// Magic Group
		gsap.to(this.customUniforms.magicGroup.value, { y: 0, duration: 2, ease: 'linear' })

		// Magic Background Group
		gsap.to(this.customUniforms.magicBackgroundGroup.value, { y: 0, duration: 2, ease: 'linear' })

		this.blah.style.visibility = 'visible'

		this.experience.el.remove()

		setTimeout(() => {
			this.state = 'splash'
		}, 2000)
	}

	update()
	{
		//console.log(this.state, this.experience.mouseControls.scrollProgress)
		switch(this.state) {
			case 'splash':
				this.updateSplash()
				break

			case 'navbar':
				this.updateNavbar()
				break

			case 'goback':
				this.updateGoBack()
				break

			default:
				console.log("We don't have a proper state")
		}
	}
}
