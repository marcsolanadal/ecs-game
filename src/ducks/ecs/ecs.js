import { reducers } from 'utils/reduxHelpers'
import { arrayContainsElements, findIndex } from './helpers'

const ENTITY_CREATE = 'ENTITY_CREATE'
const COMPONENT_ADD = 'COMPONENT_ADD'
const SYSTEM_CREATE = 'SYSTEM_CREATE'
const SYSTEM_ADD_ENTITY = 'SYSTEM_ADD_ENTITY'

const initialState = {
  entities: {},
  byComponent: {},
  systems: []
}

//------------------------------------------------------------------
// Reducers
//------------------------------------------------------------------

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
          id:  action.payload.id,
          requiredComponents: action.payload.requiredComponents,
          entities: []
        }
      ]
    }
  },

  [SYSTEM_ADD_ENTITY]: (state, action) => {
    const { systemId, entity } = action.payload
    const index = findIndex(state.systems, systemId)

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

export const getEntitiesByComponent = (type, state) => {
  return state.ecs.byComponent[type]
}

export const getSystems = (state) => state.ecs.systems

const systemExists = (id, state) => {
  return getSystems(state).filter(sys => sys.id === id).length > 0
}
