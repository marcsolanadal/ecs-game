import { combineReducers } from 'redux'

import ecs from './ecs'

const appReducer = combineReducers({
  ecs
})

const rootReducer = (state, action) => {
  if (action.type === 'STORE_CLEAR') {
    state = undefined
  }

  return appReducer(state, action)
}

export default rootReducer
