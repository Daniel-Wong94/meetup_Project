import { useSelector } from "react-redux";
import styles from "./EventTitle.module.css";
import MapContainer from "../Maps/index.js";

const EventTitle = ({ event }) => {
  const groups = Object.values(useSelector((state) => state.groups));
  const group = groups.find((group) => group.id === event.groupId);

  return (
    <div className={styles.eventTitleContainer}>
      <div className={styles.imageContainer}>
        <img
          src={
            group?.previewImage ||
            "https://theme.zdassets.com/theme_assets/2041222/c3ea09fd3c3bd646257ea97a6083bf5f45807354.png"
          }
          alt={group?.name}
        />
      </div>
      <div className={styles.infoContainer}>
        <h1 className={styles.eventName}>{event.name}</h1>
        <p>
          Where:{" "}
          {event?.Venue?.city && event?.Venue?.state
            ? event.Venue.address +
              ", " +
              event.Venue.city +
              ", " +
              event.Venue.state
            : "NO VENUE"}
        </p>
        <p>
          When: {event?.startDate} - {event?.endDate}
        </p>
        <p>
          {event?.numAttending} Attending ·{" "}
          {event?.private ? "Private" : "Public"}
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
