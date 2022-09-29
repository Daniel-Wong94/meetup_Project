import { csrfFetch } from "./csrf";

const SET_ALL_GROUPS = "/groups/GET_ALL_GROUPS";
const CREATE_GROUP = "/groups/CREATE_GROUP";
const UPDATE_GROUP = "/groups/UPDATE_GROUP";
const DELETE_GROUP = "/groups/DELETE_GROUP";
const SET_GROUP = "/groups/SET_GROUP";

const SET_MEMBERS = "/groups/members/SET_MEMBERS";
const SET_EVENTS = "/groups/events/SET_EVENTS";

const setGroups = (groups) => ({
  type: SET_ALL_GROUPS,
  groups,
});

const setGroup = (groupId, group) => ({
  type: SET_GROUP,
  groupId,
  group,
});

const createGroup = (group) => ({
  type: CREATE_GROUP,
  group,
});

const updateGroupById = (id, payload) => ({
  type: UPDATE_GROUP,
  id,
  payload,
});

const removeGroup = (id) => ({
  type: DELETE_GROUP,
  id,
});

const setMembers = (groupId, members) => ({
  type: SET_MEMBERS,
  groupId,
  members,
});

const setEvents = (groupId, events) => ({
  type: SET_EVENTS,
  groupId,
  events,
});

export const fetchGroupDetail = (groupId) => async (dispatch) => {
  const response = await csrfFetch(`/api/groups/${groupId}`);
  const data = await response.json();
  console.log("data", data);

  dispatch(setGroup(groupId, data));
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
    body: JSON.stringify(group),
  });

  if (response.ok) dispatch(createGroup(response));
};

export const deleteGroup = (id) => async (dispatch) => {
  const response = await csrfFetch(`/api/groups/${id}`, {
    method: "DELETE",
  });

  await response.json();

  if (response.ok) dispatch(removeGroup(id));
};

export const getMembers = (groupId) => async (dispatch) => {
  const response = await csrfFetch(`/api/groups/${groupId}/members`);
  const data = await response.json();

  if (response.ok) dispatch(setMembers(groupId, data.Members));
};

export const updateGroup = (group, groupId) => async (dispatch) => {
  const response = await csrfFetch(`/api/groups/${groupId}`, {
    method: "PATCH",
    body: JSON.stringify(group),
  });

  const data = await response.json();

  if (response.ok) dispatch(updateGroupById(data));
};

export const fetchEventsByGroup = (groupId) => async (dispatch) => {
  const response = await csrfFetch(`/api/groups/${groupId}/events`);
  const { Events } = await response.json();

  console.log("EVENTS", Events);

  dispatch(setEvents(groupId, Events));
};

const groupReducer = (state = {}, action) => {
  let newState = { ...state };
  switch (action.type) {
    case SET_ALL_GROUPS:
      newState = { ...action.groups };
      return newState;
    case SET_GROUP:
      newState[action.groupId] = { ...state[action.groupId], ...action.group };
      return newState;
    case CREATE_GROUP:
      newState[action.group.id] = action.group;
      return newState;
    case UPDATE_GROUP:
      newState[action.id] = { ...state[action.id], ...action.group };
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
    case SET_EVENTS:
      newState[action.groupId]["events"] = action.events;
      return newState;
    default:
      return state;
  }
};

export default groupReducer;
