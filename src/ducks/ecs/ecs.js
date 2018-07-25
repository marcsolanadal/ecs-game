import { reducers } from 'utils/reduxHelpers'

const ENTITY_CREATE = 'ENTITY_CREATE'
const COMPONENT_ADD = 'COMPONENT_ADD'
const SYSTEM_CREATE = 'SYSTEM_CREATE'

const initialState = {
  entities: {},
  byComponent: {},
  systems: []
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
  },

  [SYSTEM_CREATE]: (state, action) => {
    return {
      ...state,
      systems: [
        ...state.systems,
        {
          id: action.payload.id,
          requiredComponents: action.payload.requiredComponents,
          entities: []
        }
      ]
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

  // Check current entity components 
  // Compare requiredComponents for each system with the current entity components
  // in the cases where the requiredComponents match the entity ones add entity id
  // into the system

  return {
    type: COMPONENT_ADD,
    payload: {
      entity,
      component
    }
  }
}

export const createSystem = (id, requiredComponents) => {
  return (dispatch, getState) => {

    if (systemExists(id, getState())) {
      throw new Error('Do not create systems with the same id!');
    }

    return dispatch({
      type: SYSTEM_CREATE,
      payload: {
        id,
        requiredComponents
      }
    })
  }
}

 
// Selectors
export const getEntities = (state) => state.ecs.entities

export const getEntitiesByComponent = (type, state) => {
  return state.ecs.byComponent[type]
}

export const getSystems = (state) => state.ecs.systems

const systemExists = (id, state) => {
  return getSystems(state).filter(sys => sys.id === id).length > 0
}
