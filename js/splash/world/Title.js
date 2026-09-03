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
			'/fonts/helvetiker_bold.typeface.json',
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

		// center geometry
		this.mesh.geometry.computeBoundingBox()
		const offset = new THREE.Vector3()
		this.mesh.geometry.boundingBox.getCenter(offset).negate()
		this.mesh.geometry.translate(offset.x, 0, 0)

		this.world.magicGroup.add(this.mesh)

		// layout Title
		this.layout()
	}

	layout()
	{
		if(!this.mesh){ return }

		const extents = this.experience.camera.getVisibleExtents(20)
		const portrait = this.experience.sizes.aspectRatio < 1

		this.geometry.computeBoundingBox()
		const raw = this.geometry.boundingBox.max.x - this.geometry.boundingBox.min.x
		const scale = (extents.width * (portrait ? 0.8 : 0.46)) / raw
		this.mesh.scale.set(scale, scale, 0.0005)

		// x/z only — y is driven by scroll in DOMEvents. // review
		this.experience.customUniforms.title.value.x = 0
		this.experience.customUniforms.title.value.z = -10
	}

	update()
	{
		if(this.font && !this.titleCreated){
			this.drawTitle()
			this.mesh.userData.relativeQuat = new THREE.Quaternion()
			this.mesh.userData.relativeQuat.copy(this.experience.camera.instance.quaternion).invert().multiply(this.mesh.quaternion)
			this.titleCreated = true
		}

		if(this.mesh)
		{
			this.mesh.material.opacity = this.experience.customUniforms.opacity.value
			this.mesh.position.copy(this.experience.customUniforms.title.value)

			this.mesh.quaternion.copy(this.experience.camera.instance.quaternion).multiply(this.mesh.userData.relativeQuat)
		}
	}

}
