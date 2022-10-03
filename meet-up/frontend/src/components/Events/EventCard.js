import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styles from "./EventCard.module.css";

const EventCard = ({ event }) => {
  const group = useSelector((state) => state.groups[event.groupId]);

  return (
    <div className={styles.eventContainer}>
      <div className={styles.imgContainer}>
        <img
          className={styles.image}
          src={
            group?.previewImage ||
            group?.Images?.[0].url ||
            "https://theme.zdassets.com/theme_assets/2041222/c3ea09fd3c3bd646257ea97a6083bf5f45807354.png"
          }
          alt={event.name}
        />
      </div>
      <div className={styles.detailContainer}>
        <p>
          {new Date(event.startDate).toLocaleString("en-US", {
            timeZone: "America/New_York",
          })}{" "}
          -{" "}
          {new Date(event.endDate).toLocaleString("en-US", {
            timeZone: "America/New_York",
          })}
        </p>
        <Link to={`/discover/events/${event.id}/about`}>
          <h1 className={styles.eventName}>{event.name}</h1>
        </Link>
        <h2 className={styles.eventCity}>
          {event?.Venue?.city}, {event?.Venue?.state}
        </h2>
        <p className={styles.description}>{event.description}</p>
        <p className={styles.cardFooter}>
          {event.numAttending || "0"} Attendees ·{" "}
          {group.private ? "Private" : "Public"} ·{group.type}
        </p>
      </div>
    </div>
  );
};

export default EventCard;
