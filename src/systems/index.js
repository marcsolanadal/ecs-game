import MovementSystem from './movement'

export default {
  Movement: MovementSystem,
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
