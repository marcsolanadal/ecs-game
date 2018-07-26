import configureTest from 'utils/testHelpers'
import { 
  createEntity, 
  addComponent,
  createSystem,
  getEntities, 
  getEntitiesByComponent,
  getSystems,
  getSystemsWithComponents
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

    expect(getSystems(store.getState())).toEqual([{ 
      id: 'uuid',
      requiredComponents: ['test'],
      entities: []
    }])
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

  xit('should only get the systems that with the requiredComponents', () => {
    store.dispatch(createSystem('sys1', ['foo']))
    store.dispatch(createSystem('sys2', ['foo', 'baz', 'bar']))
    store.dispatch(createSystem('sys3', ['bar', 'foo']))

    expect(getSystemsWithComponents(['foo', 'bar'], store.getState())).toEqual(['sys2', 'sys3'])
  })

  it('should add an entity to the system array when entity have the required components', () => {
    store.dispatch(createSystem('sys1', ['position']))
    store.dispatch(createEntity('foo'))
    store.dispatch(addComponent('foo', { 'position': { x: 10, y: 20 } }))

    expect(getSystems(store.getState())).toEqual([
      {
        id: 'sys1',
        requiredComponents: ['position'],
        entities: ['foo']
      }
    ])
  })

  it('should avoid having repeated entities into the system', () => {
    store.dispatch(createSystem('sys1', ['position']))
    store.dispatch(createEntity('foo'))

    store.dispatch(addComponent('foo', { 'position': { x: 10, y: 20 } }))
    store.dispatch(addComponent('foo', { 'position': { x: 10, y: 20 } }))

    expect(getSystems(store.getState())).toEqual([
      {
        id: 'sys1',
        requiredComponents: ['position'],
        entities: ['foo']
      }
    ])
  })

  it('should be able to add entity to multiple systems', () => {
    store.dispatch(createSystem('sys1', ['position']))
    store.dispatch(createSystem('sys2', ['position', 'health']))
    store.dispatch(createEntity('foo'))

    store.dispatch(addComponent('foo', { 'position': { x: 10, y: 20 } }))
    store.dispatch(addComponent('foo', { 'health': { hp: 100 } }))

    expect(getSystems(store.getState())).toEqual([
      {
        id: 'sys1',
        requiredComponents: ['position'],
        entities: ['foo']
      },
      {
        id: 'sys2',
        requiredComponents: ['position', 'health'],
        entities: ['foo']
      }
    ])
  })

  // TODO: This functionality will be provably erased
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
