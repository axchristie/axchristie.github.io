import * as THREE from "three"
import * as dat from "lil-gui"
import { OrbitControls } from "OrbitControls"
import Experience from './splash/Experience.js'

// Load experience
const canvas = document.querySelector('canvas.webgl')
const experience = new Experience(canvas)
