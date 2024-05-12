/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

/**
 * Loaders
 */
const loadingBarElement = document.querySelector('.loading-bar')
const bodyElement = document.querySelector('body')
const loadingManager = new THREE.LoadingManager(
    () => {
        window.setTimeout(() => {
            gsap.to(overlayMaterial.uniforms.uAlpha, {
                duration: 3,
                value: 0,
                delay: 1
            })
            gsap.to(overlayMaterial.uniforms.uAlpha, {
                duration: 3,
                value: 0,
                delay: 1
            })

            loadingBarElement.classList.add('ended')
            bodyElement.classList.add('loaded')
            loadingBarElement.style.transform = ''

        }, 500)
    },
    (itemUrl, itemsLoaded, itemsTotal) => {
        console.log(itemUrl, itemsLoaded, itemsTotal)
        const progressRatio = itemsLoaded / itemsTotal
        loadingBarElement.style.transform = `scaleX(${progressRatio})`
        // console.log(progressRatio)
    },
    () => {

    }
)
const gltfLoader = new THREE.GLTFLoader(loadingManager)

/**
 *  Textures
 */
const textureLoader = new THREE.TextureLoader()
const alphaShadow = textureLoader.load('/assets/texture/simpleShadow.jpg');

// Scene
const scene = new THREE.Scene()

const sphereShadow = new THREE.Mesh(
    new THREE.PlaneGeometry(1.5, 1.5),
    new THREE.MeshBasicMaterial({
        transparent: true,
        color: 0x000000,
        opacity: 0.5,
        alphaMap: alphaShadow
    })
)

sphereShadow.rotation.x = -Math.PI * 0.5

sphereShadow.position.y = -0.5
sphereShadow.position.x = -1.7;

scene.add(sphereShadow)
// new shadow
const sphereShadow1 = new THREE.Mesh(
    new THREE.PlaneGeometry(1.5, 1.5),
    new THREE.MeshBasicMaterial({
        transparent: true,
        color: 0x000000,
        opacity: 0.5,
        alphaMap: alphaShadow
    })
)

sphereShadow1.rotation.x = -Math.PI * 0.5

sphereShadow1.position.y = 0
sphereShadow1.position.x = 6;

scene.add(sphereShadow1)
//new shadow

const sphereShadow2 = new THREE.Mesh(
    new THREE.PlaneGeometry(0.5, 0.5),
    new THREE.MeshBasicMaterial({
        transparent: true,
        color: 0x000000,
        opacity: 0.5,
        alphaMap: alphaShadow
    })
)

sphereShadow2.rotation.x = -Math.PI * 0.5

sphereShadow2.position.y = -0.5
sphereShadow2.position.x = 10;

scene.add(sphereShadow2)

/**
 * Overlay
 */
const overlayGeometry = new THREE.PlaneGeometry(2, 2, 1, 1)
const overlayMaterial = new THREE.ShaderMaterial({
    vertexShader: `
        void main() {
            gl_Position = vec4(position, 1.0);
        }
    `,
    fragmentShader: `
        uniform float uAlpha;
        void main() {
            gl_FragColor = vec4(0.0, 0.0, 0.0, uAlpha);
            // gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);
        }
    `,
    uniforms: {
        uAlpha: {
            value: 1.0
        }
    },
    transparent: true
})
const overlay = new THREE.Mesh(overlayGeometry, overlayMaterial);
scene.add(overlay)


/**
 * GLTF Model
 */
let donut = null

gltfLoader.load(
    './assets/donut/scene (7).gltf',
    (gltf) => {
        console.log(gltf);

        donut = gltf.scene

        //const radius = 15

        donut.position.x = -1.7;
        // donut.position.y = -60;

        donut.rotation.y = 1.9;

        //donut.rotation.x = Math.PI * 0.2
        donut.rotation.z = 0.2

        //donut.scale.set(radius, radius, radius)

        scene.add(donut)
    },
    (progress) => {
        console.log(progress);
    },
    (error) => {
        console.error(error);
    }
)

/**
 * Light
 */
const ambientLight = new THREE.AmbientLight(0xffffff, 0.8)
scene.add(ambientLight)

const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
directionalLight.position.set(1, 2, 2)

directionalLight.castShadow = true
scene.add(directionalLight)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

/**
 * Scroll
 */
let scrollY = window.scrollY
let currentSection = 0

const transformDonut = [
    {
        rotationZ: 0.2,
        rotationY: 1.9,
        positionX: -1.7
    },
    {
        rotationZ: 0.2,
        rotationY: 0.9,
        positionX: 1.5
    },
    {
        rotationZ: 0.2,
        rotationY: 4,
        positionX: -2
    },
    {
        rotationZ: 0.2,
        rotationY: 0.2,
        positionX: -6
    },
    {
        rotationZ: 0.2,
        rotationY: 4,
        positionX: -1.5
    },
    {
        rotationZ: 0.0314,
        rotationY: 1.57,
        positionX: 0
    },
    {
        rotationZ: 0.0314,
        rotationY: 1.57,
        positionX: 0
    },
]


const transformPose = [
{
    rotationZ: 0,
    rotationY: 0,
    positionX: 10
},
{
    rotationZ: 0,
    rotationY: 0,
    positionX: 10
},
{
    rotationZ: 0,
    rotationY: 0,
    positionX: 10
},
{
    rotationZ: 0,
    rotationY: 0,
    positionX: 1.5
},
{
    rotationZ: 0,
    rotationY: 0,
    positionX: 10
},
{
    rotationZ: 0,
    rotationY: 0,
    positionX: 10
},
{
    rotationZ: 0,
    rotationY: 0,
    positionX: 10
},
]

