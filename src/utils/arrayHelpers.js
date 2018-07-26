
function arrayContainsElements(array, required) {
  return required.reduce((acc, item) => {
    if (array.indexOf(item) === -1) {
      acc = false
    }
  
    return acc
  }, true)
}

module.exports = {
  arrayContainsElements
}
