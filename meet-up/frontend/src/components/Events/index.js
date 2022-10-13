import { useSelector, useDispatch } from "react-redux";
import EventCard from "./EventCard";
import { useEffect } from "react";
import { getEvents } from "../../store/events";
import styles from "./Events.module.css";

const Events = () => {
  const dispatch = useDispatch();
  const allEvents = Object.values(useSelector((state) => state?.events));

  useEffect(() => {
    (async () => {
      await dispatch(getEvents());
    })();
  }, [dispatch]);

  return (
    allEvents && (
      <div className={styles.eventsContainer}>
        <ul>
          {allEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </ul>
      </div>
    )
  );
};

export default Events;
