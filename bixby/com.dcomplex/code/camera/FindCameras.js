exports.tests = []
exports.preconditions = []

var CAMERAS = require("../lib/cameras");

function containsName(arr, name) {
  return arr.find(function(e) { return name.includes(e); } );
}

exports.function = function(name, count) {
  if (name && name.length == 0) {
    name = null;
  }

  // filter to return requested number of cameras
  var matched = 0;
 
  var res = CAMERAS.map(function(camera) {
    // filter camera name
    if (name && !containsName(name, camera.Name.toLowerCase())) {
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
