// initial state
const initialState = {
  url: null
}

// action type 
const URLSEND = 'URLSEND';

// action creator
export const urlsend = (url) => {
  return {
    type: URLSEND,
    payload: url
  };
};

// reducer
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case URLSEND:
      return { ...state, url: action.payload };

    default: return state;
  }
}

export default reducer;