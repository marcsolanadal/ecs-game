import { createSystem } from '../ducks/ecs'

export function registerSystem(requiredComponents = [], callback, id) {
  createSystem(id, requiredComponents)
  
  return callback
}
