import store from 'engine/initializeStore'

// Importing the top level systems should initialize all the systems and
// get back an object with the system id's and the callbacks
import initializeSystems from './systems' 

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

// One game loop iteration
getSystems(store.getState()).forEach(system => {
  system.entities.forEach(entity => {
    Systems[system.id](getEntities(store.getState())[entity])
  })
})
