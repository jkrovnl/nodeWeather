const request = require("request");

const forecast = (latitude, longitude, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=dbc769d231902cdba0044cb351ba8a48&query=${encodeURIComponent(
    longitude
  )},${encodeURIComponent(latitude)}`;
  request({ url, json: true }, (err, { body }) => {
    if (err) {
      callback("Unable to connect to weather service!");
    } else if (body.success === false) {
      callback("Unable to find location.");
    } else {
      const temperature = body.current.temperature;
      const rainChance = body.current.precip;
      const data = {
        temperature,
        rainChance,
      };
      callback(undefined, data);
    }
  });
};

module.exports = forecast;
