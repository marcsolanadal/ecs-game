var spritesheet = require('spritesheet-js');

spritesheet('./src/game/assets/*.png', {format: 'json'}, function (err) {
  if (err) throw err;

  console.log('spritesheet successfully generated');
});