const transformHammer = [
{
    rotationZ: 0,
    rotationY: 0,
    positionX: 10
},
{
    rotationZ: 0,
    rotationY: 0,
    positionX: 10
},
{
    rotationZ: 0,
    rotationY: 0,
    positionX: -1
},
{
    rotationZ: 0,
    rotationY: 0,
    positionX: 10
},
{
    rotationZ: 0,
    rotationY: 0,
    positionX: 10
},
{
    rotationZ: 0,
    rotationY: 0,
    positionX: 10
},
{
    rotationZ: 0,
    rotationY: 0,
    positionX: 10
},
]

window.addEventListener('scroll', () => {

    scrollY = window.scrollY
    const newSection = Math.round(scrollY / sizes.height)

    console.log(newSection);

    if (newSection != currentSection) {
        currentSection = newSection

        if (!!donut) {
            gsap.to(
                donut.rotation, {
                    duration: 1.5,
                    ease: 'power2.inOut',
                    z: transformDonut[currentSection].rotationZ
                }
            )
            gsap.to(
                donut.position, {
                    duration: 1.5,
                    ease: 'power2.inOut',
                    x: transformDonut[currentSection].positionX
                }
            )
            gsap.to(
                donut.rotation, {
                    duration: 1.5,
                    ease: 'power2.inOut',
                    y: transformDonut[currentSection].rotationY
                }
            )
            

            gsap.to(
                sphereShadow.position, {
                    duration: 1.5,
                    ease: 'power2.inOut',
                    x: transformDonut[currentSection].positionX 
                }
            )
        }
        if (!!pose) {
            gsap.to(
                pose.rotation, {
                    duration: 1.5,
                    ease: 'power2.inOut',
                    z: transformPose[currentSection].rotationZ
                }
            )
            gsap.to(
                pose.position, {
                    duration: 1.5,
                    ease: 'power2.inOut',
                    x: transformPose[currentSection].positionX
                }
            )
            gsap.to(
                pose.rotation, {
                    duration: 1.5,
                    ease: 'power2.inOut',
                    y: transformPose[currentSection].rotationY
                }
            )
            gsap.to(
                sphereShadow1.position, {
                    duration: 1.5,
                    ease: 'power2.inOut',
                    x: transformPose[currentSection].positionX 
                }
            )
        }
        if (!!hammer) {
            gsap.to(
                hammer.rotation, {
                    duration: 1.5,
                    ease: 'power2.inOut',
                    z: transformHammer[currentSection].rotationZ
                }
            )
            gsap.to(
                hammer.position, {
                    duration: 1.5,
                    ease: 'power2.inOut',
                    x: transformHammer[currentSection].positionX
                }
            )
            gsap.to(
                hammer.rotation, {
                    duration: 1.5,
                    ease: 'power2.inOut',
                    y: transformHammer[currentSection].rotationY
                }
            )
            gsap.to(
                sphereShadow2.position, {
                    duration: 1.5,
                    ease: 'power2.inOut',
                    x: transformHammer[currentSection].positionX + 0.1
                }
            )
        }
    }
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(35, sizes.width / sizes.height, 0.1, 1000)
camera.position.z = 5
camera.position.y = 0.5
scene.add(camera)

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true,
    alpha: true
})
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()
let lastElapsedTime = 0

const tick = () => {
    const elapsedTime = clock.getElapsedTime()
    const deltaTime = elapsedTime - lastElapsedTime
    lastElapsedTime = elapsedTime

    if (!!donut) {
        donut.position.y = Math.sin(elapsedTime * .5) * .1 - 0.1
        sphereShadow.material.opacity = (1 - Math.abs(donut.position.y)) * 0.3
    }
    
    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()

/**
 * On Reload
 */
window.onbeforeunload = function () {
    window.scrollTo(0, 0);
}


/**
 * pose model
 */
let pose = null

gltfLoader.load(
    './assets/donut/scene (8).gltf',
    (gltf) => {
        console.log(gltf);

        pose = gltf.scene

        //const radius = 15
        

        pose.position.x = 10;
        //donut.position.y = -60;

        pose.rotation.y = 0

        //donut.rotation.x = Math.PI * 0.2
        pose.rotation.z = 0

        //donut.scale.set(radius, radius, radius)

        scene.add(pose)
    },
    (progress) => {
        console.log(progress);
    },
    (error) => {
        console.error(error);
    }
)


/**
 * hammer
 */
let hammer = null

gltfLoader.load(
    './assets/donut/vaja1.gltf',
    (gltf) => {
        console.log(gltf);

        hammer = gltf.scene

        //const radius = 15

        hammer.position.x = 10;
        //donut.position.y = -60;

        hammer.rotation.y = 0

        //donut.rotation.x = Math.PI * 0.2
        hammer.rotation.z = 0

        //donut.scale.set(radius, radius, radius)

        scene.add(hammer)
    },
    (progress) => {
        console.log(progress);
    },
    (error) => {
        console.error(error);
    }
)

/**
 * on click change
 */




// /**
//  * fri mouse follow
//  */

// const parallaxEls = document.querySelectorAll(".parallax");
// let xValue = 0;
// let yValue = 0;

// window.addEventListener('mousemove', (e) => {
//     xValue = e.clientX - window.innerWidth / 2;
//     yValue = e.clientY - window.innerHeight / 2;

//     parallaxEls.forEach(el => {
//         const speed = el.getAttribute('data-speed');

//         el.style.transform = `translateX(${xValue * speed}px) translateY(${yValue * speed}px)`;
//     });
// });