import { createStore, applyMiddleware, compose } from 'redux'
import { createLogger } from 'redux-logger'
import thunk from 'redux-thunk'

import rootReducer from './rootReducer'

const logger =  createLogger({ 
  collapsed: true,
  predicate: (getState, action) => action.type !== undefined
})

let middleware = [ thunk, logger ]
if (process.env.NODE_ENV === 'test') {
  middleware = [ thunk ]
}

let composeEnhancers = compose
if (process.env.NODE_ENV !== 'production') {
  composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
}

const store = createStore(
  rootReducer, 
  composeEnhancers(applyMiddleware(...middleware))
)

export default store
