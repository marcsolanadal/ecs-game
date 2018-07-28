import store from 'engine/initializeStore'
window.store = store

import initializeECS from 'engine/ecs'
import createWorld from './world'

import RenderSystem from './systems/render'
import MovementSystem from './systems/movement'

const ecs = initializeECS(store, [
  MovementSystem,
  RenderSystem // Render should always be the last system
])

createWorld(store)

// TODO: In each tick we should pass the delta time 
// TODO: We should analyze if we should also pass the input as a parameter or
// just have it as a system
ecs.callAllSystems('Hello system!')
