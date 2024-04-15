import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./style.css";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
import { GridHelper } from "three";

gsap.registerPlugin(ScrollTrigger);

const lenis = new Lenis({
	duration: 2,
	easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
});

function raf(time) {
	lenis.raf(time);
	ScrollTrigger.update();
	requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

THREE.ColorManagement.enabled = false;
let model;

/**
 * Base
 */
// Debug
// const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();
// scene.background = new THREE.Color("#000000");

const textureLoader = new THREE.TextureLoader();
// const backgroundTexture = textureLoader.load('/images/space.avif');
// scene.background = backgroundTexture;

const loadingManager = new THREE.LoadingManager();
const progressBar = document.getElementById("progressBar");
const progressText = document.getElementById("progressText");
const enterButton = document.getElementById("enter");

loadingManager.onProgress = (url, loaded, total) => {
	// progressBar.value = (loaded/total)*100;
	const progress = Math.round((loaded / total) * 100);
	progressText.textContent = `${progress}`;
};

const progressBarContainer = document.querySelector(".progressBarContainer");

loadingManager.onLoad = () => {
	gsap.to(progressBarContainer, {
		y: "-100%",
		duration: 0.5,
	});
};

const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath("/draco/");

const gltfLoader = new GLTFLoader(loadingManager);

gltfLoader.setDRACOLoader(dracoLoader);

let mixer = null;

gltfLoader.load("/model/earth/scene.gltf", (gltf) => {
	model = gltf.scene;
	const scale = 0.003;
	model.scale.set(scale, scale, scale);
	model.position.set(-4, 2, -0.5);
	model.rotation.y = 0.2;

	scene.add(model);

	gsap.registerPlugin(ScrollTrigger);

	ScrollTrigger.defaults({
		immediateRender: false,
		ease: "power1.inOut",
	});

	let modelMove = gsap.timeline({
		scrollTrigger: {
			trigger: ".mainHolder",
			start: "top top",
      endTrigger: ".contactPage",
			end: "bottom bottom",
			// markers: true,
			scrub: 1,
		},
	});

	modelMove.to(model.position, { z: -4, duration: 1 }, "runSame2",);
	modelMove.to(model.position, { x: 4, duration: 1 }, "runSame2",);
	modelMove.to(model.rotation, { y: 5, duration: 3 }, 0);
	modelMove.to(model.position, { x: -2, duration: 1 });
	modelMove.to(model.position, { x: 1.1, duration: 1 });
	modelMove.to(model.position, { z: 1.2, duration: 1 });
});

// FFFEE0 - Soft yellow color
const ambientLight = new THREE.AmbientLight(0xFFFEE0, 1);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xFFFEE0, 6);
directionalLight.position.set(5, 10, 7);
scene.add(directionalLight);

/* Sizes*/
const sizes = {
	width: window.innerWidth,
	height: window.innerHeight,
};

