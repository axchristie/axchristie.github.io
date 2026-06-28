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

		// Params
		this.menuCreated = false
		this.lerpSpeed = 0.03

		// Setup
		this.menuItems = [
			{
				id: 1,
				text: 'About',
				color: 'aqua',
				domEl: 'id1',
				opacity: 1,
				scale: new THREE.Vector3(0.015, 0.015, 0.0001),
				position: new THREE.Vector3(-25, 12, -10)
			},
			{
				id: 2,
				text: 'Projects',
				color: 'orange',
				domEl: 'id2',
				opacity: 1,
				scale: new THREE.Vector3(0.015, 0.015, 0.0001),
				position: new THREE.Vector3(-15, 12, -10)
			}
		]


		// Init
		this.loadFont()
	}

	loadFont()
	{
		this.fontLoader = new FontLoader()

		this.fontLoader.load(
			'../../../fonts/helvetiker_regular.typeface.json',
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
			item.mesh.position.copy(item.position)
			item.mesh.scale.copy(item.scale)
			item.mesh.userData.params = item
			//this.scene.add(item.mesh)
			this.world.magicGroup.add(item.mesh)

			item.mesh.userData.intersected = false
			item.mesh.userData.previousIntersect = false
			this.world.objectsToIntersect.push(item.mesh)
		}
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
		}

		if(this.font && this.menuCreated){
			this.updateMenuItems()
		}
	}

}
