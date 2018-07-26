// import { registerSystem } from 'utils/ecsHelpers'
import { createSystem } from '../../ducks/ecs'

function registerSystem(store, id, requiredComponents, callback) {
  store.dispatch(createSystem(id, requiredComponents))
  return { [id]: callback }
}

export default (registerSystem(
  store,
  'movement',
  [ 'position', 'velocity' ], 
  (entity) => {
    console.log('hello movement system!')
    // changeEntity(entity.id, { 
    //   position: { x: x + 1 }
    // })
  }
))(store)
