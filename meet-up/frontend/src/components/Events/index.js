import { useSelector, useDispatch } from "react-redux";
import EventCard from "./EventCard";
import { useEffect } from "react";
import { getEvents } from "../../store/events";

const Events = () => {
  const dispatch = useDispatch();
  const allEvents = Object.values(useSelector((state) => state.events));

  useEffect(() => {
    (async () => {
      await dispatch(getEvents());
    })();
  }, [dispatch]);

  return (
    <div>
      <ul>
        {allEvents.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </ul>
    </div>
  );
};

export default Events;
