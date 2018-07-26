import { reducers } from 'utils/reduxHelpers'
import { arrayContainsElements, findIndexById } from './helpers'

const ENTITY_CREATE = 'ENTITY_CREATE'
const COMPONENT_ADD = 'COMPONENT_ADD'
const COMPONENT_REMOVE = 'COMPONENT_REMOVE'
const SYSTEM_CREATE = 'SYSTEM_CREATE'
const SYSTEM_ADD_ENTITY = 'SYSTEM_ADD_ENTITY'
const SYSTEM_REMOVE_ENTITY = 'SYSTEM_REMOVE_ENTITY'

const initialState = {
  entities: {},
  byComponent: {},
  systems: []
}

//------------------------------------------------------------------
// Reducers
//------------------------------------------------------------------

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
          [componentId]: undefined // removing the selected component
        }
      }
    }
  },

  [SYSTEM_CREATE]: (state, action) => {
    return {
      ...state,
      systems: [
        ...state.systems,
        {
          id:  action.payload.id,
          requiredComponents: action.payload.requiredComponents,
          entities: []
        }
      ]
    }
  },

  [SYSTEM_ADD_ENTITY]: (state, action) => {
    const { systemId, entity } = action.payload
    const index = findIndexById(state.systems, systemId)

    // Avoid having repeated entities
    if (state.systems[index].entities.indexOf(entity) > -1) {
      return state
    }

    const updatedSystem = {
      ...state.systems[index],
      entities: [ 
        ...state.systems[index].entities,
        entity
      ]
    }

    return {
      ...state,
      systems: [
        ...state.systems.slice(0, index),
        ...state.systems.slice(index + 1),
        updatedSystem
      ]
    }
  },

  [SYSTEM_REMOVE_ENTITY]: (state, action) => {
    const { systemId, entity } = action.payload
    
    const index = findIndexById(state.systems, systemId)
    const entityIndex = state.systems[index].entities.indexOf(entity)

    const updatedSystem = {
      ...state.systems[index],
      entities: [ 
        ...state.systems[index].entities.slice(0, entityIndex),
        ...state.systems[index].entities.slice(entityIndex + 1),
      ]
    }

    return {
      ...state,
      systems: [
        ...state.systems.slice(0, index),
        ...state.systems.slice(index + 1),
        updatedSystem
      ]
    }
  }

})

//------------------------------------------------------------------
// Action creators
//------------------------------------------------------------------

export const createEntity = (name) => {
  return {
    type: ENTITY_CREATE,
    payload: {
      name
    }
  }
}

export const addComponent = (entity, component) => {
  return (dispatch, getState) => {
    dispatch({
      type: COMPONENT_ADD,
      payload: {
        entity,
        component
      }
    })

    const componentNames = Object.keys(getEntityComponents(entity, getState()))
    getSystems(getState()).forEach(system => {
      if (arrayContainsElements(componentNames, system.requiredComponents)) {
        dispatch({
          type: SYSTEM_ADD_ENTITY,
          payload: {
            systemId: system.id,
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
    const componentNames = Object.keys(getEntityComponents(entity, getState()))
      .filter(key => key !== componentId)

    getSystems(getState()).forEach(system => {
      if (system.entities.indexOf(entity) > -1
        && arrayContainsElements(componentNames, system.requiredComponents) === false
      ) {
        dispatch({
          type: SYSTEM_REMOVE_ENTITY,
          payload: {
            systemId: system.id,
            entity
          }
        })
      }
    })
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

//------------------------------------------------------------------
// Selectors
//------------------------------------------------------------------

export const getEntities = (state) => state.ecs.entities

const getEntityComponents = (id, state) => getEntities(state)[id]

export const getSystems = (state) => state.ecs.systems

const systemExists = (id, state) => {
  return getSystems(state).filter(sys => sys.id === id).length > 0
}
