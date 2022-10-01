import { csrfFetch } from "./csrf";

const SET_EVENTS = "/events/SET_EVENTS";
const CREATE_EVENT = "/events/ADD_EVENT";
const UPDATE_EVENT = "/events/UPDATE_EVENT";
const DELETE_EVENT = "/events/DELETE_EVENT";

const SET_EVENT = "/events/SET_EVENT";

const setEvents = (events) => {
  return {
    type: SET_EVENTS,
    events,
  };
};

const setEvent = (event) => {
  return {
    type: SET_EVENT,
    event,
  };
};

const addEvent = (event) => {
  return {
    type: CREATE_EVENT,
    event,
  };
};

const updateEvent = (id, payload) => {
  return {
    type: UPDATE_EVENT,
    id,
    payload,
  };
};

const removeEvent = (id) => {
  return {
    type: DELETE_EVENT,
    id,
  };
};

export const getEvents = () => async (dispatch) => {
  const response = await csrfFetch("/api/events");
  const data = await response.json();
  const events = {};
  data.Events.forEach((event) => (events[event.id] = event));

  dispatch(setEvents(events));
};

export const createEvent = (groupId, event) => async (dispatch) => {
  const response = await csrfFetch(`/api/groups/${groupId}/events`, {
    method: "POST",
    body: JSON.stringify(event),
  });

  const data = await response.json();

  if (response.ok) dispatch(addEvent(groupId, data));

  return response;
};

// WORK IN PROGRESS
export const deleteEvent = (id) => async (dispatch) => {
  const response = await csrfFetch(`/api/events/${id}`, {
    method: "DELETE",
  });

  await response.json();

  if (response.ok) dispatch(removeEvent(id));
};

export const fetchEventById = (eventId) => async (dispatch) => {
  const response = await csrfFetch(`/api/events/${eventId}`);
  const data = await response.json();

  console.log("data", data);
  if (response.ok) dispatch(setEvent(data));
};

export const updateEventById = (eventId, payload) => async (dispatch) => {
  const response = await csrfFetch(`/api/events/${eventId}`, {
    method: "PATCH",
    body: JSON.stringify(payload),
  });

  const data = await response.json();

  console.log("data", data);
};

const eventReducer = (state = {}, action) => {
  let newState = { ...state };
  switch (action.type) {
    case SET_EVENTS:
      newState = { ...action.events };
      return newState;
    case SET_EVENT:
      newState[action.event.id] = {
        ...state[action.event.id],
        ...action.event,
      };
      return newState;
    case CREATE_EVENT:
      newState[action.event.id] = action.event;
      return newState;
    case UPDATE_EVENT:
      newState[action.id] = { ...action.payload };
      return newState;
    case DELETE_EVENT:
      delete newState[action.id];
      return newState;
    default:
      return state;
  }
};

export default eventReducer;
