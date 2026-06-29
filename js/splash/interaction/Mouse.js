import * as THREE from 'three'
import Experience from '../Experience.js'

export default class MouseControls
{
	constructor()
	{
		// Setup
		this.experience = new Experience()
		this.camera = this.experience.camera.instance
		this.sizes = this.experience.sizes
		this.colorObject = this.experience.uniforms.colorObject
		this.lerpSpeed = 0.08

		this.raycaster = new THREE.Raycaster()
		this.rayMouse = new THREE.Vector2()
		this.boxToTest = new THREE.Box3()
		this.intersected = null

		this.createMouseObject()
		this.updateMouse()
	}

	createMouseObject()
	{
		this.mouse = {
			x: { value: 0.5 },
			y: { value: 0.0 },
		}

		this.scrollY = 0
		this.scrollProgress = 0
	}

	updateMouse()
	{
		window.addEventListener('mousemove', (event) =>
			{
				this.mouse.x.value = event.clientX / this.sizes.width
				this.mouse.y.value = -(event.clientY / this.sizes.height) + 0.5

				this.rayMouse.x = (event.clientX / this.sizes.width) * 2 - 1
				this.rayMouse.y = -(event.clientY / this.sizes.height) * 2 + 1

				this.raycaster.setFromCamera(this.rayMouse, this.experience.camera.instance)

				// Unset all objectsToIntersect.userData.intersected
				for (const object of this.experience.world.objectsToIntersect){
					object.userData.intersected = false
				}

				/* DEPRECATED
				const intersects = this.raycaster.intersectObjects(this.experience.world.objectsToIntersect)
				if(intersects.length > 0)
				{
					intersects[0].object.userData.intersected = true
					//this.experience.world.testCube.material.wireframe = true
				} else {
					//this.experience.world.testCube.material.wireframe = false
				}
				*/

				document.body.style.cursor = 'default'

				if(this.experience.world.events.state === 'splash')
				{
					let intersecting = false
					this.intersected = null

					for (const object of this.experience.world.objectsToIntersect)
					{
						this.boxToTest.setFromObject(object)
	
						if (this.raycaster.ray.intersectsBox(this.boxToTest))
						{
							object.userData.intersected = true
							intersecting = true
							this.intersected = object
							document.body.style.cursor = 'pointer'
						}
					}
					if(!intersecting && !this.colorObject.surfaceColor.equals(this.colorObject.surfaceColorStart))
					{
						this.colorObject.surfaceColor.lerp(this.colorObject.surfaceColorStart, this.lerpSpeed)
					}
				}
			})

		window.addEventListener('scroll', () => {
				this.scrollY = window.scrollY
				this.maxScroll = document.body.scrollHeight - window.innerHeight;
				this.scrollProgress = this.scrollY / this.maxScroll;
			}, { passive: true })

	}

}
