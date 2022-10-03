import { useSelector, useDispatch } from "react-redux";
import EventCard from "./EventCard";
import { useEffect } from "react";

const Events = () => {
  const allEvents = Object.values(useSelector((state) => state.events));

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
