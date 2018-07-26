
export default (registerSystem) => {
  return registerSystem(
    'movement',
    [ 'position' ], 
    (entity) => {
      console.warn('position system', entity.position)
      // changeEntity(entity.id, { 
      //   position: { x: x + 1 }
      // })
    }
  )
}
