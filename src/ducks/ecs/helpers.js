
function arrayContainsElements(array, required) {
  return required.reduce((acc, item) => {
    if (array.indexOf(item) === -1) {
      acc = false
    }
  
    return acc
  }, true)
}

// TODO: Can be improved to pass the parameter to use to search the index
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
