export const trailsReducer = (state=[], action) => {
  switch (action.type) {
    case 'SET_TRAILS':
      return action.trails;
    default:
      return state;
  }
}