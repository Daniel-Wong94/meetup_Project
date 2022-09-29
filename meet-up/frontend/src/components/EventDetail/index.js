import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router";
import EventTitle from "./EventTitle";
import { useEffect } from "react";
import { fetchEventById } from "../../store/events";

const EventDetail = () => {
  const dispatch = useDispatch();
  const { eventId } = useParams();
  const event = useSelector((state) => state.events[eventId]);

  useEffect(() => {
    (async () => {
      await dispatch(fetchEventById(eventId));
    })();
  }, [dispatch]);

  return event ? (
    <div>
      <EventTitle event={event} />
    </div>
  ) : (
    <h1>This event has been deleted!</h1>
  );
};

export default EventDetail;
