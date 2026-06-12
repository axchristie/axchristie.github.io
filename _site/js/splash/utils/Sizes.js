import Experience from '../Experience.js'

export default class Sizes
{
	constructor()
	{
		// Setup
		this.experience = new Experience()
		this.width = window.innerWidth
		this.height = window.innerHeight
		this.pixelRatio = Math.min(window.devicePixelRatio, 2)
		this.aspectRatio = window.innerWidth / window.innerHeight

		// Mobile
		if(this.aspectRatio < 1)
		{
			console.log('hello mobile')
			//this.height = document.querySelector('.splash-empty').clientHeight
			//this.experience.xDistance = 1
			
			// Splash repositioning
			//this.element = document.getElementsByClassName('splash-front')
			//this.element[0].classList.add('splash-front-mobile')
		}
	}

	resize()
	{
		this.width = window.innerWidth
		this.height = window.innerHeight
		this.pixelRatio = Math.min(window.devicePixelRatio, 2)
		this.aspectRatio = window.innerWidth / window.innerHeight
		if(this.aspectRatio < 1)
		{
			this.experience.isMobile = true
			this.setMobile()
		} else {
			this.experience.isMobile = false
			this.setDesktop()
		}
	}

	setMobile()
	{
		//console.log("Hello mobile")
	}

	setDesktop()
	{
		//console.log("Hello desktop")
	}
}
