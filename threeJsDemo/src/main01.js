// document.getElementById('root').innerHTML='这是一个three内容'
console.log('111')
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"; //鼠标控制器
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js"; //模型加载器

const scene = new THREE.Scene(); //新建场景

let width = window.innerWidth; //窗口宽度
let height = window.innerHeight; //窗口高度
let k = width / height; //窗口宽高比
const camera = new THREE.PerspectiveCamera(60, k, 0.1, 1000); //透视相机
camera.position.set(0, 0, 10); //设置相机位置
//创建渲染器
const renderer = new THREE.WebGLRenderer({
  antialias: true, //抗锯齿
  alpha: true,
});
renderer.setSize(width, height); //设置渲染区域尺寸
document.getElementById("root").appendChild(renderer.domElement); //将画布添加到container中
 
const  mouseControls = new OrbitControls(
    camera,
    renderer.domElement
  );
  createPanoramicBj()
  createLight() 
  loadModel()
//   createOrbitControls()
  repeatRender()
    //创建全景背景
   function createPanoramicBj() {
        let geometry = new THREE.SphereGeometry(10000, 100, 100); //几何体
        let material = new THREE.MeshBasicMaterial({
        //   map: new THREE.TextureLoader().load(panoramicImg), //导入图片纹理
          color: 0xffffff,
          //材质背面显示
          side: THREE.BackSide,
        });
        let mesh = new THREE.Mesh(geometry, material);
        scene.add(mesh);
      }
      //创建光源
    function createLight() {
   const ambientLight = new THREE.AmbientLight(0x6aceff); //设置环境光
      scene.add(ambientLight); //将环境光添加到场景中
      const pointLight = new THREE.PointLight(0xffffff, 1, 0);
      pointLight.position.set(1000, 1000,0); //设置点光源位置
      scene.add(pointLight); //将点光源添加至场景
    }
    //加载模型
    function loadModel() {
      let loader = new GLTFLoader();
      //此路径是相当对于public中index.html的，模型必须放在public路径下
      loader.load("./model.gltf", (gltf) => {
        console.log(gltf);
        gltf.scene.position.set(0, 0, 0);
        scene.add(gltf.scene);
      });
    }
     //创建轨道控制
    //  function createOrbitControls() {
    //     //没有缩放阻尼
    // //创建控件对象
    //    mouseControls.enablePan = true; //右键平移拖拽
    //    mouseControls.enableZoom = true; //鼠标缩放
    //    mouseControls.minDistance = 0; //相机距离原点的距离范围
    //    mouseControls.maxDistance = 100;
    //    mouseControls.enableDamping = true; //滑动阻尼
    //    mouseControls.dampingFactor = 0.1; //(默认.25)
    //    mouseControls.maxPolarAngle = (Math.PI / 4) * 3; //y旋转角度范围
    //    mouseControls.minPolarAngle = Math.PI / 4;
        
    //   }
          //重复渲染
    function repeatRender() {
        //请求动画帧，屏幕每刷新一次调用一次，绑定屏幕刷新频率
        requestAnimationFrame(repeatRender);
        // mouseControls.update(); //实时更新轨道控制
        //   this.cube.rotation.y += 0.01; //以y为轴心的旋转角度每帧自加0.01
        renderer.render(scene,camera); //将场景和相机进行渲染
      }
     
  
  
    


  
// const loader = new GLTFLoader();

// loader.load( '../static/model.gltf', function ( gltf ) {
   
// 	scene.add( gltf.scene );

// }, undefined, function ( error ) {

// 	console.error( error );

// } );