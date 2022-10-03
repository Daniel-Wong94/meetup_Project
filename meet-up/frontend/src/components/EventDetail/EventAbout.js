// import ProfilePicture from "../../elements/ProfilePicture";
import { Switch, Route } from "react-router-dom";
import EditEventForm from "../Events/EditEventForm";
import styles from "./EventAbout.module.css";

const EventAbout = ({ event }) => {
  return (
    <div>
      <Switch>
        <Route path={`/discover/events/${event.id}/about`}>
          <div className={styles.eventAboutContainer}>
            <div className={styles.about}>
              <h2>Description</h2>
              <p>{event.description}</p>
            </div>
            <div>
              <h3>Organizer</h3>
              <h3>Attendees ({event.numAttending})</h3>
              {/* <ul>
                {group?.members?.map((member) => (
                  <ProfilePicture
                    key={member.id}
                    initials={member.firstName[0] + member.lastName[0]}
                  />
                ))}
              </ul> */}
            </div>
          </div>
        </Route>
        {/* <Route path={`/discover/events/${event.id}/venues`}>
          {group.events?.length > 0 ? (
            group.events?.map((event) => (
              <EventCard key={event.id} event={event} />
            ))
          ) : (
            <div>There are currently no events for this group!</div>
          )}
        </Route> */}
        <Route path={`/discover/events/:eventId/edit`}>
          <EditEventForm />
        </Route>
      </Switch>
    </div>
  );
};

export default EventAbout;
