import { csrfFetch } from "./csrf";

const SET_EVENTS = "/events/SET_EVENTS";
const CREATE_EVENT = "/events/ADD_EVENT";
const UPDATE_EVENT = "/events/UPDATE_EVENT";
const DELETE_EVENT = "/events/DELETE_EVENT";

const setEvents = (events) => {
  return {
    type: SET_EVENTS,
    events,
  };
};

const createEvent = (event) => {
  return {
    type: CREATE_EVENT,
    event,
  };
};

// const updateGroup = (id, payload) => {
//   return {
//     type: UPDATE_GROUP,
//     id,
//     payload,
//   };
// };

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

export const addEvent = (event) => async (dispatch) => {
  const response = await csrfFetch("/api/events", {
    method: "POST",
    header: { "Content-type": "application/json" },
    body: JSON.stringify(event),
  });

  if (response.ok) dispatch(createEvent(response));

  return response;
};

// WORK IN PROGRESS
export const deleteEvent = (id) => async (dispatch) => {
  const response = await csrfFetch(`/api/events/${id}`, {
    method: "DELETE",
  });

  const data = await response.json();

  if (response.ok) dispatch(removeEvent(id));
};

const eventReducer = (state = {}, action) => {
  let newState = { ...state };
  switch (action.type) {
    case SET_EVENTS:
      newState = { ...action.events };
      return newState;
    case CREATE_EVENT:
      newState[action.group.id] = action.event;
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
