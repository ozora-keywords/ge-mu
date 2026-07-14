import * as THREE from "three";

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x87CEEB);

const camera = new THREE.PerspectiveCamera(
75,
window.innerWidth/window.innerHeight,
0.1,
1000
);

const renderer = new THREE.WebGLRenderer({antialias:true});
renderer.setSize(window.innerWidth,window.innerHeight);
document.body.appendChild(renderer.domElement);

// 光
const light = new THREE.DirectionalLight(0xffffff,3);
light.position.set(5,10,5);
scene.add(light);

// 地面
const ground = new THREE.Mesh(
new THREE.PlaneGeometry(500,500),
new THREE.MeshPhongMaterial({color:0x228B22})
);
ground.rotation.x=-Math.PI/2;
scene.add(ground);

// 道路
const road = new THREE.Mesh(
new THREE.BoxGeometry(12,0.1,500),
new THREE.MeshPhongMaterial({color:0x444444})
);
scene.add(road);

// 車
const car = new THREE.Mesh(
new THREE.BoxGeometry(2,1,4),
new THREE.MeshPhongMaterial({color:0xff0000})
);
car.position.y=0.6;
scene.add(car);

camera.position.set(0,6,10);

let speed=0;
const keys={};

document.addEventListener("keydown",e=>keys[e.key]=true);
document.addEventListener("keyup",e=>keys[e.key]=false);

function animate(){

requestAnimationFrame(animate);

if(keys["ArrowUp"]) speed+=0.02;
if(keys["ArrowDown"]) speed-=0.02;

speed*=0.98;

if(keys["ArrowLeft"]) car.rotation.y+=0.03;
if(keys["ArrowRight"]) car.rotation.y-=0.03;

car.position.x-=Math.sin(car.rotation.y)*speed;
car.position.z-=Math.cos(car.rotation.y)*speed;

camera.position.x=car.position.x;
camera.position.z=car.position.z+10;
camera.lookAt(car.position);

document.getElementById("speed").innerHTML=
Math.abs(speed*200).toFixed(0)+" km/h";

renderer.render(scene,camera);

}

animate();
