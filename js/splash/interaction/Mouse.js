import * as THREE from 'three'
import Experience from '../Experience.js'

export default class MouseControls
{
	constructor()
	{
		// Setup
		this.experience = new Experience()
		this.sizes = this.experience.sizes

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
			})

		window.addEventListener('scroll', () => {
				this.scrollY = window.scrollY
				this.maxScroll = document.body.scrollHeight - window.innerHeight;
				this.scrollProgress = this.scrollY / this.maxScroll;
			}, { passive: true })

	}
}
