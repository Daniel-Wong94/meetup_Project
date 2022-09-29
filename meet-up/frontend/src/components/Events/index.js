import { useSelector, useDispatch } from "react-redux";
import EventCard from "./EventCard";
import { useEffect, useState } from "react";
import { getEvents } from "../../store/events";

const Events = () => {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();
  const allEvents = Object.values(useSelector((state) => state.events));

  useEffect(() => {
    (async () => {
      await dispatch(getEvents());
      setLoaded(true);
    })();
  }, [dispatch]);

  return (
    loaded && (
      <div>
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
