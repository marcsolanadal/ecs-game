
export default (registerSystem) => {
  return registerSystem(
    'movement',
    [ 'position' ], 
    (entity) => {
      const { position } = entity
      entity.setState({ 
        position: { x: position.x + 1 }
      })
    }
  )
}
