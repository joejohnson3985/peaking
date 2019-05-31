import { hpapikey } from '../apikey.js';

export const getLocalTrails = location => {
  const { lat, long } = location
  const url = `https://www.hikingproject.com/data/get-trails?lat=${lat}&lon=${long}&maxDistance=10&key=${hpapikey}`
  return fetch(url).then(response => {
    if (!response.ok) {
      throw new Error("Error fetching plants");
    }
    return response.json();
  });
};
