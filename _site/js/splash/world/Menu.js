import * as THREE from 'three'
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

		// Params
		this.menuCreated = false

		// Setup
		this.menuItems = [
			{
				id: 1,
				text: 'About',
				color: 'purple',
				domEl: 'id1',
				opacity: 1,
				scale: new THREE.Vector3(0.02, 0.02, 0.001),
				position: new THREE.Vector3(-15, 10, -10)
			},
			{
				id: 2,
				text: 'Projects',
				color: 'pink',
				domEl: 'id2',
				opacity: 1,
				scale: new THREE.Vector3(0.02, 0.02, 0.0001),
				position: new THREE.Vector3(-15, 7, -10)
			}
		]


		// Init
		this.loadFont()
	}

	loadFont()
	{
		this.fontLoader = new FontLoader()

		this.fontLoader.load(
			'../../../fonts/helvetiker_bold.typeface.json',
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
				color: new THREE.Color(item.color),
				emissiveIntensity: 10,
				wireframe: false,
				transparent: true,
				opacity: item.opacity
			})

			item.mesh = new THREE.Mesh(item.geometry, item.material)
			item.mesh.position.copy(item.position)
			item.mesh.scale.copy(item.scale)
			this.scene.add(item.mesh)
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
	}

}
