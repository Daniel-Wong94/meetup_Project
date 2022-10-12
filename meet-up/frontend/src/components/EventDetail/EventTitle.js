import { useSelector } from "react-redux";
import styles from "./EventTitle.module.css";
import MapContainer from "../Maps/index.js";

const EventTitle = ({ event }) => {
  const groups = Object.values(useSelector((state) => state.groups));
  const group = groups.find((group) => group.id === event.groupId);
  const dateOption = {
    timeZone: "America/New_York",
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  };

  console.log(event);

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
          {event?.Venue?.city && event?.Venue?.state
            ? event.Venue.address +
              ", " +
              event.Venue.city +
              ", " +
              event.Venue.state
            : "NO VENUE"}
        </p>
        <p>
          Starts:{" "}
          {new Date(event?.startDate).toLocaleDateString("en-US", dateOption)}{" "}
          {event?.startDate.split(" ")[1]}
        </p>
        <p>
          Ends:{" "}
          {new Date(event?.endDate).toLocaleDateString("en-US", dateOption)}{" "}
          {event?.endDate.split(" ")[1]}
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
