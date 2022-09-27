import { useSelector } from "react-redux";
import { useParams } from "react-router";
import EventTitle from "./EventTitle";

const EventDetail = () => {
  const { eventId } = useParams();
  const event = Object.values(useSelector((state) => state.events)).find(
    (event) => event.id === Number(eventId)
  );

  return event ? (
    <div>
      <EventTitle event={event} />
    </div>
  ) : (
    <h1>This event has been deleted!</h1>
  );
};

export default EventDetail;
