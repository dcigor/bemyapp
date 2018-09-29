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

exports.function = function(name, type, count, dateTimeExpression) {
  // set defaults
  if (!type) {
    type = 'all';
  }

  var eventType = eventTypeNumber(type);
  if (!eventType) {
    return [];
  }

  // filter to return only events of the requested type
  var matched = 0;
  var keys = Object.keys(EVENTS);
  var flat = keys.map(function(id) {
    var e = EVENTS[id];
    
    // filter event type
    if ((eventType != 1) && (e.type != eventType)) {
      return null;
    }

    // filter count
    if (++matched > count) {
      return null;
    }

    return {
      name: eventName(e.type), // todo: add details, like Bus Detected...
      type: type,
      starttime: e.start,
      url: {images: [{url: e.url }]}
    };
  });
  return flat.filter(function(e) { return e; });
}
