import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import * as dat from 'lil-gui'

// Scene
const scene = new THREE.Scene()

// Material
const material = new THREE.MeshStandardMaterial()
material.metalness = 0
material.roughness = 0.4

// Objects
const sphere = new THREE.Mesh(new THREE.SphereGeometry(0.5, 32, 32), material)
sphere.position.set(-1.5, 0, 0)

const cube = new THREE.Mesh(new THREE.BoxGeometry(0.75, 0.75, 0.75), material)
// cube.position.set(1.5, 0, 0)

const torus = new THREE.Mesh(new THREE.TorusGeometry(0.3, 0.2, 32, 64), material)
torus.position.set(1.5, 0, 0)

const plane = new THREE.Mesh(new THREE.PlaneGeometry(5, 5), material)
plane.rotation.set(-Math.PI / 2, 0, 0)
plane.position.set(0, -0.65, 0)


scene.add(sphere, cube, torus, plane)

/* Lights */
/* 环境光 */
const ambientLight = new THREE.AmbientLight('#ffffff', 0.5)
scene.add(ambientLight)
/* 平行光 */
const directionalLight = new THREE.DirectionalLight('#ffffaa', 0.5)
directionalLight.position.set(1, 0.25, 0)
scene.add(directionalLight)
//平行光辅助
const directionalLightHelper=new THREE.DirectionalLightHelper(directionalLight)
scene.add(directionalLightHelper)
// //平行光相机辅助
// const directionalLightCameraHelper = new THREE.CameraHelper(directionalLight.shadow.camera)
// scene.add(directionalLightCameraHelper)


/**点光源 */
// const pointLight = new THREE.PointLight(0xff9000, 0.5)
// pointLight.position.set(0,0, 5)
// scene.add(pointLight)
/**聚光灯 */
// const spotLight = new THREE.SpotLight(0x78ff00, 0.5, 10, Math.PI * 0.1, 0.25, 1)
// spotLight.position.set(0, 2, 3)
// scene.add(spotLight)



// Size
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
}

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.set(1, 1, 2)

// Renderer
const renderer = new THREE.WebGLRenderer({
    antialias: true, //抗锯齿
    alpha: true,
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
//开启投影
renderer.shadowMap.enabled=true
//物体接收投影
sphere.castShadow=true
sphere.receiveShadow=true
cube.castShadow=true
cube.receiveShadow=true
plane.castShadow=true
plane.receiveShadow=true
torus.castShadow=true
torus.receiveShadow=true
//光照增加发射投影
directionalLight.castShadow = true
//投影边缘不清晰可设置以下属性 越大越清晰
directionalLight.shadow.mapSize.width=4096
directionalLight.shadow.mapSize.height=4096
//添加实现相机效果，
// directionalLight.shadow.camera.near=1
// directionalLight.shadow.camera.far=1000



document.getElementById("root").appendChild(renderer.domElement); //将画布添加到container中
const controls = new OrbitControls(camera, renderer.domElement)
controls.enableDamping = true

// Clock
const clock = new THREE.Clock()

// Animations
const tick = () => {
  const elapsedTime = clock.getElapsedTime()
  // Update Objects
  sphere.rotation.y = 0.1 * elapsedTime
  cube.rotation.y = 0.1 * elapsedTime
  torus.rotation.y = 0.1 * elapsedTime
  sphere.rotation.x = 0.15 * elapsedTime
  cube.rotation.x = 0.15 * elapsedTime
  torus.rotation.x = 0.15 * elapsedTime
  controls.update()
  // Render
  renderer.render(scene, camera)
  requestAnimationFrame(tick)
}

tick()
/**
 * Debug
 */
const gui = new dat.GUI()
gui.add(material, 'metalness').min(0).max(1).step(0.0001)
gui.add(material, 'roughness').min(0).max(1).step(0.0001)
gui.add(material, 'wireframe')
const ambientLightFolder = gui.addFolder('AmbientLight')
ambientLightFolder.add(ambientLight, 'visible').listen()
ambientLightFolder.add(ambientLight, 'intensity', 0, 1, 0.001)

const directionalLightFolder = gui.addFolder('DirectionalLight')
directionalLightFolder
  .add(directionalLight, 'visible')
  .onChange((visible) => {
    directionalLightHelper.visible = visible
  })
  .listen()
directionalLightFolder.add(directionalLightHelper, 'visible').name('helper visible').listen()
directionalLightFolder.add(directionalLight, 'intensity', 0, 1, 0.001)

const guiObj = {
  turnOffAllLights() {
    ambientLight.visible = false
    directionalLight.visible = false
    directionalLightHelper.visible = false
  },
  turnOnAllLights() {
    ambientLight.visible = true
    directionalLight.visible = true
    directionalLightHelper.visible = true
  },
}

