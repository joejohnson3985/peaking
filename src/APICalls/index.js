import { hpapikey, gmapikey } from '../apikey.js';


export const getTrails = filters => {
  const { lat, lng, maxDistance, minStars, maxResults, sort, minLength } = filters
  const base = 'https://www.hikingproject.com/data/get-trails?'
  const url = `${base}lat=${lat}&lon=${lng}&maxDistance=${maxDistance}&key=${hpapikey}&minStars=${minStars}&maxResults=${maxResults}&sort=${sort}&minLength=${minLength}`
  return fetch(url).then(response => {
    if (!response.ok) {
      throw new Error('Unable to fetch trails.');
    }
    return response.json();
  })
};

export const getSearchedTrails = address => {
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${gmapikey}`
  return fetch(url).then(response => {
    if (!response.ok) {
      throw new Error('Error grabbing that location.');
    }
    return response.json();
  })
}

export const getCurrentLocationName = location => {
  const { lat, lng } = location
  const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${gmapikey}`
  return fetch(url).then(response => {
    if (!response.ok) {
      throw new Error('Unable to name this location.');
    }
    return response.json();
  })
}

export const getMyHikes = (ids) => {
  const base = 'https://www.hikingproject.com/data/get-trails-by-id?'
  const url = `${base}ids=${ids}&key=${hpapikey}`
  return fetch(url).then(response => {
    if(!response.ok) {
      throw new Error('Error fetching your hikes.')
    }
    return response.json()
  })
}  

