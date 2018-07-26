
export default (registerSystem) => {
  return registerSystem(
    'render',
    [ 'sprite' ], 
    (entity) => {
      console.warn('hello render system!')
    }
  )
}
