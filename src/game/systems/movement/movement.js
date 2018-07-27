
export default (registerSystem) => {
  return registerSystem(
    'movement',
    [ 'position' ], 
    (entity, args) => {
      const { position } = entity
      entity.setState({ 
        position: { x: position.x + 1 }
      })
      console.warn(args)
    }
  )
}
