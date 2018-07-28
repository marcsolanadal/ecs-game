import configureTest from 'utils/testHelpers'
import { 
  createEntity,
  editEntity,
  addComponent,
  removeComponent,
  createSystem,
  getEntities, 
  getSystems,
  getSystemsById
} from './ecsRedux'

describe('ECS', () => {
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

  it('should create a system', () => {
    store.dispatch(createSystem('uuid', ['test']))

    expect(getSystemsById(store.getState())['uuid']).toEqual({
      id: 'uuid',
      requiredComponents: ['test'],
      entities: []
    })
  })

  it('should avoid creating systems with the same name', () => {
    const createTestSystem = () => store.dispatch(createSystem('test', ['test']))
    createTestSystem();
    expect(createTestSystem).toThrow('Do not create systems with the same id!')
  })

  it('should add a component to the entity', () => {
    store.dispatch(createEntity('test'))
    store.dispatch(addComponent('test', { 'position': { x: 0, y: 0 } }))

    expect(getEntities(store.getState())).toEqual({
      'test': {
        'position': { x: 0, y: 0 }
      }
    })
  })

  it('should remove a component from an entity', () => {
    store.dispatch(createEntity('test'))
    store.dispatch(addComponent('test', { 'position': { x: 0, y: 0 } }))

    expect(getEntities(store.getState())).toEqual({
      'test': {
        'position': { x: 0, y: 0 }
      }
    })

    store.dispatch(removeComponent('test', 'position'))

    expect(getEntities(store.getState())).toEqual({ 
      'test': {} 
    })
  })

  it('should edit an entity component', () => {
    store.dispatch(createEntity('test'))
    store.dispatch(addComponent('test', { 'position': { x: 0, y: 0 } }))
    store.dispatch(addComponent('test', { 'health': { hp: 100 } }))

    expect(getEntities(store.getState())).toEqual({
      'test': {
        'position': { x: 0, y: 0 },
        'health': { hp: 100 }
      }
    })

    store.dispatch(editEntity('test', { 'position': { x: 10, y: 10 }}))

    expect(getEntities(store.getState())).toEqual({
      'test': {
        'position': { x: 10, y: 10 },
        'health': { hp: 100 }
      }
    })
  })

  it('should edit multiple entity components at the same time', () => {
    store.dispatch(createEntity('test'))
    store.dispatch(addComponent('test', { 'position': { x: 0, y: 0 } }))
    store.dispatch(addComponent('test', { 'health': { hp: 100 } }))

    expect(getEntities(store.getState())).toEqual({
      'test': {
        'position': { x: 0, y: 0 },
        'health': { hp: 100 }
      }
    })

    store.dispatch(editEntity('test', { 
      'position': { x: 10, y: 10 },
      'health': { limit: true }
    }))

    expect(getEntities(store.getState())).toEqual({
      'test': {
        'position': { x: 10, y: 10 },
        'health': { limit: true }
      }
    })
  })

  it('should add an entity to the system array when entity have the required components', () => {
    store.dispatch(createSystem('sys1', ['position']))
    store.dispatch(createEntity('foo'))
    store.dispatch(addComponent('foo', { 'position': { x: 10, y: 20 } }))

    expect(getSystemsById(store.getState())['sys1']).toEqual({
      id: 'sys1',
      requiredComponents: ['position'],
      entities: ['foo']
    })
  })

  it('should avoid having repeated entities into the system', () => {
    store.dispatch(createSystem('sys1', ['position']))
    store.dispatch(createEntity('foo'))

    store.dispatch(addComponent('foo', { 'position': { x: 10, y: 20 } }))
    store.dispatch(addComponent('foo', { 'position': { x: 10, y: 20 } }))

    expect(getSystemsById(store.getState())['sys1']).toEqual({
      id: 'sys1',
      requiredComponents: ['position'],
      entities: ['foo']
    })
  })

  it('should add an entity to multiple systems', () => {
    store.dispatch(createSystem('sys1', ['position']))
    store.dispatch(createSystem('sys2', ['position', 'health']))
    store.dispatch(createEntity('foo'))

    store.dispatch(addComponent('foo', { 'position': { x: 10, y: 20 } }))
    store.dispatch(addComponent('foo', { 'health': { hp: 100 } }))

    expect(getSystemsById(store.getState())).toEqual({
      'sys1': {
        id: 'sys1',
        requiredComponents: ['position'],
        entities: ['foo']
      },
      'sys2': {
        id: 'sys2',
        requiredComponents: ['position', 'health'],
        entities: ['foo']
      }
    })
  })

  it('should remove entity from system when removing a component', () => {
    store.dispatch(createSystem('sys1', ['position']))
    store.dispatch(createEntity('foo'))
    store.dispatch(addComponent('foo', { 'position': { x: 10, y: 20 } }))

    expect(getSystemsById(store.getState())['sys1']).toEqual({
      id: 'sys1',
      requiredComponents: ['position'],
      entities: ['foo']
    })

    store.dispatch(removeComponent('foo', 'position'))

    expect(getSystemsById(store.getState())['sys1']).toEqual({
      id: 'sys1',
      requiredComponents: ['position'],
      entities: []
    })
  })

})
