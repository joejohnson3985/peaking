import { getTrails, getCurrentLocationName, getSearchedTrails, getMyHikes } from './index.js';
import { hpapikey, gmapikey } from '../apikey.js';


describe('APICalls', () => {
  let mockFilter;
  let mockData = {}


  describe('getTrails', () => {
    beforeEach(() => {
      mockFilter = {
        search:'',
        maxDistance: 20,
        lat: 0,
        lng: 0,
        sort: 'quality',
        minLength: 2,
        minStars: 0,
        maxResults: 20
      }
      window.fetch = jest.fn().mockImplementation(() => {
        return Promise.resolve({
          ok:true,
          json: () => {
            Promise.resolve(mockData)
          }
        })
      })
    })
    it('should be called with the correct params', () => {
      const expected = `https://www.hikingproject.com/data/get-trails?lat=0&lon=0&maxDistance=20&key=${hpapikey}&minStars=0&maxResults=20&sort=quality&minLength=2`
      getTrails(mockFilter)
      expect(window.fetch).toHaveBeenCalledWith(expected)
    });

    it("should throw an error if the response is not ok", async () => {
      window.fetch = jest.fn().mockImplementationOnce(() =>
        Promise.resolve({
          ok: false
        })
      );

      try {
        await getTrails(mockFilter);
      } catch (error) {
        expect(error.message).toBe('Unable to fetch trails.');
      }
    });
  })

  describe('getSearchedTrails', () => {
    let mockAddress = 'atlanta';
    let expected = `https://maps.googleapis.com/maps/api/geocode/json?address=atlanta&key=${gmapikey}`

    beforeEach(() => {
      window.fetch = jest.fn().mockImplementation(() => {
        return Promise.resolve({
          ok:true,
          json: () => {
            Promise.resolve(mockData)
          }
        })
      })
    })
    it('should be called with the correct params', () => {
      getSearchedTrails(mockAddress)
      expect(window.fetch).toHaveBeenCalledWith(expected)
    });

    it("should throw an error if the response is not ok", async () => {
      window.fetch = jest.fn().mockImplementationOnce(() =>
        Promise.resolve({
          ok: false
        })
      );

      try {
        await getSearchedTrails(mockAddress);
      } catch (error) {
        expect(error.message).toBe('Error grabbing that location.');
      }
    });
  })

   describe('getCurrentLocationName', () => {
    let mockLocation = {lat: 39.7392358, lng: -104.990251};
    let expected = `https://maps.googleapis.com/maps/api/geocode/json?latlng=39.7392358,-104.990251&key=${gmapikey}`
    beforeEach(() => {
      window.fetch = jest.fn().mockImplementation(() => {
        return Promise.resolve({
          ok:true,
          json: () => {
            Promise.resolve(mockData)
          }
        })
      })
    })
    it('should be called with the correct params', () => {
      getCurrentLocationName(mockLocation)
      expect(window.fetch).toHaveBeenCalledWith(expected)
    });

    it("should throw an error if the response is not ok", async () => {
      window.fetch = jest.fn().mockImplementationOnce(() =>
        Promise.resolve({
          ok: false
        })
      );

      try {
        await getCurrentLocationName(mockLocation);
      } catch (error) {
        expect(error.message).toBe('Unable to name this location.');
      }
    });
  })

   describe('getMyHikes', () => {
    let mockIds = [7000130, 7003096, 7004911];
    let expected = `https://www.hikingproject.com/data/get-trails-by-id?ids=7000130,7003096,7004911&key=${hpapikey}`
    beforeEach(() => {
      window.fetch = jest.fn().mockImplementation(() => {
        return Promise.resolve({
          ok:true,
          json: () => {
            Promise.resolve(mockData)
          }
        })
      })
    })
    it('should be called with the correct params', () => {
      getMyHikes(mockIds)
      expect(window.fetch).toHaveBeenCalledWith(expected)
    });

    it("should throw an error if the response is not ok", async () => {
      window.fetch = jest.fn().mockImplementationOnce(() =>
        Promise.resolve({
          ok: false
        })
      );

      try {
        await getMyHikes(mockIds);
      } catch (error) {
        expect(error.message).toBe('Error fetching your hikes.');
      }
    });
  })

})
