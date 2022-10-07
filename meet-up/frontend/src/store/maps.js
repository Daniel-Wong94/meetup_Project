import { csrfFetch } from "./csrf";

const initialState = { key: null };

const LOAD_API_KEY = "/maps/LOAD_API_KEY";

const loadApiKey = (key) => {
  return {
    type: LOAD_API_KEY,
    key,
  };
};

export const getKey = () => async (dispatch) => {
  const response = await csrfFetch(`/api/maps/key`, {
    method: "POST",
  });

  const data = await response.json();
  dispatch(loadApiKey(data.googleMapsAPIKey));
};

const mapsReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_API_KEY:
      return { key: action.key };
    default:
      return state;
  }
};

export default mapsReducer;
