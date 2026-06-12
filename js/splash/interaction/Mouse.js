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

		this.raycaster = new THREE.Raycaster()
		this.rayMouse = new THREE.Vector2()

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

				const intersects = this.raycaster.intersectObject(this.experience.world.testCube)
				if(intersects.length > 0)
				{
					this.experience.world.testCube.material.wireframe = true
				} else {
					this.experience.world.testCube.material.wireframe = false
				}

			})

		window.addEventListener('scroll', () => {
				this.scrollY = window.scrollY
				this.maxScroll = document.body.scrollHeight - window.innerHeight;
				this.scrollProgress = this.scrollY / this.maxScroll;
			}, { passive: true })

	}
}
