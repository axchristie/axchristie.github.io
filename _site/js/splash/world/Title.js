import * as THREE from 'three'
import Experience from '../Experience.js'
import World from './World.js'
import {FontLoader} from 'FontLoader'
import {TextGeometry} from 'TextGeometry'

export default class Title
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
		this.titleCreated = false

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

	drawTitle()
	{
		this.geometry = new TextGeometry(
			'Alex Christie, Ph.D.', {
				font: this.font
			})

		this.material = new THREE.MeshStandardMaterial({
			color: new THREE.Color('dimgray'),
			wireframe: false,
			transparent: true,
			opacity: this.experience.customUniforms.opacity.value
		})

		this.mesh = new THREE.Mesh(this.geometry, this.material)
		this.mesh.position.set(-15, 2.0, -10)
		this.mesh.scale.set(0.025, 0.025, 0.0005)
		this.world.magicGroup.add(this.mesh)
	}

	drawMenu()
	{
		this.geometry = new TextGeometry(
			'PROJECTS', {
				font: this.font
			})

		this.material = new THREE.MeshLambertMaterial({
			emissive: new THREE.Color('purple'),
			emissiveIntensity: 5,
			visible: false
		})

		this.menu = new THREE.Mesh(this.geometry, this.material)
		this.menu.position.copy(this.experience.customUniforms.menu.value)
		this.menu.scale.set(0.020, 0.020, 0.0005)
		this.scene.add(this.menu)
	}

	update()
	{
		if(this.font && !this.titleCreated){
			this.drawTitle()
			this.drawMenu()
			this.mesh.userData.relativeQuat = new THREE.Quaternion()
			this.mesh.userData.relativeQuat.copy(this.experience.camera.instance.quaternion).invert().multiply(this.mesh.quaternion)
			this.titleCreated = true
		}

		if(this.mesh)
		{
			this.mesh.material.opacity = this.experience.customUniforms.opacity.value
			this.mesh.position.copy(this.experience.customUniforms.title.value)
			this.menu.position.copy(this.experience.customUniforms.menu.value)

			this.mesh.quaternion.copy(this.experience.camera.instance.quaternion).multiply(this.mesh.userData.relativeQuat)
		}
	}

}
