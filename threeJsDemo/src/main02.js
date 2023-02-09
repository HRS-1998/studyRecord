import * as THREE from 'three'

import { captureMouse } from './controls'     //自定义的controls
//threeJs内置的controls
import { OrbitControls } from 'three/examples/jsm/controls/orbitcontrols'

import * as dat from 'dat.gui';

// Canvas
//添加纹理贴图
const TextureLoader=new THREE.TextureLoader()
const texture=TextureLoader.load('./textures/door.jpg')
// Scene
const scene = new THREE.Scene()

// // Object
const cube = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({
    map:texture,
    color: 0x607d8b,
  }),
)


// const cube=new THREE.Mesh(
//     new THREE.BoxGeometry(1,1,1),
//     new THREE.MeshPhongMaterial(
//        { shininess:60,
//         specular:new THREE.Color('#00ff00'),
//         map:texture
//     }
//     )
// )
scene.add(cube)

// Camera
const aspectRatio = window.innerWidth / window.innerHeight
const camera = new THREE.OrthographicCamera(-1 * aspectRatio, 1 * aspectRatio, 1, -1, 1, 100)
camera.position.set(2, 2, 2)
camera.lookAt(cube.position)

// Renderer
const renderer = new THREE.WebGLRenderer({
    antialias: true, //抗锯齿
  alpha: true,
})
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.setPixelRatio(Math.min(window.devicePixelRatio,2))
document.getElementById("root").appendChild(renderer.domElement); //将画布添加到container中
//添加gui
/**
 * Debug
 */
const gui = new dat.GUI({
    // closed: true,
    width: 400,
  })
  // gui.hide() // press H to show
  
  gui.add(cube.position, 'y').min(-3).max(3).step(0.01)
    .name('cube Y') // 别名
  gui.add(cube.position, 'x').min(-3).max(3).step(0.01)
  gui.add(cube.position, 'z').min(-3).max(3).step(0.01)
  
  gui.add(cube, 'visible') // boolean
  gui.add(cube.material, 'wireframe') // boolean
  
  const debugObj = {
    color: 0xffff00,
    spin() {
      gsap.to(cube.rotation, {
        duration: 1,
        y: cube.rotation.y + Math.PI * 2,
      })
    },
  }
  
  gui.addColor(debugObj, 'color').onChange((e) => {
    cube.material.color.set(e)
  })
  
  gui.add(debugObj, 'spin') // function



const mouse=captureMouse(renderer.domElement)
const controls=new OrbitControls(camera,renderer.domElement)
// Clock
const clock = new THREE.Clock()
// Animations
const tick = () => {
  const delta = clock.getDelta()
  cube.rotation.y += 1 * delta
  renderer.render(scene, camera)
  requestAnimationFrame(tick)
}

tick()