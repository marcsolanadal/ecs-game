import { createSystem } from 'engine/ecs'

import RenderSystem from './render'
import MovementSystem from './movement'

export default function initializeSystems(store) {

  function registerSystem(id, requiredComponents, callback) {
    store.dispatch(createSystem(id, requiredComponents))

    return { [id]: callback }
  }

  return {
    ...MovementSystem(registerSystem),
    ...RenderSystem(registerSystem)
  }
}
