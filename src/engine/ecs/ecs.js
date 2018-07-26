import { reducers } from '../helpers'

// TODO: Check if this is used somewhere else when the project is more mature
import { arrayContainsElements } from 'utils/arrayHelpers'

const ENTITY_CREATE = 'ENTITY_CREATE'
const COMPONENT_ADD = 'COMPONENT_ADD'
const COMPONENT_REMOVE = 'COMPONENT_REMOVE'
const SYSTEM_CREATE = 'SYSTEM_CREATE'
const SYSTEM_ADD_ENTITY = 'SYSTEM_ADD_ENTITY'
const SYSTEM_REMOVE_ENTITY = 'SYSTEM_REMOVE_ENTITY'

const initialState = {
  entities: {},
  systems: {}
}

//------------------------------------------------------------------------------
// REDUCERS
//------------------------------------------------------------------------------

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

  [SYSTEM_CREATE]: (state, action) => {
    const { id, requiredComponents } = action.payload
    return {
      ...state,
      systems: {
        ...state.systems,
        [id]: {
          id,
          requiredComponents,
          entities: []
        }
      }
    }
  },

  [COMPONENT_ADD]: (state, action) => {
    const { entity, component } = action.payload
    return {
      ...state,
      entities: {
        ...state.entities,
        [entity]: {
          ...state.entities[entity],
          ...component
        }
      }
    }
  },

  [COMPONENT_REMOVE]: (state, action) => {
    const { entity, componentId } = action.payload
    return {
      ...state,
      entities: {
        ...state.entities,
        [entity]: {
          ...state[entity],
          [componentId]: undefined
        }
      }
    }
  },

  [SYSTEM_ADD_ENTITY]: (state, action) => {
    const { id, entity } = action.payload
    return {
      ...state,
      systems: {
        ...state.systems,
        [id]: {
          ...state.systems[id],
          entities: [
            ...state.systems[id].entities,
            entity
          ]
        }
      }
    }
  },

  [SYSTEM_REMOVE_ENTITY]: (state, action) => {
    const { id, entity } = action.payload
    const index = state.systems[id].entities.indexOf(entity)

    return {
      ...state,
      systems: {
        ...state.systems,
        [id]: {
          ...state.systems[id],
          entities: [
            ...state.systems[id].entities.slice(0, index),
            ...state.systems[id].entities.slice(index + 1)
          ]
        }
      }
    }
  }

})

//------------------------------------------------------------------------------
// ACTION CREATORS
//------------------------------------------------------------------------------

export function createEntity(name) {
  return {
    type: ENTITY_CREATE,
    payload: {
      name
    }
  }
}

export function createSystem(id, requiredComponents) {
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

export function addComponent(entity, component) {
  return (dispatch, getState) => {
    dispatch({
      type: COMPONENT_ADD,
      payload: {
        entity,
        component
      }
    })

    const componentNames = getEntityComponentIds(entity, getState())
    getSystems(getState()).forEach((system, _, systems) => {
      if (system.entities.indexOf(entity) === -1 
        && arrayContainsElements(componentNames, system.requiredComponents)
      ) {
        dispatch({
          type: SYSTEM_ADD_ENTITY,
          payload: {
            id: system.id,
            entity
          }
        })
      }
    })
  }
}

// We need to check in which systems we have the entity
// for each system we check if the entity still have the required components
// -- in case we don't we remove the entity from the system
export function removeComponent(entity, componentId) {
  return (dispatch, getState) => {
    dispatch({
      type: COMPONENT_REMOVE,
      payload: {
        entity,
        componentId
      }
    })

    // TODO: getState doesn't return the updated state so we need to remove the
    // component that was removed in the 
    const componentNames = getEntityComponentIds(entity, getState())
      .filter(key => key !== componentId)

    getSystems(getState()).forEach((system, _, systems) => {
      if (system.entities.indexOf(entity) > -1
        && !arrayContainsElements(componentNames, system.requiredComponents)
      ) {
        dispatch({
          type: SYSTEM_REMOVE_ENTITY,
          payload: {
            id:  system.id,
            entity
          }
        })
      }
    })
  }
}

//------------------------------------------------------------------------------
// SELECTORS
//------------------------------------------------------------------------------

export function getEntities(state) {
  return state.ecs.entities
}

function getEntityComponentIds(id, state) {
  return Object.keys(getEntities(state)[id])
}

export function getSystems(state) {
  return Object.keys(state.ecs.systems).map(key => state.ecs.systems[key])
}

export function getSystemsById(state) {
  return state.ecs.systems
}

function systemExists(id, state) {
  return getSystems(state).filter(sys => sys.id === id).length > 0
}
