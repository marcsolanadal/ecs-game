import store from './initializeStore.js'

import { 
  createEntity, 
  addComponent, 
} from 'ducks/ecs'


window.store = store

store.dispatch(createEntity('test'))
store.dispatch(addComponent('test', { 
  'position': { x: 0, y: 0 }
}))


