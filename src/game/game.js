// import 'pixi.js'

// import store from 'engine/initializeStore'
// window.store = store

// import initializeECS from 'engine/ecs'
// import createWorld from './world'

// import RenderSystem from './systems/render'
// import MovementSystem from './systems/movement'

// const ecs = initializeECS(store, [
//   MovementSystem,
//   RenderSystem // Render should always be the last system
// ])

// createWorld(store)

// // TODO: In each tick we should pass the delta time 
// // TODO: We should analyze if we should also pass the input as a parameter or
// // just have it as a system
// ecs.callAllSystems('Hello system!')

let type = "WebGL"
if(!PIXI.utils.isWebGLSupported()){
  type = "canvas"
}
PIXI.utils.sayHello(type)

// Aliases
const Application = PIXI.Application;
const loader = PIXI.loader;
const resources = PIXI.loader.resources;
const Sprite = PIXI.Sprite;

//Create a Pixi Application
let app = new Application({ 
  width: 256, 
  height: 256,                       
  antialias: true, 
  transparent: false, 
  resolution: 1
});

// Sizing the canvas to window size
// app.renderer.view.style.position = "absolute";
// app.renderer.view.style.display = "block";
// app.renderer.autoResize = true;
// app.renderer.resize(window.innerWidth, window.innerHeight);

//Add the canvas that Pixi automatically created for you to the HTML document
document.body.appendChild(app.view);

loader
  .add('assets/runner.json')
  .load(onAssetsLoaded);

function appendZeroes(index, total) {
  const i = index + 1;
  const zerosToAppend = total - i.toString().length;

  let number = '';
  for(let x = 0; x < zerosToAppend; x++) {
    number += '0';
  }
  number += i;

  return number;
}

/**
 * We need to use that because the atlas json is not sorted by name T-T
 */
function generateFrameName(filename, index, total) {
  const part = filename.split(/\d+/)
  return part[0] + appendZeroes(index, total) + part[1];
}

function onAssetsLoaded() {
  const atlas = resources['assets/runner.json'].textures;

  const frames = Object.keys(atlas).map((filename, index) => {
    return PIXI.Texture.fromFrame(generateFrameName(filename, index, 4))
  })

  const anim = new PIXI.extras.AnimatedSprite(frames);

  anim.x = app.screen.width / 2;
  anim.y = app.screen.height / 2;
  anim.anchor.set(0.5);
  anim.animationSpeed = 0.3;
  anim.play();

  app.stage.addChild(anim);
}
