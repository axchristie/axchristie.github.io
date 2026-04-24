import * as THREE from 'three'
import Experience from '../Experience.js'
import World from './World.js'

export default class MagicBackground
{
	constructor()
	{
		// Setup
		this.experience = new Experience()
		this.world = new World()
		this.scene = this.experience.scene
		this.time = this.experience.time
		this.mouse = this.experience.mouseControls.mouse

		console.log('hi')

		this.createMagicBackground()
	}

	createMagicBackground()
	{
		this.testCube = new THREE.Mesh(
			new THREE.BoxGeometry(100, 100, 1),
			new THREE.MeshBasicMaterial({
				color: new THREE.Color('white')
			})
		)
		this.testCube.position.set(0, 0, -20)
		this.testCube.castShadow = true
		this.world.magicBackgroundGroup.add(this.testCube)
	}
}

