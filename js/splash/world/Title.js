import * as THREE from 'three'
import Experience from '../Experience.js'
import {FontLoader} from 'FontLoader'
import {TextGeometry} from 'TextGeometry'

export default class Title
{
	constructor()
	{
		// Setup
		this.experience = new Experience()
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
			color: new THREE.Color('dimgray')
		})

		this.mesh = new THREE.Mesh(this.geometry, this.material)
		this.mesh.position.set(-15, 2.0, -10)
		this.mesh.scale.set(0.025, 0.025, 0.0005)
		this.scene.add(this.mesh)
	}

	update()
	{
		if(this.font && !this.titleCreated){
			this.drawTitle()
			this.titleCreated = true
		}

		if(this.mesh)
		{
			if(this.experience.isMobile)
			{
				this.mesh.scale.set(0.011, 0.011, 0.0005)
				this.mesh.position.set(-6.8, 1.8, -10)
			} else {
				this.mesh.position.set(-15, 2.0, -10)
				this.mesh.scale.set(0.025, 0.025, 0.0005)
			}
		}
	}

}
