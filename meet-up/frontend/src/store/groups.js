import { csrfFetch } from "./csrf";

const SET_ALL_GROUPS = "/groups/GET_ALL_GROUPS";
const CREATE_GROUP = "/groups/CREATE_GROUP";
const UPDATE_GROUP = "/groups/UPDATE_GROUP";
const DELETE_GROUP = "/groups/DELETE_GROUP";
const SET_GROUP = "/groups/SET_GROUP";

const SET_MEMBERS = "/groups/members/SET_MEMBERS";
const SET_EVENTS = "/groups/events/SET_EVENTS";
const REQUEST_MEMBERSHIP = "/groups/members/REQUEST_MEMBERSHIP";
const CHANGE_MEMBERSHIP = "/groups/members/CHANGE_MEMBERSHIP";
const DELETE_MEMBERSHIP = "/groups/members/DELETE_MEMBERSHIP";

const ADD_IMAGE = "/groups/image/ADD_IMAGE";
const ADD_EVENT_TO_GROUP = "/groups/events/ADD_EVENT_TO_GROUP";
const REMOVE_EVENT_FROM_GROUP = "/groups/events/REMOVE_EVENT_FROM_GROUP";

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

const updateGroupById = (payload) => ({
  type: UPDATE_GROUP,
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

const addImage = (groupId, url) => ({
  type: ADD_IMAGE,
  groupId,
  url,
});

const requestMembership = (payload) => ({
  type: REQUEST_MEMBERSHIP,
  payload,
});

const changeMembership = (payload) => ({
  // payload: {id, groupId, memberId, status}
  type: CHANGE_MEMBERSHIP,
  payload,
});

const removeMembership = (groupId, memberId) => ({
  type: DELETE_MEMBERSHIP,
  groupId,
  memberId,
});

export const addEventToGroup = (groupId, event) => ({
  type: ADD_EVENT_TO_GROUP,
  groupId,
  event,
});

export const removeEventFromGroup = (groupId, eventId) => ({
  type: REMOVE_EVENT_FROM_GROUP,
  groupId,
  eventId,
});

export const fetchGroupDetail = (groupId) => async (dispatch) => {
  const response = await csrfFetch(`/api/groups/${groupId}`);
  const data = await response.json();

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

  const data = await response.json();
  if (response.ok) dispatch(createGroup(data));

  return data;
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

  const members = {};
  data.Members.forEach((member) => (members[member.id] = member));

  if (response.ok) dispatch(setMembers(groupId, members));
};

export const updateGroup = (group, groupId) => async (dispatch) => {
  const response = await csrfFetch(`/api/groups/${groupId}`, {
    method: "PATCH",
    body: JSON.stringify(group),
  });

  const data = await response.json();

  if (response.ok) dispatch(updateGroupById(data));
  return data;
};

export const fetchEventsByGroup = (groupId) => async (dispatch) => {
  const response = await csrfFetch(`/api/groups/${groupId}/events`);
  const { Events } = await response.json();

  dispatch(setEvents(groupId, Events));
};

export const addImageToGroupById = (groupId, url) => async (dispatch) => {
  const response = await csrfFetch(`/api/groups/${groupId}/images`, {
    method: "POST",
    body: JSON.stringify({ url }),
  });

  await response.json();

  if (response.ok) dispatch(addImage(groupId, url));
};

export const requestMembershipByGroupId = (groupId) => async (dispatch) => {
  const response = await csrfFetch(`/api/groups/${groupId}/members`, {
    method: "POST",
  });

  const data = await response.json();

  if (response.ok) dispatch(requestMembership(data));

  return data;
};

export const updateMembershipStatus =
  (groupId, memberId, status) => async (dispatch) => {
    const response = await csrfFetch(
      `/api/groups/${groupId}/members/${memberId}`,
      {
        method: "PATCH",
        body: JSON.stringify({ memberId, status }),
      }
    );

    const data = await response.json();
    if (response.ok) dispatch(changeMembership(data));

    return data;
  };

export const deleteMembership = (groupId, memberId) => async (dispatch) => {
  const response = await csrfFetch(
    `/api/groups/${groupId}/members/${memberId}`,
    {
      method: "DELETE",
    }
  );

  const data = await response.json();

  if (response.ok) dispatch(removeMembership(groupId, memberId));

  return data;
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
      newState[action.payload.id] = {
        ...state[action.payload.id],
        ...action.payload,
      };
      return newState;
    case DELETE_GROUP:
      delete newState[action.id];
      return newState;
    case SET_MEMBERS:
      newState[action.groupId].members = { ...state[action.groupId].members };
      newState[action.groupId].members = action.members;
      return newState;
    case SET_EVENTS:
      newState[action.groupId]["events"] = action.events;
      return newState;
    case ADD_IMAGE:
      newState[action.groupId] = { ...state[action.groupId] };
      newState[action.groupId]["previewImage"] = action.url;
      return newState;
    case ADD_EVENT_TO_GROUP:
      newState[action.groupId]["events"] = {
        ...state[action.groupId]["events"],
      };
      newState[action.groupId]["events"][action.event.id] = action.event;
      return newState;
    case REMOVE_EVENT_FROM_GROUP:
      newState[action.groupId]["events"] = {
        ...state[action.groupId]["events"],
      };
      delete newState[action.groupId]["events"][action.eventId];
      return newState;
    case REQUEST_MEMBERSHIP:
      newState[action.payload.groupId].members = {
        ...state[action.payload.groupId].members,
      };
      newState[action.payload.groupId].members[action.payload.memberId] =
        action.payload;
      return newState;
    case CHANGE_MEMBERSHIP:
      newState[action.payload.groupId].members[action.payload.memberId] = {
        ...state[action.payload.groupId].members[action.payload.memberId],
      };
      newState[action.payload.groupId].members[
        action.payload.memberId
      ].Membership.status = action.payload.status;
      return newState;
    case DELETE_MEMBERSHIP:
      newState[action.groupId].members[action.memberId] = {
        ...state[action.groupId].members[action.memberId],
      };
      delete newState[action.groupId].members[action.memberId];
      return newState;
    default:
      return state;
  }
};

export default groupReducer;
