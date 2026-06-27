import * as THREE from 'three'
import * as gsap from "gsap"
import Experience from '../Experience.js'
import Shader from './Shader.js'
import Title from './Title.js'
import Menu from './Menu.js'
import MagicBackground from './MagicBackground.js'
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

		// Intersect Objects
		this.objectsToIntersect = []

		// Custom Uniforms
		this.customUniforms = this.experience.customUniforms

		// Mouse Controls
		this.mouse = this.experience.mouseControls.mouse
		
		// Debug
		this.debug = this.experience.debug
		this.debugObject = this.debug.debugObject

		// Magic Group
		this.magicGroup = new THREE.Group()
		this.scene.add(this.magicGroup)
		
		// Magic Background
		this.magicBackgroundGroup = new THREE.Group()
		this.scene.add(this.magicBackgroundGroup)

		// Test
		//this.createTestCube()

		// Light
		this.addLight()

		// Magic Background
		this.magicBackground = new MagicBackground()

		// Shader
		this.shader = new Shader()
		//this.shader.shaderMesh.position.x = this.xDistance
		//this.shader.shaderMesh.position.y = - this.yDistance * 2.5

		// Title
		this.title = new Title()

		// Menu
		this.menu = new Menu()
		
		// DOM Events
		this.events = new DOMEvents()
	}

	addLight()
	{
		this.ambientLight = new THREE.AmbientLight('#ffffff', 1.5)
		this.scene.add(this.ambientLight)
	}

	createTestCube()
	{
		this.testCube = new THREE.Mesh(
			new THREE.BoxGeometry(3, 3, 3),
			new THREE.MeshNormalMaterial()
		)
		this.testCube.position.y = 5
		this.testCube.position.x = -10
		this.testCube.position.z = -15
		this.testCube.castShadow = true
		this.testCube.visible = true
		this.scene.add(this.testCube)
	}


	update()
	{
		//this.testCube.rotation.y = this.mouse.x * 1
		//this.testCube.rotation.x = this.mouse.y * 1

		// Magic Group
		this.magicGroup.position.copy(this.customUniforms.magicGroup.value)

		// Magic Background Group
		this.magicBackgroundGroup.position.copy(this.customUniforms.magicBackgroundGroup.value)
		
		// Shader
		this.shader.update()

		// Title
		this.title.update()

		// Menu
		this.menu.update()

		// DOMEvents
		this.events.update()
	}
}
