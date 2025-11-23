// backend/server.js
require('dotenv').config();
const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const GOOGLE_KEY = process.env.GOOGLE_API_KEY;
if (!GOOGLE_KEY) {
  console.error("ERROR: set GOOGLE_API_KEY in backend/.env");
  process.exit(1);
}

// Haversine distance (meters)
function distanceMeters(lat1, lon1, lat2, lon2) {
  function toRad(v){ return v * Math.PI / 180; }
  const R = 6371000;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
            Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
}

// Map simple type names to Google Places type (you can expand)
const TYPE_MAP = {
  hospital: 'hospital',
  clinic: 'doctor', // google has "doctor" as a type; many clinics are "health"
  pharmacy: 'pharmacy',
  blood_bank: 'blood_bank'
};

app.get('/nearby', async (req, res) => {
  const { lat, lon, type = '', radius = 2500 } = req.query;
  if (!lat || !lon) return res.status(400).json({ error: "Missing lat or lon" });

  // Build URL
  const placeType = type && TYPE_MAP[type] ? TYPE_MAP[type] : '';
  const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lon}&radius=${radius}${placeType ? '&type=' + placeType : ''}&key=${GOOGLE_KEY}`;

  try {
    const r = await fetch(url);
    const json = await r.json();

    // Handle errors from Google
    if (json.status && json.status !== 'OK' && json.status !== 'ZERO_RESULTS') {
      return res.status(500).json({ error: 'Google Places error', details: json.status, message: json.error_message || '' });
    }

    // Map results to a stable simplified array
    const results = (json.results || []).map(place => {
      const lat2 = place.geometry?.location?.lat;
      const lon2 = place.geometry?.location?.lng;
      return {
        place_id: place.place_id,
        name: place.name,
        types: place.types || [],
        vicinity: place.vicinity || place.formatted_address || '',
        lat: lat2,
        lon: lon2,
        rating: place.rating,
        user_ratings_total: place.user_ratings_total,
        // distance (meters)
        distance: (lat2 && lon2) ? Math.round(distanceMeters(Number(lat), Number(lon), lat2, lon2)) : null,
        raw: undefined // omit heavy raw details by default
      };
    });

    // Return simplified results array
    return res.json(results);

  } catch (err) {
    console.error("Server error fetching Google Places:", err);
    return res.status(500).json({ error: "Server error", message: err.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend running on http://localhost:${PORT}`));
