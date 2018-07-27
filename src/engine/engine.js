import { createSystem, getSystems, getEntities, editEntity } from './ecs'

// FIXME: This should be inside the ecs folder and be the root
export default function initializeEngine(store, systems) {

  const systemCallbacks = systems.reduce((acc, system) => {
    return { ...acc, ...system(registerSystem)} 
  }, {})

  function registerSystem(id, requiredComponents, callback) {
    store.dispatch(createSystem(id, requiredComponents))

    return { [id]: callback }
  }

  function changeEntity(entity) {
    return (components) => {
      store.dispatch(editEntity(entity, components))
    }
  }

  // FIXME: This name is not descriptive enough
  function tick(args) {
    getSystems(store.getState()).forEach(system => {
      system.entities.forEach(entity => {
        const enhancedEntity = {
          ...getEntities(store.getState())[entity],
          setState: changeEntity(entity)
        }
    
        systemCallbacks[system.id](enhancedEntity, args)
      })
    })
  }

  return {
    tick
  }
}
