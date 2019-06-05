import {trailsReducer} from './trailsReducer'
import {loadingReducer} from './loadingReducer'
import {errorReducer} from './errorReducer'

describe('reducers', () => {

  describe('trailsReducer', () => {
    it('Should return the initial state', () => {
      expect(trailsReducer(undefined, {})).toEqual([])
    })

    it('Should handle SET_TRAILS', () => {
      let action = {type: 'SET_TRAILS', trails: [{number: 1}, {number: 2}]}
      expect(trailsReducer([], action)).toEqual(action.trails)
    })
  })

  describe('loadingReducer', () => {
    it('Should return the initial state', () => {
      expect(loadingReducer(undefined, {})).toEqual(false)
    })

    it('Should handle SET_LOADING', () => {
      let action = {type: 'SET_LOADING', bool: true}
      expect(loadingReducer([], action)).toEqual(action.bool)
    })
  })

  describe('errorReducer', () => {
    it('Should return the initial state', () => {
      expect(errorReducer(undefined, {})).toEqual('')
    })

    it('Should handle SET_ERROR', () => {
      let action = {type: 'SET_ERROR', error: 'error'}
      expect(errorReducer([], action)).toEqual(action.error)
    })
  })
})