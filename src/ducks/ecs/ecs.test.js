import configureTest from 'utils/testHelpers'
import { 
  createEntity, 
  addComponent, 
  getEntities, 
  getEntitiesByComponent 
} from './ecs'

describe('ecs', () => {
  let store

  beforeEach(() => {
    store = configureTest()
  })

  afterEach(() => {
    store.dispatch({ type: 'STORE_CLEAR' })
  })

  it('should create an entity', () => {
    store.dispatch(createEntity('test'))

    expect(getEntities(store.getState())).toEqual({
      'test': {}
    })
  })

  it('should add a component to the entity', () => {
    store.dispatch(createEntity('test'))
    store.dispatch(addComponent('test', { 
      'position': { x: 0, y: 0 }
    }))

    expect(getEntities(store.getState())).toEqual({
      'test': {
        'position': { x: 0, y: 0 }
      }
    })
  })

  it('should add the entity id into the correct byComponent array', () => {
    store.dispatch(createEntity('foo'))
    store.dispatch(addComponent('foo', { 
      'position': { x: 0, y: 0 }
    }))

    expect(getEntitiesByComponent('position', store.getState())).toEqual([ 
      'foo' 
    ])

    store.dispatch(createEntity('bar'))
    store.dispatch(addComponent('bar', { 
      'position': { x: 0, y: 0 }
    }))
    expect(getEntitiesByComponent('position', store.getState())).toEqual([
      'foo', 'bar'
    ])

    store.dispatch(createEntity('baz'))
    store.dispatch(addComponent('baz', { 
      'health': { points: 100 }
    }))
    expect(getEntitiesByComponent('health', store.getState())).toEqual([
      'baz'
    ])
  })

  it('should create a new system', () => {
    store.dispatch(registerSystem(['test']))

    expect(store.getState()).toEqual({
      ecs: {
        systems: [
          { 
            requiredComponents: ['test'],
            entities: []
          }
        ]
      }
    })
  })

  it('should add an entity to the system array when entity have the required components', () => {
    
    connect((state) => {
      return {
        entities: getEntitiesWithComponents(['position'], state)
      }
    }, {
      registerSystem,
      createEntity,
      addComponent
    })((props) => {
      
      props.registerSystem(['position'])
      props.createEntity('foo')
      props.addComponent('foo', { 
        'position': { x: 10, y: 20 }
      })

      expect(props.entities).toBe(['foo'])
    })

  })

})
