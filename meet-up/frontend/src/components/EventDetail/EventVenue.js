import MapContainer from "../Maps";
import { useSelector } from "react-redux";
import { useParams } from "react-router";

const EventVenue = () => {
  const { eventId } = useParams();
  const venue = useSelector((state) => state?.events?.[eventId]?.Venue);

  console.log("VENUE", venue);

  return (
    <div className={""}>
      <div></div>
    </div>
  );
};

export default EventVenue;