window.addEventListener("resize", () => {
	// Update sizes
	sizes.width = window.innerWidth;
	sizes.height = window.innerHeight;

	// Update camera
	camera.aspect = sizes.width / sizes.height;
	camera.updateProjectionMatrix();
	
	// Update renderer
	renderer.setSize(sizes.width, sizes.height);
	renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

// Base camera

const camera = new THREE.PerspectiveCamera(
	70,
	sizes.width / sizes.height,
	0.1,
	1000
);
camera.position.set(0, 2, 3);

scene.add(camera);

//Particles
const particlesGeometry = new THREE.BufferGeometry(); //radius, width sub-division, height sub-division
const particlesTexture = textureLoader.load("/textures/particles/5.png");

const count = 700;
const positions = new Float32Array(count * 4);
const colors = new Float32Array(count * 3); // 3d vector type having color (r, g, b)

for (let i = 0; i < count * 3; i++) {
	positions[i] = (Math.random() - 0.5) * 12;
	colors[i] = Math.random(); // for random color write vertex color to TRUE for material
}

particlesGeometry.setAttribute(
	"position",
	new THREE.BufferAttribute(positions, 3)
);

particlesGeometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

const particlesMaterial = new THREE.PointsMaterial({
	size: 0.04,
	map: particlesTexture,
	opacity: 0.8,
	sizeAttenuation: true,
	depthWrite: false,
	blending: THREE.AdditiveBlending,
});

particlesMaterial.map = particlesTexture;
particlesMaterial.transparent = true;
particlesMaterial.alphaMap = particlesTexture;
particlesMaterial.depthWrite = false;
particlesMaterial.blending = THREE.AdditiveBlending;

const particles = new THREE.Points(particlesGeometry, particlesMaterial);

// particles.position.set(0, 7, 0)
scene.add(particles);

// Controls
// const controls = new OrbitControls(camera, canvas);
// controls.enableDamping = true;
// controls.enableZoom = false;

/* Renderer */
const renderer = new THREE.WebGLRenderer({
	canvas: canvas,
	alpha: true,
});
renderer.outputColorSpace = THREE.LinearSRGBColorSpace;
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

const clock = new THREE.Clock();
let previousTime = 0;

const tick = () => {
	const elapsedTime = clock.getElapsedTime();
	const deltaTime = elapsedTime - previousTime;
	previousTime = elapsedTime;
	particles.rotation.y = elapsedTime * 0.05;
	renderer.render(scene, camera);

	window.requestAnimationFrame(tick);
};

tick();

/*=====================================EFFECTS PAGE=================================== */

let sections = gsap.utils.toArray(".horizontalScrollDiv");

let scrollTween = gsap.to(sections, {
    xPercent: -100 * (sections.length - 1),
    ease: "none", // <-- IMPORTANT!
    scrollTrigger: {
      trigger: ".effectsPageContainer",
      pin: true,
      scrub: 0.5,
      // markers: true,
      //snap: directionalSnap(1 / (sections.length - 1)),
      end: "+=3000"
    }
  });


  let thingsMove1 = gsap.timeline({
    scrollTrigger: {
      trigger: ".effectPageFirst",
      start: "top top",
      end: "250% top",
      scrub: 1,
    //   markers:true,
    },
  });
  
  thingsMove1
    // .to(".octMove1", { x: "-10vw",y:"-10vh", rotation:-30, duration: 1 },'runOct')
    .to(".octMove1", { x: "-45vw",y:"-20vh", duration: 1 })




      let thingsMove3 = gsap.timeline({
        scrollTrigger: {
          trigger: ".effectPageThird",
          start: "300% top",
          end: "450% top",
          scrub: 1,
        //   markers:true,
        },
      });
      
      thingsMove3
        .to(".octMove3", { x:"-40vh", duration: 1 }) 


        let colorChange = gsap.timeline({
          scrollTrigger: {
            trigger: ".effectPageFirst",
            start: "top top",
            end: "400% top",
            scrub: 1,
            // markers:true,
          },
        });
        
        colorChange 
          .to(".effectsPageContainer", { background:'#004d80', duration:2}) 
          .to(".effectsPageContainer", { background:'#2aa22a', duration: 2 }) 
          .to(".effectsPageContainer", { background:'#990000', duration: 2 }) 
          .to(".effectsPageContainer", { background:'#86592d', duration: 2 }) 
    







const moveSections = gsap.timeline({
	scrollTrigger: {
		trigger: ".container",
    start: "top top",
    end: "500% top",
    scrub: 1,
		pin: true,
    // markers: true,
    toggleActions: "restart pause resume pause",
	},
});

moveSections.to(
  ".firstSolution",
  {
    y: "-100vh",
    duration: 5,
  },
  "run"
);

moveSections.to(
  ".firstSolution",
  {
    scale: 0,
    duration: 5,
	
  },
  "run2"
);
moveSections.to(
  ".secondSolution",
  {
    y: "-100vh",
    duration: 5,
  },
  "run2"
);

moveSections.to(
  ".secondSolution",
  {
    scale: 0,
    duration: 5,
  },
  "run3"
);
moveSections.to(
  ".thirdSolution",
  {
    y: "-100vh",
    duration: 5,
  },
  "run3"
);

moveSections.to(
  ".thirdSolution",
  {
    scale: 0,
    duration: 5,
  },
  "run4"
);

moveSections.to(
  ".fourthSolution",
  {
    y: "-100vh",
    duration: 5,
  },
  "run4"
);

moveSections.to(
  ".fourthSolution",
  {
    scale: 0,
    duration: 5,
  },
  "run5"
);
moveSections.to(
  ".fifthSolution",
  {
    y: "-100vh",
    duration: 5,
  },
  "run5"
);

const image = document.getElementById("move1");
const image2 = document.getElementById("move2");
const image3 = document.getElementById("move3");
const image4 = document.getElementById("move4");
const image5 = document.getElementById("move5");
const image6 = document.getElementById("move6");
const image7 = document.getElementById("move7");
const image8 = document.getElementById("move8");

document.addEventListener("mousemove", function (e) {
	const sensitivity = 0.1;

	const deltaX = (e.clientX - window.innerWidth / 2) * 0.05;

	const deltaY = (e.clientY - window.innerHeight / 2) * 0.08;

	gsap.to(image, { x: deltaX, y: deltaY, duration: 0.75 });

	gsap.to(image2, { x: deltaX * 0.5, y: deltaY * 0.5, duration: 0.75 });

	gsap.to(image3, { x: deltaX * 0.5, y: deltaY, duration: 0.75 });

	gsap.to(image4, { x: deltaX, y: deltaY, duration: 0.75 });

	gsap.to(image5, { x: deltaX * 0.5, y: deltaY * 0.5, duration: 0.75 });

	gsap.to(image6, { x: deltaX, y: deltaY, duration: 0.75 });

	gsap.to(image7, { x: deltaX * 0.5, y: deltaY * 0.5, duration: 0.75 });

	gsap.to(image8, { x: deltaX, y: deltaY, duration: 0.75 });
});

const tl = gsap.timeline({
	scrollTrigger: {
		trigger: ".mainContainer",
		start: "top top",
		end: "100% top",
		scrub: 1,
		pin: true,
		// markers: true,
		toggleActions: "restart pause resume pause",
	},
});

tl.to(
	".giftingTextHolder",
	{
		opacity: 1,
		scale: 1,
		duration: 5,
	},
	"runSame"
);

tl.to(
	".imgMove1",
	{
		x: "-30vw",
		y: "-35vh",
		duration: 5,
	},
	"runSame"
);

tl.to(
	".imgMove2",
	{
		x: "15vw",
		y: "-35vh",
		duration: 5,
	},
	"runSame"
);

tl.to(
	".imgMove3",
	{
		x: "35vw",
		y: "-20vh",
		duration: 5,
	},
	"runSame"
);

tl.to(
	".imgMove4",
	{
		x: "25vw",
		y: "25vh",
		duration: 5,
	},
	"runSame"
);

tl.to(
	".imgMove5",
	{
		x: "45vw",
		y: "35vh",
		duration: 5,
	},
	"runSame"
);

tl.to(
	".imgMove6",
	{
		x: "-10vw",
		y: "35vh",
		duration: 5,
	},
	"runSame"
);

tl.to(
	".imgMove7",
	{
		x: "-42.5vw",
		y: "-2vh",
		duration: 5,
	},
	"runSame"
);

tl.to(
	".imgMove8",
	{
		x: "-40vw",
		y: "20vh",
		duration: 5,
	},
	"runSame"
);


// let questionMove = gsap.timeline({
//   scrollTrigger: {
//     trigger: ".aboutUsSection",
//     start: "top top",
//     end: "100% bottom",
//     scrub: 1,
//   },
// });

// questionMove
//   .to(".showFirstWhatWeDo", {opacity:1, duration:1 })
//   .to(".showSecondWhatWeDo", {opacity:1, duration:1 })
//   .to(".showThirdWhatWeDo", {opacity:1, delay:1, duration:1 })

	  