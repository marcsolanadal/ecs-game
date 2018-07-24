import { createSystem, changeEntity } from 'utils/ecsHelpers'

export default createSystem(
  [ 'position', 'velocity' ], 
  (entity) => {
    changeEntity(entity.id, { 
      position: { x: x + 1 }
    })
  }
)
