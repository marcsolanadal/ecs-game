
// FIXME: This function should be inside the redux folder
export function reducers(initialState, reducers) {
  return (prevState = initialState , action) => {
    if (reducers[action.type]) {
      return reducers[action.type](prevState, action)
    }
  
    return prevState
  }
}


// TODO: How can we update the wrapped function state?
// TODO: Why do we actually need this function???
  // Seems this is only a helper function for tests

export function connect(mapState, mapDispatch = {}) {
  const mapStateToProps = mapState(store.getState())
  const mapDispatchToProps = Object.keys(mapDispatch).reduce((acc, key) => {
    return {
      ...acc,
      [key]: () => store.dispatch(mapDispatch[key])
    }
  }, {})

  return (fn) => fn({
    ...mapStateToProps,
    ...mapDispatchToProps
  })
}
