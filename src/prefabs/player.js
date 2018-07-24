

export default () => {
  return entity('player')
    .component('position', { x: 0, y: 0 })
    .component('render', { src: './assets/player' })
    .component('controller')
}
