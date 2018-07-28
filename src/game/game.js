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

//Create a Pixi Application
let app = new PIXI.Application({ 
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

PIXI.loader
  .add('chimster', 'assets/Runner0001.png')
  .load(setup);

function setup() {
  let chimster = new PIXI.Sprite(
    PIXI.loader.resources['chimster'].texture
  );

  app.stage.addChild(chimster);
}
