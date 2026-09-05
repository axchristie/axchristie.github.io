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
		this.colorObject = this.experience.uniforms.colorObject

		// Custom Uniforms
		this.customUniforms = this.experience.customUniforms

		// state
		this.state = 'splash'	// splash, godown, navbar, goback

		// Test
		this.bindSplashClick()

		// Layout
		this.layout()
	}

	layout()
	{
		const portrait = this.experience.sizes.aspectRatio < 1

		// Use getVisibleExtents to position element at z-distance from camera
		const splashExtents = this.camera.getVisibleExtents(20)
		const titleExtents = this.camera.getVisibleExtents(30)
		const shaderExtents = this.camera.getVisibleExtents(20)

		// Portrait moves title to the bottom, occupying the vertical space
		this.titleSplashY = portrait ? -splashExtents.height * 0.26 : 2.0
		this.titleNavbarY = titleExtents.height * (portrait ? 0.34 : 0.359)
		this.shaderSplashY = portrait ? 1.0 : 0
		this.shaderNavbarY = shaderExtents.height * 0.32

		// Position magicBackground using getVisibleExtents
		const backgroundExtents = this.camera.getVisibleExtents(40)
		this.backgroundCutoffFraction = portrait ? 0.70 : 0.78
		this.backgroundNavbarY = (this.backgroundCutoffFraction * backgroundExtents.height * 0.5) + 50

		// Portrait exaggerates shaderScaleZ to fill vertical space
		this.shaderSplashScaleZ = portrait ? 3.0 : 1.0
		this.shaderNavbarScaleZ = 0.2

		if(this.state === 'splash')
		{
			this.customUniforms.title.value.y = this.titleSplashY
			this.customUniforms.shaderPosition.y = this.shaderSplashY
			this.customUniforms.shaderScale.z = this.shaderSplashScaleZ
		}
	}

	bindSplashClick()
	{
		this.splashFront = document.querySelector('.splash-front')
		this.splashFront.onclick = () =>
		{
			// Only proceed if we're intersecting
			if(!this.experience.mouseControls.intersected){ return }

			this.state = 'godown'

			// Manually set colorObject.surfaceColor to ensure user doesn't unset it via mousemove
			//this.colorObject.surfaceColor = new THREE.Color(this.experience.mouseControls.intersected.userData.params.color)

			// fadeOut menuGroup && remove domEl children
			for (const child of this.experience.world.menu.menuGroup.children)
			{
				// fadeOut
				gsap.to(child.material, { opacity: 0, duration: 2, ease: 'linear' })

				// remove domEl
				child.userData.params.domEl.remove()
			}

			// Camera
			gsap.to(this.experience.customUniforms.camera.value, { z: 20, duration: 2, ease: 'linear' })

			// Shader
			gsap.to(this.experience.customUniforms.shaderScale, { z: this.shaderNavbarScaleZ, duration: 1, ease: 'linear' })

			// Magic Group
			gsap.to(this.customUniforms.magicGroup.value, { y: 2, duration: 2, ease: 'linear' })

			// Magic BackgroundGroup
			//gsap.to(this.customUniforms.magicBackgroundGroup.value, { y: 30, duration: 2, ease: 'linear' })
			gsap.to(this.customUniforms.magicBackgroundGroup.value, { y: this.backgroundNavbarY, duration: 2, ease: 'linear' })

			// Set domEl
			let domEl = this.experience.mouseControls.intersected.userData.params.domEl

			// Add domEl
			setTimeout(() => {
				this.splashFront.style.visibility = 'hidden'
				
				document.body.appendChild(domEl)

				const rect = domEl.getBoundingClientRect()
				
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
		const p = this.experience.mouseControls.scrollProgress

		this.customUniforms.title.value.y = THREE.MathUtils.lerp(this.titleSplashY, this.titleNavbarY, p)
		this.customUniforms.shaderPosition.y = THREE.MathUtils.lerp(this.shaderSplashY, this.shaderNavbarY, p)

		if(this.customUniforms.magicBackgroundGroup.value.y < this.backgroundNavbarY)
		{
			this.customUniforms.magicBackgroundGroup.value.y =
				Math.min(this.backgroundNavbarY * (0.81 + p * 0.68), this.backgroundNavbarY)
		}

		// Fire goback state
		if(this.experience.mouseControls.scrollProgress < 0.15){ this.state = 'goback' }
	}

	updateGoBack()
	{
		// fadeIn menuGroup
		for (const child of this.experience.world.menu.menuGroup.children)
		{
			gsap.to(child.material, { opacity: 1, duration: 2, ease: 'linear' })
		}

		// Title and Shader
		this.customUniforms.title.value.y = this.titleSplashY
		this.customUniforms.shaderPosition.y = this.shaderSplashY

		// Camera
		gsap.to(this.experience.customUniforms.camera.value, { z: 10, duration: 1, ease: 'linear' })

		// Shader
		gsap.to(this.experience.customUniforms.shaderScale, { z: this.shaderSplashScaleZ, duration: 1, ease: 'linear' })

		// Magic Group
		gsap.to(this.customUniforms.magicGroup.value, { y: 0, duration: 1, ease: 'linear' })

		// Magic Background Group
		gsap.to(this.customUniforms.magicBackgroundGroup.value, { y: 0, duration: 2, ease: 'linear' })

		this.splashFront.style.visibility = 'visible'

		//this.experience.el.remove()

		setTimeout(() => {
			this.state = 'splash'
		}, 1000)
	}

	update()
	{
		//console.log(this.state, this.experience.mouseControls.scrollProgress)
		switch(this.state) {
			case 'splash':
				this.updateSplash()
				break

			case 'godown':
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
