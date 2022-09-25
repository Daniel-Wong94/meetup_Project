// import styles from "./GroupCard.module.css";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { getGroups } from "../../store/groups";
import styles from "./EventCard.module.css";

const EventCard = ({ event }) => {
  const dispatch = useDispatch();
  const group = Object.values(useSelector((state) => state.groups)).find(
    (group) => group.id === event.groupId
  );

  useEffect(() => {
    (async () => {
      await dispatch(getGroups());
    })();
  }, [dispatch]);

  console.log("event", event);

  return (
    <div className={styles.eventContainer}>
      <div>
        <img
          src={
            group.previewImage ||
            "https://theme.zdassets.com/theme_assets/2041222/c3ea09fd3c3bd646257ea97a6083bf5f45807354.png"
          }
          alt={event.name}
        />
      </div>
      <div className={styles.detailContainer}>
        <p>
          {event.startDate} - {event.endDate}
        </p>
        <Link to={`/all-events/${event.id}`}>
          <h1>{event.name}</h1>
        </Link>
        <h2 className={styles.eventCity}>
          {event.Venue.city}, {event.Venue.state}
        </h2>
        <p className={styles.description}>{event.description}</p>
        <p className={styles.cardFooter}>
          (Insert Attendees Here) Attendees ·{" "}
          {group.private ? "Private" : "Public"} ·{group.type}
        </p>
      </div>
    </div>
  );
};

export default EventCard;
