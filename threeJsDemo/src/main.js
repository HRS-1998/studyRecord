import { Raycaster } from "three";

//导入模型，实现文字标注 Raycaster(origin,direction,near,far)
/* 
origin — 射线的起点向量。
direction — 射线的方向向量，应该归一化。
near — 所有返回的结果应该比 near 远。Near不能为负，默认值为0。
far — 所有返回的结果应该比 far 近。Far 不能小于 near，默认值为无穷大。
*/

  /*
   1.setFromCamera(coords,camera) 用新的原点和方向来更新射线(鼠标的坐标，相机的位置)
   2.intersectObject(object,recursive,optionalTarget)
  来判断指定对象有没有被这束光线击中，返回被击中对象的信息，
  相交的结果会以一个数组的形式返回，其中的元素依照距离排序，越近的排在越前。
*/
import * as THREE from 'three'
//threeJs内置的controls
import { OrbitControls } from 'three/examples/jsm/controls/orbitcontrols'
//图形化界面
import * as dat from 'dat.gui';
import { Clock } from 'three';

// Scene
const scene = new THREE.Scene()
/*  Objects */


// Objects
//-----增加地面贴图
const textureLoader=new THREE.TextureLoader()
const floorColorTexture=textureLoader.load('./textures/plane_1.jpg')
floorColorTexture.repeat.set(2,2)
// Material
const material = new THREE.MeshStandardMaterial({map:floorColorTexture})
material.metalness = 0
material.roughness = 0.4
const plane = new THREE.Mesh(new THREE.PlaneGeometry(20, 20), material)
plane.rotation.set(-Math.PI / 2, 0, 0)
plane.position.set(0, 0, 0)
plane.name='地面'

scene.add(plane)

// house
const house = new THREE.Group()
scene.add(house)

// walls
//墙贴图
const wallColorTexture=textureLoader.load('./textures/wall_2.jpg')
const walls = new THREE.Mesh(
  new THREE.BoxGeometry(4, 2.5, 4),
  new THREE.MeshStandardMaterial({ 
    map:wallColorTexture,
    color: '#ac8e82' })
)
walls.position.y = 1.25
walls.name='墙面'
house.add(walls)
//屋顶 roof
const roof=new THREE.Mesh(
    new THREE.ConeGeometry(3.25,1,4),
    new THREE.MeshStandardMaterial({color:'#b35f45'})
)
roof.rotation.y=Math.PI/4
roof.position.y=2.5+0.5
house.add(roof)
//大门
// door
//门贴图----

const doorColorTexture=textureLoader.load('./textures/door_1.jpg')
const door = new THREE.Mesh(
    new THREE.PlaneGeometry(2, 2),
    new THREE.MeshStandardMaterial({
        map:doorColorTexture,
      color: '#FFE082',
    }),
  )
  
  door.position.y = 1
  door.position.z = 2 + 0.001
  door.name='门'
  house.add(door)

  //灌木丛
  // Bushes
const bushGeometry = new THREE.SphereGeometry(1, 16, 16)
const bushMaterial = new THREE.MeshStandardMaterial({ color: '#89c854' })
const bush1 = new THREE.Mesh(bushGeometry, bushMaterial)
bush1.scale.set(0.5, 0.5, 0.5)
bush1.position.set(0.8, 0.2, 2.2)
const bush2 = new THREE.Mesh(bushGeometry, bushMaterial)
bush2.scale.set(0.25, 0.25, 0.25)
bush2.position.set(1.4, 0.1, 2.1)
const bush3 = new THREE.Mesh(bushGeometry, bushMaterial)
bush3.scale.set(0.4, 0.4, 0.4)
bush3.position.set(-0.8, 0.1, 2.2)
const bush4 = new THREE.Mesh(bushGeometry, bushMaterial)
bush4.scale.set(0.15, 0.15, 0.15)
bush4.position.set(-1, 0.05, 2.6)
house.add(bush1, bush2, bush3, bush4)

//墓碑群
// graves
const graves = new THREE.Group()
scene.add(graves)
const graveGeometry = new THREE.BoxGeometry(0.6, 0.8, 0.2)
const graveMaterial = new THREE.MeshStandardMaterial({
  color: '#b2b6b1',
})

