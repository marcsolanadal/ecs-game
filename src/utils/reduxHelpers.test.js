import { connect } from './reduxHelpers'

describe('connect', () => {

  it('should be able to access state from selectors without passing state', () => {
    connect((state) => ({
      test: (state) => { foo: 'bar' }
    })((props) => {
      expect(props.test).toBe({ foo: 'bar' })
    })
  })

  it('should be able to dispatch actions without explicitly calling dispatch', () => {

  })

})
