import { 
  createSystem, 
  getSystems, 
  getEntities, 
  editEntity,
  createEntity,
  addComponent
} from './ecsRedux'

export {
  createEntity,
  addComponent
}

export default function initializeECS(store, systems) {

  const systemCallbacks = systems.reduce((acc, system) => {
    return { ...acc, ...system(registerSystem)} 
  }, {})

  // TODO: Can we avoid having the id to link between redux and the callbacks?
  function registerSystem(id, requiredComponents, callback) {
    store.dispatch(createSystem(id, requiredComponents))

    return { [id]: callback }
  }

  function changeEntity(entity) {
    return (components) => {
      store.dispatch(editEntity(entity, components))
    }
  }

  function callAllSystems(args) {
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
    callAllSystems
  }
}
