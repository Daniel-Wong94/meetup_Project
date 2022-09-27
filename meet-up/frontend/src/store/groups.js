import { csrfFetch } from "./csrf";

const SET_GROUPS = "/groups/SET_GROUPS";
const CREATE_GROUP = "/groups/ADD_GROUP";
const UPDATE_GROUP = "/groups/UPDATE_GROUP";
const DELETE_GROUP = "/groups/DELETE_GROUP";

const SET_MEMBERS = "/groups/members/SET_MEMBERS";

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

const setMembers = (groupId, members) => {
  return {
    type: SET_MEMBERS,
    groupId,
    members,
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

export const deleteGroup = (id) => async (dispatch) => {
  const response = await csrfFetch(`/api/groups/${id}`, {
    method: "DELETE",
    headers: { "Content-type": "application/json" },
  });

  await response.json();

  if (response.ok) return dispatch(removeGroup(id));
};

export const getMembers = (groupId) => async (dispatch) => {
  const response = await csrfFetch(`/api/groups/${groupId}/members`);

  const data = await response.json();

  if (response.ok) dispatch(setMembers(groupId, data.Members));
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
    case SET_MEMBERS:
      if (state[action.groupId]["members"])
        newState[action.groupId]["members"] = [
          ...state[action.groupId]["members"],
        ];
      newState[action.groupId]["members"] = action.members;
      return newState;
    default:
      return state;
  }
};

export default groupReducer;
