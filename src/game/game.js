import store from 'engine/initializeStore'
window.store = store

import initializeEngine from 'engine'
import createWorld from './world'

import RenderSystem from './systems/render'
import MovementSystem from './systems/movement'

const engine = initializeEngine(store, [
  MovementSystem,
  RenderSystem // Render should always be the last system
])

createWorld(store)

engine.tick('Hello system!')
