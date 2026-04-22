import * as THREE from 'three'
import * as gsap from "gsap"
import Experience from '../Experience.js'
import Shader from './Shader.js'
import DOMEvents from '../interaction/DOMEvents.js'

let instance = null

export default class World
{
	constructor()
	{
		//Singleton
		if(instance) { return instance }
		instance = this

		// Setup
		this.experience = new Experience()
		this.scene = this.experience.scene
		this.time = this.experience.time
		this.sizes = this.experience.sizes

		// Mouse Controls
		this.mouse = this.experience.mouseControls.mouse
		
		// Debug
		this.debug = this.experience.debug
		this.debugObject = this.debug.debugObject

		// Test
		//this.createTestCube()

		// Light
		this.addLight()

		// Shader
		this.shader = new Shader()
		//this.shader.shaderMesh.position.x = this.xDistance
		//this.shader.shaderMesh.position.y = - this.yDistance * 2.5

		// DOM Events
		this.events = new DOMEvents()
	}

	addLight()
	{
		this.ambientLight = new THREE.AmbientLight('#ffffff', 1)
		this.scene.add(this.ambientLight)
	}

	createTestCube()
	{
		this.testCube = new THREE.Mesh(
			new THREE.BoxGeometry(3, 3, 3),
			new THREE.MeshNormalMaterial()
		)
		this.testCube.position.y = 1
		this.testCube.castShadow = true
		this.scene.add(this.testCube)
	}


	update()
	{
		//this.testCube.rotation.y = this.mouse.x * 1
		//this.testCube.rotation.x = this.mouse.y * 1
		
		// Shader
		this.shader.update()
	}
}
