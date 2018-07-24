
export default () => {
  return entity('enemy')
    .component('position', { x: 100, y: 0 })
    .component('render', { src: './assets/enemy' })
}
