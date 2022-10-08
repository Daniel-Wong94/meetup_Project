import styles from "./Venues.module.css";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import MapContainer from "../Maps";

const Venues = ({ groupId }) => {
  const venues = useSelector((state) => state?.groups?.[groupId]?.Venues);
  const [venueId, setVenueId] = useState("");
  const venue = useSelector((state) =>
    state?.groups?.[groupId]?.Venues.find(
      (venue) => venue.id === Number(venueId)
    )
  );

  const lat = parseFloat(venue?.lat) || null;
  const lng = parseFloat(venue?.lng) || null;

  return venues.length > 0 ? (
    <div className={styles.venuesContainer}>
      <div className={styles.venueInfoContainer}>
        <div className={styles.inputContainer}>
          <label htmlFor="venue">Choose a Venue:</label>
          <select
            id="venue"
            value={venueId}
            onChange={(e) => setVenueId(e.target.value)}
          >
            <option value="" disabled>
              Choose Venue
            </option>
            {venues?.map((venue) => (
              <option key={venue?.id} value={venue?.id}>
                {venue?.address}
              </option>
            ))}
          </select>
        </div>
        <div className={styles.venueInfo}>
          {venueId && (
            <h3>
              Address: {venue?.address}, {venue?.city}, {venue?.state}
            </h3>
          )}
        </div>
      </div>
      {venueId && <MapContainer lat={lat} lng={lng} />}
    </div>
  ) : (
    <h2>This group does not have any venues!</h2>
  );
};

export default Venues;
