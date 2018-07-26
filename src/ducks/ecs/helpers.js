
function arrayContainsElements(array, required) {
  return required.reduce((acc, item) => {
    if (array.indexOf(item) === -1) {
      acc = false
    }
  
    return acc
  }, true)
}

// FIXME: This is confusing since we're searching by id
function findIndexById(array, id) {
  return array.reduce((acc, item, index) => {
    if (item.id === id) {
      acc = index
    }
  
    return acc
  }, -1)
}

module.exports = {
  arrayContainsElements,
  findIndexById
}
