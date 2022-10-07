// import ProfilePicture from "../../elements/ProfilePicture";
import { Switch, Route } from "react-router-dom";
import EditEventForm from "../Events/EditEventForm";
import styles from "./EventAbout.module.css";
import ProfilePicture from "../../elements/ProfilePicture";
import MapContainer from "../Maps";

const EventAbout = ({ event }) => {
  const { lat, lng } = event?.Venue;

  return (
    <div>
      <Switch>
        <Route path={`/discover/events/${event.id}/about`}>
          <div className={styles.eventAboutContainer}>
            <div className={styles.about}>
              <h2>Description</h2>
              <p>{event?.description}</p>
            </div>
            <div>
              <h3>Organizer</h3>
              <h3>Attendees ({event?.Attendees?.length})</h3>
              <ul>
                {event?.Attendees?.map((attendee) => (
                  <ProfilePicture
                    key={attendee?.id}
                    initials={attendee?.firstName[0] + attendee?.lastName[0]}
                  />
                ))}
              </ul>
            </div>
          </div>
        </Route>
        <Route path={`/discover/events/:eventId/edit`}>
          <EditEventForm />
        </Route>
        <Route path={`/discover/events/:eventId/venue`}>
          <MapContainer lat={lat} lng={lng} />
        </Route>
      </Switch>
    </div>
  );
};

export default EventAbout;
