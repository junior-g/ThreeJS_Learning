import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import gsap from 'gsap'
import {Pane} from 'tweakpane';

/**
 * Debug
 */
const pane = new Pane();
const parameters = {
    color: '#8df'
}

const btn = pane.addButton({
    title: 'SPIN'
});

const f = pane.addFolder({
    title: 'Advanced',
});
/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Object
 */
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: parameters.color })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

/**
 * Debugging
 */

pane.addInput(mesh.position, 'y', {
    min:-2,
    max:2,
    label:"elevation"
})
pane.addInput(mesh.position, 'x', {
    min:-4,
    max:4,
    step:0.01
})

pane.addInput(mesh.position, 'z', {
    options: {
        low: -2,
        medium: 0,
        high: 2,
    }
})

pane.addInput(mesh, "visible");
pane.addInput(mesh.material, "wireframe")
pane.addInput(parameters, 'color').on('change', (ev)=>{
    // console.log(parameters.color);
    mesh.material.color.set(parameters.color)
})

btn.on('click', ()=>{
    gsap.to(mesh.rotation, { duration: 1, y: mesh.rotation.y + Math.PI * 2 })
    f.hidden = !f.hidden;
})

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.z = 3
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()