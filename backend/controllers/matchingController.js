const NGO = require("../models/NGO");

// distance formula (Haversine)
const getDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Earth radius in km

  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) *
    Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) *
    Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c; // distance in km
};

exports.findNearestNGO = async (location) => {
  try {
    const ngos = await NGO.find();

    if (!ngos.length) return null;

    let nearest = null;
    let minDistance = Infinity;

    ngos.forEach((ngo) => {
      const dist = getDistance(
        location.lat,
        location.lng,
        ngo.location.lat,
        ngo.location.lng
      );

      if (dist < minDistance) {
        minDistance = dist;
        nearest = ngo;
      }
    });

    return nearest;

  } catch (err) {
    console.log(err);
    return null;
  }
};