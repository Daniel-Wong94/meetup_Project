import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getEvents } from "../../store/events";
import EventCard from "./EventCard";

const Events = () => {
  const dispatch = useDispatch();
  // const sessionUser = useSelector((state) => state.session.user);
  const events = Object.values(useSelector((state) => state.events));
  console.log("events", events);

  useEffect(() => {
    (async () => {
      await dispatch(getEvents());
    })();
  }, [dispatch]);

  return (
    <div>
      <ul>
        {events.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </ul>
    </div>
  );
};

export default Events;
