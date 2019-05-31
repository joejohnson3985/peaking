import { hpapikey, gmapikey } from '../apikey.js';


export const getTrails = filters => {
  const { lat, lng, maxDistance, minStars, maxResults, sort } = filters
  const base = 'https://www.hikingproject.com/data/get-trails?'
  const url = `${base}lat=${lat}&lon=${lng}&maxDistance=${maxDistance}&key=${hpapikey}&minStars=${minStars}&maxResults=${maxResults}&sort=${sort}`
  return fetch(url).then(response => {
    if (!response.ok) {
      throw new Error('Error fetching trails!');
    }
    return response.json();
  })
};

export const getSearchedTrails = address => {
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${gmapikey}`
  return fetch(url).then(response => {
    if (!response.ok) {
      throw new Error('Error fetching trails!');
    }
    return response.json();
  })
} 

