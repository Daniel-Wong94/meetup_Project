import { useSelector, useDispatch } from "react-redux";
import { useParams, NavLink, useHistory } from "react-router-dom";
import EventTitle from "./EventTitle";
import { useEffect } from "react";
import { fetchEventById } from "../../store/events";
import { deleteEvent } from "../../store/events";
import styles from "./EventDetail.module.css";
import EventAbout from "../Events/EventAbout";
import { removeEventFromGroup } from "../../store/groups";

const EventDetail = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { eventId } = useParams();
  const sessionUser = useSelector((state) => state.session.user);
  const event = useSelector((state) => state.events[eventId]);
  const group = useSelector((state) => state.groups[event?.groupId]);

  useEffect(() => {
    (async () => {
      await dispatch(fetchEventById(eventId));
    })();
  }, [dispatch, eventId]);

  const handleDeleteEvent = async (e) => {
    e.preventDefault();

    await dispatch(removeEventFromGroup(event.groupId, event.id));
    await dispatch(deleteEvent(event.id));

    return history.push(`/discover/groups/${group.id}/events`);
  };

  return event ? (
    <div className={styles.eventDetailContainer}>
      <EventTitle event={event} />
      <div className={styles.navContainer}>
        <ul className={styles.navLinks}>
          <NavLink to={`/discover/events/${event.id}/about`}>About</NavLink>
          {/* <NavLink to={`/discover/events/${event.id}/venues`}>Venues</NavLink> */}
        </ul>
        {group.organizerId === sessionUser.id ? (
          <div className={styles.buttonContainer}>
            <NavLink to={`/discover/events/${event.id}/edit`}>
              Edit Event
            </NavLink>
            <button onClick={handleDeleteEvent}>Delete Event</button>
          </div>
        ) : (
          <div className={styles.buttonContainer}>
            {/* <button>Attend this Event</button> */}
          </div>
        )}
      </div>
      <EventAbout event={event} />
    </div>
  ) : (
    <h1>This event has been deleted!</h1>
  );
};

export default EventDetail;
