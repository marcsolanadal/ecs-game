import store from './initializeStore.js'

import { 
  createEntity, 
  addComponent,
  removeComponent,
  createSystem,
  getEntities, 
  getSystems
} from './ducks/ecs'

window.store = store

// System registration
store.dispatch(createSystem('sys1', ['position']))
store.dispatch(createSystem('sys2', ['position', 'health']))

// Entity initialization
store.dispatch(createEntity('foo'))
store.dispatch(addComponent('foo', { 'position': { x: 10, y: 20 } }))
store.dispatch(addComponent('foo', { 'health': { hp: 100 } }))

store.dispatch(createEntity('bar'))
store.dispatch(addComponent('bar', { 'position': { x: 20, y: 40 } }))


