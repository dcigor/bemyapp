exports.tests = []
exports.preconditions = []

var EVENTS = require("../lib/events");

function eventTypeNumber(type) {
  if (type == 'cat') {
    return 3012;
  } else if (type == 'dog') {
    return 3014;
  } else if (type == 'person') {
    return 3016;
  } else if (type == 'car') {
    return 3018;
  } else if (type == 'bus') {
    return 3020;
  } else if (type == 'bicycle') {
    return 3022;
  } else if (type == 'motorcycle') {
    return 3024;
  } else if (type == 'all') {
    return 1;
  } else {
    return 0;
  }
}

function eventName(type) {
  if (type == 3012) {
    return 'Cat';
  } else if (type == 3014) {
    return 'Dog';
  } else if (type == 3016) {
    return 'Person';
  } else if (type == 3018) {
    return 'Car';
  } else if (type == 3020) {
    return 'Bus';
  } else if (type == 3022) {
    return 'Bicycle';
  } else if (type == 3024) {
    return 'Motorcycle';
  } else {
    return '';
  }
}

function eventType(type) {
  if (type == 3012) {
    return 'cat';
  } else if (type == 3014) {
    return 'dog';
  } else if (type == 3016) {
    return 'person';
  } else if (type == 3018) {
    return 'car';
  } else if (type == 3020) {
    return 'bus';
  } else if (type == 3022) {
    return 'bicycle';
  } else if (type == 3024) {
    return 'motorcycle';
  } else {
    return 'any';
  }
}

function contains(arr, what) {
  return arr.find(function(e) { return e==what; } );
}

exports.function = function(name, type, count, dateTimeExpression, camera) {
  var eventTypes = type && type.length > 0 && !contains(type, 'all') ? type.map(function(t) {return eventTypeNumber(t);}) : null;
  var cameraIds  = camera && camera.length > 0 ? camera.map(function(c) { return c.Id; }) : null;
  
  // events are grouped by camera Id
  var res = [];
  var matched = 0;
  var deviceIds = Object.keys(EVENTS);
  deviceIds.map(function(deviceId) {
    // filter by camera id
    if (cameraIds && !contains(cameraIds, Number(deviceId))) {
      return null;
    }
    var events   = EVENTS[deviceId];
    var eventIds = Object.keys(events);
    eventIds.map(function(evendId) {
      var event = events[evendId];

      // filter event types
      if (eventTypes && !eventTypes.find(function(t) {return t==event.type;})) {
        return null;
      }

      // filter count
      if (++matched > count) {
        return null;
      }
        
      res.push({
        name: eventName(event.type), // todo: add details, like Bus Detected...
        type: eventType(event.type),
        cameraId: Number(deviceId),
        starttime: event.start,
        url: {images: [{url: event.url }]}
      });
      return null;
    });
    
    return null;
  });
  return res;
}