for (let i = 0; i < 50; i += 1) {
  const grave = new THREE.Mesh(graveGeometry, graveMaterial)
  grave.name='墓碑' 
  const angle = Math.random() * Math.PI * 2
  const radius = 3 + Math.random() * 6
  const x = Math.cos(angle) * radius
  const z = Math.sin(angle) * radius
  grave.position.set(x, 0.3, z)
  grave.rotation.z = (Math.random() - 0.5) * 0.4
  grave.rotation.y = (Math.random() - 0.5) * 0.4
  graves.add(grave)
}



/**
 * Lights
 */
const ambientLight = new THREE.AmbientLight('#ffffff', 0.3)
scene.add(ambientLight)

const directionalLight = new THREE.DirectionalLight('#ffffaa', 0.5)
directionalLight.position.set(1, 0.75, 0)
scene.add(directionalLight)

//添加幽灵光
const ghost1=new THREE.PointLight('#ff00ff',2,3)
scene.add(ghost1)
const ghost2=new THREE.PointLight('#00ffff',2,3)
scene.add(ghost2)
const ghost3=new THREE.PointLight('#00ffff',2,3)
scene.add(ghost3)


//door light
const doorLight=new THREE.PointLight('#ff7d46',1,7)
doorLight.position.set(0,2.2,2.7)
house.add(doorLight)

//雾
const fog=new THREE.Fog('#262837',1,15)
scene.fog=fog

// Size
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
}

// Camera
const camera = new THREE.PerspectiveCamera(90, sizes.width / sizes.height, 0.1, 100)
camera.position.set(12,5, 4)
scene.add(camera)

const controls = new OrbitControls(camera, document.getElementById('canvas'))
controls.enableDamping = true

// Renderer
const renderer = new THREE.WebGLRenderer({
    antialias: true, //抗锯齿
    alpha: true,
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.setClearColor('#262837')   //将画布背景色设置为雾相同颜色
document.getElementById('canvas').appendChild(renderer.domElement)


// Animations
const clock=new THREE.Clock()
const tick = () => {
//增加动画
const elapsedTime=clock.getElapsedTime()
//ghosts
const ghost1Angle = elapsedTime * 0.5
ghost1.position.x = Math.cos(ghost1Angle) * 4
ghost1.position.z = Math.sin(ghost1Angle) * 4
ghost1.position.y = Math.sin(elapsedTime * 3)

const ghost2Angle = -elapsedTime * 0.32
ghost2.position.x = Math.cos(ghost2Angle) * 5
ghost2.position.z = Math.sin(ghost2Angle) * 5
ghost2.position.y = Math.sin(elapsedTime * 4) + Math.sin(elapsedTime * 2.5)

const ghost3Angle = -elapsedTime * 0.18
ghost3.position.x = Math.cos(ghost3Angle) * (7 + Math.sin(elapsedTime * 0.32))
ghost3.position.z = Math.sin(ghost3Angle) * (7 + Math.sin(elapsedTime * 0.5))
ghost3.position.y = Math.sin(elapsedTime * 4) + Math.sin(elapsedTime * 2.5)

controls.update()
  // Render
  renderer.render(scene, camera)
  requestAnimationFrame(tick)
}

tick()

//添加mesh点击标注事件
let intersects=[];

const pointer=new THREE.Vector2()
let  rayCaster=new THREE.Raycaster()
document.addEventListener('click',meshOnclick)
function meshOnclick(event){
event.preventDefault();

  pointer.x=(event.clientX/window.innerWidth)*2-1
  pointer.y=-(event.clientY/window.innerHeight)*2+1
  console.log(pointer,'xxxxx')
  rayCaster.setFromCamera(pointer,camera)
  console.log(graves,'1')
  const geometry=[walls,roof,door,plane,bush1,bush2,bush3,bush4,...graves.children]
  intersects=rayCaster.intersectObjects(geometry,true)

  console.log(scene,'====',scene.children,'++++++',intersects)
  if(intersects.length>0){
    intersects[0].object
    console.log(intersects[0].object)
    intersects[0].object.name
  }else{

  }
}







//
