import configureTest from 'utils/testHelpers'
import { 
  createEntity, 
  addComponent,
  createSystem,
  getEntities, 
  getEntitiesByComponent,
  getSystems
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

  it('should create a new system', () => {
    store.dispatch(createSystem('uuid', ['test'], jest.fn()))

    expect(getSystems(store.getState())).toEqual([
      { 
        id: 'uuid',
        requiredComponents: ['test'],
        entities: []
      }
    ])
  })

  it('should avoid creating systems with the same name', () => {
    const createTestSystem = () => store.dispatch(createSystem('test', ['test'], jest.fn()))
    createTestSystem();
    expect(createTestSystem).toThrow('Do not create systems with the same id!')
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

  it.only('should add an entity to the system array when entity have the required components', () => {
    const requiredComponents = ['position']

    store.dispatch(createSystem('uuid', requiredComponents))
    store.dispatch(createEntity('foo'))
    store.dispatch(addComponent('foo', { 
      'position': { x: 10, y: 20 }
    }))

    const system = getSystems(store.getState()).filter(sys => {
      return sys.requiredComponents === requiredComponents
    })

    expect(system).toEqual({
      id: 'uuid',
      requiredComponents: ['position'],
      entities: ['foo']
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

})
