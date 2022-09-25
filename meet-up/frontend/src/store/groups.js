import { csrfFetch } from "./csrf";

const SET_GROUPS = "/groups/SET_GROUPS";
const CREATE_GROUP = "/groups/ADD_GROUP";
const UPDATE_GROUP = "/groups/UPDATE_GROUP";
const DELETE_GROUP = "/groups/DELETE_GROUP";

const setGroups = (groups) => {
  return {
    type: SET_GROUPS,
    groups,
  };
};

const createGroup = (group) => {
  return {
    type: CREATE_GROUP,
    group,
  };
};

// const updateGroup = (id, payload) => {
//   return {
//     type: UPDATE_GROUP,
//     id,
//     payload,
//   };
// };

const removeGroup = (id) => {
  return {
    type: DELETE_GROUP,
    id,
  };
};

export const getGroups = () => async (dispatch) => {
  const response = await csrfFetch("/api/groups");
  const data = await response.json();
  const groups = {};
  data.Groups.forEach((group) => (groups[group.id] = group));

  dispatch(setGroups(groups));
};

export const addGroup = (group) => async (dispatch) => {
  const response = await csrfFetch("/api/groups", {
    method: "POST",
    header: { "Content-type": "application/json" },
    body: JSON.stringify(group),
  });

  if (response.ok) dispatch(createGroup(response));

  return response;
};

// WORK IN PROGRESS
export const deleteGroup = (id) => async (dispatch) => {
  const response = await csrfFetch(`/api/groups/${id}`, {
    method: "DELETE",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(id),
  });

  const data = await response.json();
  console.log("data", data);

  if (response.ok) dispatch(removeGroup(id));

  console.log("response", response);
};

const groupReducer = (state = {}, action) => {
  let newState = { ...state };
  switch (action.type) {
    case SET_GROUPS:
      newState = { ...action.groups };
      return newState;
    case CREATE_GROUP:
      newState[action.group.id] = action.group;
      return newState;
    case UPDATE_GROUP:
      newState[action.id] = { ...action.payload };
      return newState;
    case DELETE_GROUP:
      delete newState[action.id];
      return newState;
    default:
      return state;
  }
};

export default groupReducer;
