const request = require("postman-request");

const {
  DEFAULT_REQUEST_OPTIONS,
  WEATHER_REQUEST_BASE,
  WEATHER_ACCESS_KEY,
  WEATHER_DEFAULT_UNIT,
  GEOCODE_REQUEST_BASE,
  GEOCODE_ACCESS_KEY,
  GEOCODE_RESPONSE_LIMIT,
} = require("./constants");

const getGeocode = (address, callback) => {
  const url = `${GEOCODE_REQUEST_BASE}${encodeURIComponent(
    address
  )}.json?access_token=${GEOCODE_ACCESS_KEY}&limit=${GEOCODE_RESPONSE_LIMIT}`;
  request({ ...DEFAULT_REQUEST_OPTIONS, url }, (error, response) => {
    const data = response?.body;
    if (error) {
      callback("Check your internet connection", undefined);
    } else if (data.message) {
      callback(data.message, undefined);
    } else if (data.features.length === 0) {
      callback("No locations found. Try another search", undefined);
    } else {
      const placeData = data.features[0];
      callback(undefined, {
        location: placeData.place_name,
        latitude: placeData.center[1],
        longitude: placeData.center[0],
      });
    }
  });
};

const getWeather = (latitude, longitude, callback) => {
  const url = `${WEATHER_REQUEST_BASE}?access_key=${WEATHER_ACCESS_KEY}&query=${latitude},${longitude}&unit=${WEATHER_DEFAULT_UNIT}`;
  request(
    {
      ...DEFAULT_REQUEST_OPTIONS,
      url,
    },
    (error, response, body) => {
      const data = response?.body;
      if (error) {
        callback("Check your Internet connection", undefined);
      } else if (data.error) {
        callback(data.error.info, undefined);
      } else {
        callback(undefined, data.current);
      }
    }
  );
};

module.exports = {
  getGeocode,
  getWeather,
};
