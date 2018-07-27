import { createEntity, addComponent } from 'engine/ecs'

export default function createWorld({ dispatch }) {

  dispatch(createEntity('foo'))
  dispatch(addComponent('foo', { 'position': { x: 10, y: 20 } }))
  dispatch(addComponent('foo', { 'sprite': { src: './assets/foo.png' } }))

  dispatch(createEntity('bar'))
  dispatch(addComponent('bar', { 'position': { x: 20, y: 40 } }))
  dispatch(addComponent('bar', { 'sprite': { src: './assets/bar.png' } }))

}
