exports.tests = []
exports.preconditions = []

var EVENTS = require("../lib/events");

function eventTypeNumber(type) {
  if (type == 'motion') {
    return 3000;
  } else if (type == 'cat') {
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
  if (type == 3000) {
    return 'Motion';
  } else if (type == 3012) {
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
  if (type == 3000) {
    return 'motion';
  } if (type == 3012) {
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

function parseDateTime(dateTimeExpression) {
  if (!dateTimeExpression) {
    return null;
  }

  if (dateTimeExpression.date) {
    whenStart = dates.ZonedDateTime.fromDate(dateTimeExpression.date);
    whenEnd   = whenStart.withHour(23).withMinute(59).withSecond(59);
    var start = dates.ZonedDateTime.fromDate(dateTimeExpression.date);
    return {
      start: start,
      end  : start.withHour(23).withMinute(59).withSecond(59)
    };
  } else if (dateTimeExpression.dateInterval) {
      return {
        start: dates.ZonedDateTime.of(
          dateTimeExpression.dateInterval.start.year,
          dateTimeExpression.dateInterval.start.month,
          dateTimeExpression.dateInterval.start.day),
        end: dates.ZonedDateTime.of(
          dateTimeExpression.dateInterval.end.year,
          dateTimeExpression.dateInterval.end.month,
          dateTimeExpression.dateInterval.end.day,
        23, 59, 59)
    };
  } else if (dateTimeExpression.dateTimeInterval) {
      return {
        start: dates.ZonedDateTime.of(
          dateTimeExpression.dateTimeInterval.start.year,
          dateTimeExpression.dateTimeInterval.start.month,
          dateTimeExpression.dateTimeInterval.start.day,
          dateTimeExpression.dateTimeInterval.start.hour,
          dateTimeExpression.dateTimeInterval.start.minute,
          dateTimeExpression.dateTimeInterval.start.second),
        end: dates.ZonedDateTime.of(
          dateTimeExpression.dateTimeInterval.end.year,
          dateTimeExpression.dateTimeInterval.end.month,
          dateTimeExpression.dateTimeInterval.end.day,
          dateTimeExpression.dateTimeInterval.end.hour,
          dateTimeExpression.dateTimeInterval.end.minute,
          dateTimeExpression.dateTimeInterval.end.second)
      };
  } else {
    return null;
  }
}

function isTimeMatch(filter, time) {
  if (!filter) {
    return true; // no restrictions on time
  }
  
  return false;
}

function liveEvents() {
  var url = 'https://ip-camera-recorder.firebaseio.com/event/1.json';
  var res = http.getUrl(url, {format: 'json'});
  return res;
}

exports.function = function(name, type, count, dateTimeExpression, camera) {
  var eventTypes = type && type.length > 0 && !contains(type, 'all') ? type.map(function(t) {return eventTypeNumber(t);}) : null;
  var cameraIds  = camera && camera.length > 0 ? camera.map(function(c) { return c.Id; }) : null;
  var SOURCE = EVENTS; // start with hard-coded events
  if (cameraIds && contains(cameraIds, 1)) {
    if (cameraIds.length == 1) {
      // replace wiht live events
      SOURCE = {"1": liveEvents()};
    } else {
      // append live events
      SOURCE['1'] = liveEvents();
    }
  }

  //var x = dates.ZonedDateTime.parseDateTime('2018-09-28T16:15:45.721Z', "yyyy-MM-dd'T'HH:mm:ss'.000Z'");
  var x = dates.ZonedDateTime.parseDateTime('2018-09-28T16:15:45.721Z', "yyyy-MM-dd'T'HH:mm:ss.SSSVV");
  console.log(x);
  var when = parseDateTime(dateTimeExpression);
  //console.log(when);
 
  // events are grouped by camera Id
  var res = [];
  var matched = 0;
  var deviceIds = Object.keys(SOURCE);
  console.log(cameraIds, deviceIds);
  deviceIds.map(function(deviceId) {
    // filter by camera id
    if (cameraIds && !contains(cameraIds, Number(deviceId))) {
      return null;
    }

    var events   = SOURCE[deviceId];
    var eventIds = Object.keys(events);
    eventIds.map(function(eventId) {
      var event = events[eventId];

      // filter event types
      if (eventTypes && !eventTypes.find(function(t) {return t==event.type;})) {
        return null;
      }

      if (!isTimeMatch(when, event.start)) {
        return null;
      }

      // filter count
      if (++matched > count) {
        return null;
      }

      res.push({
        id: Number(eventId),
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
