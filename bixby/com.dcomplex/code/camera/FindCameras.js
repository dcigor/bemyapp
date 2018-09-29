exports.tests = []
exports.preconditions = []

var CAMERAS = require("../lib/cameras");

exports.function = function(name, count) {
  // filter to return requested number of cameras
  var matched = 0;
  
  if (name == 'all') {
    name = null;
  }
 
  var res = CAMERAS.map(function(camera) {
    // filter camera name
    if (name && !camera.Name.toLowerCase().includes(name)) {
      return null;
    }
    
    // filter count
    if (++matched > count) {
      return null;
    }
    return {
      Id: camera.Id,
      name: camera.Name,
      image: camera.image
    };
  });
  return res.filter(function(c) { return c; });
}
