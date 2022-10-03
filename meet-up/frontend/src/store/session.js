// All actions/reducers specific to session user's information
import { csrfFetch } from "./csrf";

// Type constants:
const SET_USER = "session/SET_USER";
const REMOVE_USER = "session/REMOVE_USER";
const SET_USER_GROUPS = "session/SET_USER_GROUPS";

const REMOVE_SESSION_GROUP = "/session/REMOVE_SESSION_GROUP";
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

const setUserGroups = (groups) => {
  return {
    type: SET_USER_GROUPS,
    groups,
  };
};

export const removeSessionGroup = (groupId) => {
  return {
    type: REMOVE_SESSION_GROUP,
    groupId,
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

export const fetchUserGroups = () => async (dispatch) => {
  const response = await csrfFetch("/api/users/profile/groups");
  const data = await response.json();

  const groups = {};
  data.Groups.forEach((group) => (groups[group.id] = group));

  dispatch(setUserGroups(groups));
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
      newState.groups = null;
      return newState;
    case SET_USER_GROUPS:
      newState.groups = { ...state.groups, ...action.groups };
      return newState;
    case REMOVE_SESSION_GROUP:
      newState.groups = { ...state.groups };
      delete newState.groups[action.groupId];
      return newState;
    default:
      return state;
  }
};

export default sessionReducer;
