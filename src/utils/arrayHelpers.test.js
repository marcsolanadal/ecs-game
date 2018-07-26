import { arrayContainsElements } from './arrayHelpers'

describe('arrayHelpers', () => {

  describe('arrayContainsElements()', () => {

    it('should be true when all the required elements are contained in the array', () => {
      const arr = ['a', 'b', 'c', 'd']
      const required = ['b', 'd']
      expect(arrayContainsElements(arr, required)).toBe(true)
    })

    it('should return true when all the arrays are empty', () => {
      expect(arrayContainsElements([], [])).toBe(true)
    })

    it('should be false when all the required elements are not inside the array', () => {
      let arr = ['a', 'b', 'c']
      let required = ['b', 'd']

      expect(arrayContainsElements(arr, required)).toBe(false)

      arr = []
      required = ['b', 'd']

      expect(arrayContainsElements(arr, required)).toBe(false)

      arr = ['a', 'b', 'c']
      required = ['a', 'b', 'c', 'd']

      expect(arrayContainsElements(arr, required)).toBe(false)
    })

  })

})
