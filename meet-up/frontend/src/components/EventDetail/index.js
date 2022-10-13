import { useSelector, useDispatch } from "react-redux";
import { useParams, NavLink, useHistory } from "react-router-dom";
import EventTitle from "./EventTitle";
import { useEffect, useState } from "react";
import { fetchEventById } from "../../store/events";
import { deleteEvent } from "../../store/events";
import styles from "./EventDetail.module.css";
import EventAbout from "./EventAbout";
import { removeEventFromGroup } from "../../store/groups";
import { fetchAttendeesByEventId } from "../../store/events";

const EventDetail = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [loaded, setLoaded] = useState(false);
  const { eventId } = useParams();
  const sessionUser = useSelector((state) => state.session.user);
  const event = useSelector((state) => state.events[eventId]);
  const group = useSelector((state) => state.groups[event?.groupId]);

  useEffect(() => {
    (async () => {
      if (sessionUser) {
        await dispatch(fetchEventById(eventId));
        await dispatch(fetchAttendeesByEventId(eventId));
      }
      setLoaded(true);
    })();
  }, [dispatch, eventId, sessionUser]);

  const handleDeleteEvent = async (e) => {
    e.preventDefault();

    await dispatch(removeEventFromGroup(event.groupId, event.id));
    await dispatch(deleteEvent(event.id));

    return history.push(`/discover/groups/${group.id}/events`);
  };

  return (
    <>
      {!sessionUser && <h1>You must be logged in!</h1>}
      {!loaded && sessionUser && <h1>Loading...</h1>}
      {sessionUser && loaded && event && (
        <div className={styles.eventDetailContainer}>
          <EventTitle event={event} />
          <div className={styles.navContainer}>
            <ul className={styles.navLinks}>
              <NavLink to={`/discover/events/${event.id}/about`}>About</NavLink>
              <NavLink to={`/discover/events/${event.id}/venue`}>Venue</NavLink>
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
      )}
      {loaded && !event && <h1>This event has been deleted!</h1>}
    </>
  );
};

export default EventDetail;
