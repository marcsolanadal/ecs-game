import { createSystem } from 'engine/ecs'

import RenderSystem from './render'
import MovementSystem from './movement'

// function changeEntity(entity) {
//   return (components) => {
//     store.dispatch(editEntity(entity, components))
//   }
// }

// getSystems(store.getState()).forEach(system => {
//   system.entities.forEach(entity => {
//     const enhancedEntity = {
//       ...getEntities(store.getState())[entity],
//       setState: changeEntity(entity)
//     }

//     Systems[system.id](enhancedEntity)
//   })
// })

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
