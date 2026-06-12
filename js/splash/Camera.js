import * as THREE from 'three'
import { OrbitControls } from 'OrbitControls'
import Experience from './Experience.js'

export default class Camera
{
	constructor()
	{
		// Setup
		this.experience = new Experience()
		this.sizes = this.experience.sizes
		this.time = this.experience.time
		this.scene = this.experience.scene
		this.canvas = this.experience.canvas

		this.setInstance()
		this.setControls()
	}

	setInstance()
	{
		this.instance = new THREE.PerspectiveCamera(
			75,
			this.sizes.width / this.sizes.height,
			0.1,
			100
		)
		this.instance.position.set(0, 0, 10)
		//this.instance.lookAt(0, 0, 0)
		this.scene.add(this.instance)
	}

	setControls()
	{
		this.controls = new OrbitControls(this.instance, this.canvas)
		this.controls.enableDamping = true
	}

	resize()
	{
		this.instance.aspect = this.sizes.width / this.sizes.height
		this.instance.updateProjectionMatrix()
	}

	update()
	{
		//this.controls.update()
		this.instance.position.copy(this.experience.customUniforms.camera.value)

		if(this.experience.sizes.aspectRatio < 1)
		{
			this.instance.fov = 120
			this.instance.aspect = this.sizes.width / this.sizes.height
			this.instance.updateProjectionMatrix()
		}
	}

	playTurntable()
	{
		this.instance.position.y = 4
		this.instance.position.x = Math.sin(this.time.current * 0.0002) * 5.5
		this.instance.position.z = Math.cos(this.time.current * 0.0002) * 5.5
	}
}
