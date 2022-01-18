import './style.css'
import * as THREE from 'three'
import gsap from 'gsap'

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Object
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
const mesh = new THREE.Mesh(geometry, material)
// mesh.position.y=1.4;
scene.add(mesh)

// Sizes
const sizes = {
    width: 800,
    height: 600
}

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 3
scene.add(camera)

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)


// gsap.fromTo(mesh.position,1, { x:-2}, { x:2})

renderer.render(scene, camera)

/**
 * Animate
 */
let x = 0.01;
let y = 0.01;
let time = Date.now();
let clock = new THREE.Clock();
const tick = () =>
{
    const currentTime = Date.now();
    const deltaTime = currentTime - time;
    time = currentTime;
    const currentClock = new THREE.Clock();
    const deltaElapsedTime = currentClock.elapsedTime - clock.elapsedTime;
    const multiplier = 0.001*deltaTime;
    if(mesh.position.x>=2) {
        x=-multiplier;
    }
    if(mesh.position.x<=-2)
    {
        x=multiplier;
    }
    mesh.position.x+=x;
    if(mesh.position.y>=1.4) {
        y=-multiplier;
    }
    if(mesh.position.y<=-1.4)
    {
        y=multiplier;
    }
    mesh.position.y+=y;
    // console.log(mesh.position.x);
    // camera.lookAt(mesh.position)
    // Render
    renderer.render(scene, camera)
    window.requestAnimationFrame(tick)
}

// tick()

// gsap.to(mesh.position, { duration: 1, delay: 1, x: 2 })
gsap.fromTo(mesh.position, 3, {x: -2, y:-1.4 }, {x:2, y:1.4});
const tick2 = () =>{
    console.log(mesh.position.x);
    // gsap.to(mesh.position, {duration:1, delay:0, x:2});
    // console.log(mesh.position.x);
    // gsap.to(mesh.position, {duration:1, delay:1.4, x:-2});
    // console.log(mesh.position.x);
    // gsap.to(mesh.position, {duration:1, delay:2.8, x:0});
    // gsap.fromTo(mesh.position,1, { x:-2}, { x:2})
    console.log(mesh.position.x);
    if(mesh.position.x>=2)
    {
        gsap.fromTo(mesh.position, 3, {x: 2 }, {x:-2});
    }
    if(mesh.position.x<=-2)
    {
        gsap.fromTo(mesh.position, 3, {x: -2 }, {x:2});
    }
    if(mesh.position.y>=1.4)
    {
        gsap.fromTo(mesh.position, 3, {y: 1.4 }, {y:-1.4});
    }
    if(mesh.position.y<=-1.4)
    {
        gsap.fromTo(mesh.position, 3, {y: -1.4 }, {y:1.4});
    }
    renderer.render(scene, camera)
    // gsap.fromTo(mesh.position, 3, {x: -2 }, {x:2});
    window.requestAnimationFrame(tick2)
}

tick2();

