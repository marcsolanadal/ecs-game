import { registerSystem, changeEntity } from 'utils/ecsHelpers'

export default registerSystem(
  [ 'position', 'velocity' ], 
  (entity) => {
    changeEntity(entity.id, { 
      position: { x: x + 1 }
    })
  }
)
