import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { fetchEventById } from "../../store/events";
import styles from "./EventCard.module.css";

const EventCard = ({ event }) => {
  const dispatch = useDispatch();
  const group = useSelector((state) => state.groups[event?.Group?.id]);

  useEffect(() => {
    (async () => {
      await dispatch(fetchEventById(event.id));
    })();
  }, [dispatch]);

  return event ? (
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
        <div>
          <p>
            {new Date(event.startDate).toLocaleDateString("en-US", {
              timeZone: "America/New_York",
              weekday: "long",
              month: "long",
              day: "numeric",
              year: "numeric",
            })}{" "}
            -{" "}
            {new Date(event.endDate).toLocaleDateString("en-US", {
              timeZone: "America/New_York",
              weekday: "long",
              month: "long",
              day: "numeric",
              year: "numeric",
            })}{" "}
          </p>
          <div>
            <Link to={`/discover/events/${event.id}/about`}>
              <h1 className={styles.eventName}>{event.name}</h1>
            </Link>
            <h2 className={styles.eventCity}>
              {event?.Venue?.city && event?.Venue?.state
                ? event.Venue.city + ", " + event.Venue.state
                : "No venue"}
            </h2>
          </div>
          <p className={styles.description}>{event?.description}</p>
        </div>
        <p className={styles.cardFooter}>
          {/* {event?.numAttending || "0"} Attendees ·{" "} */}
          {group?.private ? "Private" : "Public"} ·{group?.type}
        </p>
      </div>
    </div>
  ) : (
    <h1>Event does not exist!</h1>
  );
};

export default EventCard;
