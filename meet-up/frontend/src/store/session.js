// All actions/reducers specific to session user's information
import { csrfFetch } from "./csrf";

// Type constants:
const SET_USER = "session/SET_USER";
const REMOVE_USER = "session/REMOVE_USER";

// Action creators:
const setUser = (user) => {
  return {
    type: SET_USER,
    user,
  };
};

const removeUser = () => {
  return {
    type: REMOVE_USER,
  };
};

// THUNK creators:
export const login = (user) => async (dispatch) => {
  const response = await csrfFetch("/api/users/login", {
    method: "POST",
    body: JSON.stringify(user),
  });
  const data = await response.json();
  dispatch(setUser(data));
  return data;
};

export const logout = () => async (dispatch) => {
  const response = await csrfFetch("/api/users/logout", {
    method: "POST",
  });

  dispatch(removeUser());
  return response;
};

export const restoreUser = () => async (dispatch) => {
  const response = await csrfFetch("/api/users/profile");
  const data = await response.json();

  dispatch(setUser(data));
  return response;
};

export const signup = (payload) => async (dispatch) => {
  const response = await csrfFetch("/api/users/signup", {
    method: "POST",
    body: JSON.stringify(payload),
  });

  const data = await response.json();
  dispatch(setUser(data));
  return data;
};

const initialState = { user: null };

const sessionReducer = (state = initialState, action) => {
  const newState = { ...state };
  switch (action.type) {
    case SET_USER:
      newState.user = action.user;
      return newState;
    case REMOVE_USER:
      newState.user = null;
      return newState;
    default:
      return state;
  }
};

export default sessionReducer;
