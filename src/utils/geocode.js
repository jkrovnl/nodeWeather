const request = require("request");

const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=pk.eyJ1Ijoia3Jvdm4iLCJhIjoiY2tlOTl2cWcwMjQyNjJxdWx4YjZiZTEzaCJ9.8x1XFl65joeZQCEqnt3F1w&limit=1`;
  request({ url, json: true }, (err, { body }) => {
    if (err) {
      callback("Unable to connect to Mapbox.", undefined);
    } else if (body.features.length === 0) {
      callback("Unable to find coordinates.", undefined);
    } else {
      const latitude = body.features[0].center[0];
      const longitude = body.features[0].center[1];
      const location = body.features[0].place_name;
      const data = {
        latitude,
        longitude,
        location,
      };
      callback(undefined, data);
    }
  });
};

module.exports = geocode;
