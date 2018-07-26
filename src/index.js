import store from './initializeStore.js'

// Importing the top level systems should initialize all the systems and
// get back an object with the system id's and the callbacks
import Systems from './systems' 

import { 
  createEntity, 
  addComponent,
  removeComponent,
  createSystem,
  getEntities, 
  getSystems
} from './ducks/ecs'

window.store = store

initializeSystems(store)

// System registration
store.dispatch(createSystem('sys1', ['position']))
store.dispatch(createSystem('sys2', ['position', 'health']))

// Entity initialization
store.dispatch(createEntity('foo'))
store.dispatch(addComponent('foo', { 'position': { x: 10, y: 20 } }))
store.dispatch(addComponent('foo', { 'health': { hp: 100 } }))

store.dispatch(createEntity('bar'))
store.dispatch(addComponent('bar', { 'position': { x: 20, y: 40 } }))


/*
getSystems().forEach(system => {
  system.entities.forEach(entity => {
    Systems[system.id](entity)
  })
}
*/
