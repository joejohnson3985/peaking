export const plantsReducer = (state=[], action) => {
  switch (action.type) {
    case 'SET_CARDS':
      return action;
    default:
      return state;
  }
}