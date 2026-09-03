import * as THREE from 'three'
import gsap from "gsap"
import Experience from '../Experience.js'
import World from './World.js'
import {FontLoader} from 'FontLoader'
import {TextGeometry} from 'TextGeometry'

export default class Menu
{
	constructor()
	{
		// Setup
		this.experience = new Experience()
		this.world = new World()
		this.scene = this.experience.scene
		this.time = this.experience.time
		this.mouse = this.experience.mouseControls.mouse
		this.colorObject = this.experience.uniforms.colorObject

		// Group
		this.menuGroup = new THREE.Group()
		this.world.magicGroup.add(this.menuGroup)

		// Params
		this.menuCreated = false
		this.lerpSpeed = 0.03

		// Setup
		this.menuDepth = -10
		this.layoutDistance = 20
		this.menuItems = [
			{
				id: 1,
				text: 'About',
				color: 'aqua',
				domEl: document.querySelector('#about'),
				opacity: 1
			},
			{
				id: 2,
				text: 'Projects',
				color: 'orange',
				domEl: document.querySelector('#projects'),
				opacity: 1
			},
			{
				id: 3,
				text: 'Publications',
				color: 'lightgreen',
				domEl: document.querySelector('#publications'),
				opacity: 1
			}
		]


		// Init
		this.loadFont()
	}

	loadFont()
	{
		this.fontLoader = new FontLoader()

		this.fontLoader.load(
			'/fonts/helvetiker_regular.typeface.json',
			(response) =>
			{
				this.font = response
			})
	}

	drawMenuItems()
	{
		for (const item of this.menuItems)
		{
			//console.log(item)
			item.geometry = new TextGeometry(
				item.text, {
					font: this.font
				})

			item.material = new THREE.MeshLambertMaterial({
				color: new THREE.Color('black'),
				emissiveIntensity: 10,
				wireframe: false,
				transparent: true,
				opacity: item.opacity
			})

			item.mesh = new THREE.Mesh(item.geometry, item.material)
			item.mesh.userData.params = item
			this.menuGroup.add(item.mesh)
			//this.scene.add(item.mesh)
			//this.world.magicGroup.add(item.mesh)

			// center geometry
			item.geometry.computeBoundingBox()
			const offset = new THREE.Vector3()
			item.geometry.boundingBox.getCenter(offset).negate()
			item.geometry.translate(offset.x, 0, 0)

			item.mesh.userData.intersected = false
			item.mesh.userData.previousIntersect = false
			this.world.objectsToIntersect.push(item.mesh)

		}
	}

	layout()
	{
		if(!this.menuCreated){ return }

		const extents = this.experience.camera.getVisibleExtents(this.layoutDistance)
		const portrait = this.experience.sizes.aspectRatio < 1

		// Scale every item by the widest word so they share a type size, sized to a
		// fraction of the visible width. // review
		let widest = 0
		for (const item of this.menuItems)
		{
			item.geometry.computeBoundingBox()
			const raw = item.geometry.boundingBox.max.x - item.geometry.boundingBox.min.x
			if(raw > widest){ widest = raw }
		}

		const widthFraction = portrait ? 0.5 : 0.12
		const scale = (extents.width * widthFraction) / widest

		this.menuItems.forEach((item, i) =>
		{
			item.mesh.scale.set(scale, scale, 0.0001)

			if(portrait)
			{
				// Stacked column, centred on x
				const spacing = extents.height * 0.075
				const top = extents.height * 0.36
				item.mesh.position.set(0, top - (i * spacing), this.menuDepth)
			} else {
				// Row across the middle 60% of the frame
				const span = extents.width * 0.6
				const step = span / (this.menuItems.length - 1)
				item.mesh.position.set(-span * 0.5 + (i * step), extents.height * 0.38, this.menuDepth)
			}
		})
	}

	updateMenuItems()
	{
		for (const item of this.menuItems)
		{
			// Hover exit
			if(item.mesh.userData.previousIntersect && item.mesh.userData.previousIntersect != item.mesh.userData.intersected)
			{
				//console.log('hover exit')
				//console.log(item.mesh.userData.params)
				//this.colorObject.surfaceColor.lerp(this.colorObject.surfaceColorStart, 1)
				//gsap.to(item.mesh.rotation, { y: 0, duration: 0.5, ease: 'linear' })
				//gsap.to(item.mesh.scale, { z: item.mesh.userData.params.scale.z, duration: 0.5, ease: 'linear' })
			}

			if(item.mesh.userData.intersected)
			{
				//item.mesh.material.wireframe = true

				let color = new THREE.Color(item.mesh.userData.params.color)
				item.mesh.material.color.lerp(color, this.lerpSpeed)

				// lerp color
				//this.colorObject.surfaceColor.lerp(item.mesh.material.color, this.lerpSpeed)
				this.colorObject.surfaceColor.lerp(color, this.lerpSpeed)

				// gsap animation
				//gsap.to(item.mesh.rotation, { y: -Math.PI * 0.04, duration: 0.5, ease: 'linear' })
				//gsap.to(item.mesh.scale, { z: 0.005, duration: 0.5, ease: 'linear' })

				item.mesh.userData.previousIntersect = true
			} else {
				//item.mesh.material.wireframe = false
				let color = new THREE.Color('black')
				item.mesh.material.color.lerp(color, this.lerpSpeed)

				item.mesh.userData.previousIntersect = false
			}
		}
	}

	update()
	{
		if(this.font && !this.menuCreated){
			this.drawMenuItems()
			//this.mesh.userData.relativeQuat = new THREE.Quaternion()
			//this.mesh.userData.relativeQuat.copy(this.experience.camera.instance.quaternion).invert().multiply(this.mesh.quaternion)
			this.menuCreated = true
			this.layout()
		}

		if(this.font && this.menuCreated){
			this.updateMenuItems()
		}
	}

}
