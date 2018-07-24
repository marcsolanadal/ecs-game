import { reducers } from 'utils/reduxHelpers'

const ENTITY_CREATE = 'ENTITY_CREATE'
const COMPONENT_ADD = 'COMPONENT_ADD'

const initialState = {
  entities: {},
  byComponent: {}
}

const addComponentToEntity = (state, action) => {
  const { entity, component } = action.payload
  return {
    ...state,
    [entity]: {
      ...state[entity],
      ...component
    }
  }
}

const addIdToComponentArray = (state = {}, action) => {
  const { entity, component } = action.payload
  const id = Object.keys(component)[0]

  return {
    ...state,
    [id]: [
      ...(state[id] || {}),
      entity
    ]
  }
}

export default reducers(initialState, {

  [ENTITY_CREATE]: (state, action) => {
    return {
      ...state,
      entities: {
        ...state.entities,
        [action.payload.name]: {}
      }
    }
  },

  [COMPONENT_ADD]: (state, action) => {
    return {
      ...state,
      entities: addComponentToEntity(state.entities, action),
      byComponent: addIdToComponentArray(state.byComponent, action)
    }
  }

})

// Action creators
export const createEntity = (name) => {
  return {
    type: ENTITY_CREATE,
    payload: {
      name
    }
  }
}

export const addComponent = (entity, component) => {
  return {
    type: COMPONENT_ADD,
    payload: {
      entity,
      component
    }
  }
}


 
// Selectors
export const getEntities = (state) => state.ecs.entities

export const getEntitiesByComponent = (type, state) => {
  return state.ecs.byComponent[type]
}
