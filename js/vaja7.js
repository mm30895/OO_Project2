import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

let renderer = new THREE.WebGLRenderer({
	canvas: document.querySelector('#vaja7'),
  antialias: true,
  alpha: true,
});
renderer.outputColorSpace = THREE.SRGBColorSpace;

renderer.setSize(window.innerWidth /2 , window.innerHeight/2);
renderer.setPixelRatio(window.devicePixelRatio);

renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(15, window.innerWidth / window.innerHeight, 1, 1000);
camera.position.set(4, 5, 11);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.enablePan = false;
controls.minDistance = 5;
controls.maxDistance = 20;
controls.minPolarAngle = 0.5;
controls.maxPolarAngle = 1.5;
controls.autoRotate = false;
controls.target = new THREE.Vector3(0, 1, 0);
controls.update();

// const groundGeometry = new THREE.PlaneGeometry(20, 20, 32, 32);
// groundGeometry.rotateX(-Math.PI / 2);
// const groundMaterial = new THREE.MeshStandardMaterial({
//   color: 0x555555,
//   side: THREE.DoubleSide
// });
// const groundMesh = new THREE.Mesh(groundGeometry, groundMaterial);
// groundMesh.castShadow = false;
// groundMesh.receiveShadow = true;
// scene.add(groundMesh);

const spotLight = new THREE.SpotLight(0xffffff, 3000, 100, 0.22, 1);
spotLight.position.set(10, 25, 0);
spotLight.castShadow = true;
spotLight.shadow.bias = -0.0001;
const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(spotLight, ambientLight);


let hammer;
let mixer;
const loader = new GLTFLoader().setPath('all/models/');
loader.load('vaja7.gltf', (gltf) => {
  console.log('loading model');
  const mesh = gltf.scene;
  hammer = mesh;

  hammer.traverse((child) => {
    if (child.isMesh) {
      child.castShadow = true;
      child.receiveShadow = true;
    }
  });

  hammer.position.set(0, 0.5, 0);
  scene.add(hammer);

  mixer = new THREE.AnimationMixer(hammer);
  const clips =gltf.animations;
  const clip = THREE.AnimationClip.findByName(clips, 'walk');
  const action = mixer.clipAction(clip);
  action.play();

  document.getElementById('progress-container').style.display = 'none';
}, (xhr) => {
  console.log(`loading ${xhr.loaded / xhr.total * 100}%`);
}, (error) => {
  console.error(error);
});

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});



const clock = new THREE.Clock();
function animate() {
  requestAnimationFrame(animate);
  controls.update();
  mixer.update(clock.getDelta());
  hammer.rotation.y += 0.001;
  
  renderer.render(scene, camera);
}

animate();


    
