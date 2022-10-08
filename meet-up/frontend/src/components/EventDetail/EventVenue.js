import MapContainer from "../Maps";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import styles from "./EventVenue.module.css";

const EventVenue = () => {
  const { eventId } = useParams();
  const venue = useSelector((state) => state?.events?.[eventId]?.Venue);
  const event = useSelector((state) => state?.events?.[eventId]);

  const { lat, lng } = venue;

  return (
    <div className={styles.venueContainer}>
      <div className={styles.venueInfo}>
        <h3>Location:</h3>
        <p>
          {venue?.address}, {venue?.city}, {venue?.state}
        </p>
        <p>Start Time: {event.startDate.split(" ")[1]}</p>
        <p>End Time: {event.endDate.split(" ")[1]}</p>
      </div>
      <MapContainer lat={lat} lng={lng} />
    </div>
  );
};

export default EventVenue;
