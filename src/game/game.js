import store from 'engine/initializeStore'

// Importing the top level systems should initialize all the systems and
// get back an object with the system id's and the callbacks
import initializeSystems from './systems' 
import { editEntity } from 'engine/ecs'


import { 
  createEntity, 
  addComponent,
  getSystems,
  getEntities
} from 'engine/ecs'

window.store = store

const Systems = initializeSystems(store)

// World creation
store.dispatch(createEntity('foo'))
store.dispatch(addComponent('foo', { 'position': { x: 10, y: 20 } }))
store.dispatch(addComponent('foo', { 'sprite': { src: './assets/foo.png' } }))

store.dispatch(createEntity('bar'))
store.dispatch(addComponent('bar', { 'position': { x: 20, y: 40 } }))
store.dispatch(addComponent('bar', { 'sprite': { src: './assets/bar.png' } }))

function changeEntity(entity) {
  return (components) => {
    store.dispatch(editEntity(entity, components))
  }
}

/**
 * TODO: Would be nice to just have something like `Systems.iterate()` inside
 * the game loop. This would encapsulate all the system logic in their own
 * object.
 */

// Game loop
getSystems(store.getState()).forEach(system => {
  system.entities.forEach(entity => {
    const enhancedEntity = {
      ...getEntities(store.getState())[entity],
      setState: changeEntity(entity)
    }

    Systems[system.id](enhancedEntity)
  })
})
