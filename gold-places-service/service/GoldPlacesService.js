'use strict';
'use strict';
const request = require('request');

const apiKey = process.env.API_KEY

/**
 * list all available gold-places
 *
 * latitude BigDecimal latitude for search gold-places
 * longitude BigDecimal longitude for search gold-places
 * radius BigDecimal radius for search gold-places
 * returns Object
 **/
exports.gold_placesLatitudeLongitudeRadiusGET = function (latitude, longitude, radius) {
  return new Promise(function (resolve, reject) {



    request(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=${radius}000&keyword=goldhaendler&name=gold&key=${apiKey}`, function (error, response, body) {

      if (Object.keys(body).length > 0) {
        resolve(body);
      } else {
        resolve();
      }
    });

  });
}
