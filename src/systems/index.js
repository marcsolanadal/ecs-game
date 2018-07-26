import MovementSystem from './movement'

import { createSystem } from '../../ducks/ecs'

export default function initializeSystems(store) {

  // TODO: pass a function to the system that returns the { id: callback }
  function registerSystem(store, id, requiredComponents, callback) {
    store.dispatch(createSystem(id, requiredComponents))
    return { [id]: callback }
  }

  return {
    ...MovementSystem(store)
  }
}


/*

The idea would be to register the systems in redux and get an object with all
the systems with the respective callback functions.

const Systems  = {
  'movement': () => {},
  ...
}

so in the main loop we can do something like,

getSystems().forEach(system => {
  system.entities.forEach(entity => {
    Systems[system.id](entity)
  })
}

this will update all the entities registered into the different systems.

// TODO: Input should be the first system and render the last


*/
