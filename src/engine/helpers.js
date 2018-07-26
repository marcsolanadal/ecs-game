export function reducers(initialState, reducers) {
  return (prevState = initialState , action) => {
    if (reducers[action.type]) {
      return reducers[action.type](prevState, action)
    }
  
    return prevState
  }
}
