import { useDispatch, useSelector } from "react-redux";
import { deleteEvent } from "../../store/events";
import { NavLink } from "react-router-dom";
import styles from "./EventTitle.module.css";

const EventTitle = ({ event }) => {
  const dispatch = useDispatch();
  const groups = Object.values(useSelector((state) => state.groups));
  const group = groups.find((group) => group.id === event.groupId);
  const sessionUser = useSelector((state) => state.session.user);

  // const handleDeleteEvent = async (e) => {
  //   e.preventDefault();

  //   await dispatch(deleteEvent(event.id));
  // };

  return (
    <div className={styles.eventTitleContainer}>
      <div className={styles.imageContainer}>
        <img
          src={
            group?.previewImage ||
            "https://theme.zdassets.com/theme_assets/2041222/c3ea09fd3c3bd646257ea97a6083bf5f45807354.png"
          }
          alt={group.name}
        />
      </div>
      <div className={styles.infoContainer}>
        <h1 className={styles.eventName}>{event.name}</h1>
        <p>
          Where: {event.Venue.city}, {event.Venue.state}
        </p>
        <p>
          When: {event.startDate} - {event.endDate}
        </p>
        <p>
          {event.numAttending} Attending ·{" "}
          {event.private ? "Private" : "Public"}
        </p>
        {/* <p>Hosted by {event.organizerId}</p> */}
      </div>
      {/* <div>
        {group.organizerId === sessionUser.id && (
          <>
            <NavLink to={`/edit-event/${event.id}`}>Edit Event</NavLink>
            <button onClick={handleDeleteEvent}>Delete Event</button>
          </>
        )}
      </div> */}
    </div>
  );
};

export default EventTitle;
