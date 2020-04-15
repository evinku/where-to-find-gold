'use strict';

var utils = require('../utils/writer.js');
var GoldPlaces = require('../service/GoldPlacesService');

module.exports.gold_placesLatitudeLongitudeRadiusGET = function gold_placesLatitudeLongitudeRadiusGET (req, res, next, latitude, longitude, radius) {
  GoldPlaces.gold_placesLatitudeLongitudeRadiusGET(latitude, longitude, radius)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
