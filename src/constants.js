const DEFAULT_REQUEST_OPTIONS = {
  json: true,
};

const WEATHER_REQUEST_BASE = "http://api.weatherstack.com/current";
const WEATHER_ACCESS_KEY = "b5e1d4f13c7f25e12076b64efd017202";
const WEATHER_DEFAULT_UNIT = "m"; //Metric

const GEOCODE_REQUEST_BASE =
  "https://api.mapbox.com/geocoding/v5/mapbox.places/";
const GEOCODE_ACCESS_KEY =
  "pk.eyJ1Ijoia2lsYS1zZXJnZXkiLCJhIjoiY2t4enlteW8yMnUzODJ2bzB5MnZnY292dyJ9.lUWqykF3e7U_qwOE4PplKA";
const GEOCODE_RESPONSE_LIMIT = 1;

module.exports = {
  DEFAULT_REQUEST_OPTIONS,
  WEATHER_REQUEST_BASE,
  WEATHER_ACCESS_KEY,
  WEATHER_DEFAULT_UNIT,
  GEOCODE_REQUEST_BASE,
  GEOCODE_ACCESS_KEY,
  GEOCODE_RESPONSE_LIMIT,
};
