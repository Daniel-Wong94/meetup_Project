import styles from "./GroupAbout.module.css";
import { useSelector } from "react-redux";
import ProfilePicture from "../../elements/ProfilePicture";
import { Switch, Route, useParams } from "react-router-dom";
import EventCard from "../Events/EventCard";
import CreateEventForm from "../Events/CreateEventForm";

const GroupAbout = () => {
  const { groupId } = useParams();
  const group = useSelector((state) => state.groups[groupId]);

  return (
    <div>
      <Switch>
        <Route path={`/discover/groups/${group.id}/about`}>
          <div className={styles.groupAboutContainer}>
            <div className={styles.about}>
              <h2>What we're about</h2>
              <p>{group.about}</p>
            </div>
            <div className={styles.rightSection}>
              <h3>Organizer</h3>
              <ProfilePicture
                initials={
                  group?.Organizer?.firstName[0] + group?.Organizer?.lastName[0]
                }
              />
              <h3>Members ({group.numMembers})</h3>
              <ul className={styles.membersContainer}>
                {group?.members?.map((member, idx) => (
                  <ProfilePicture
                    key={idx}
                    initials={member.firstName[0] + member.lastName[0]}
                  />
                ))}
              </ul>
            </div>
          </div>
        </Route>
        <Route path={`/discover/groups/${group.id}/events`}>
          {Object.values(group.events).length > 0 ? (
            Object.values(group.events).map((event) => (
              <EventCard key={event.id} event={event} />
            ))
          ) : (
            <div>There are currently no events for this group!</div>
          )}
        </Route>
        <Route path={`/discover/groups/:groupId/add-event`}>
          <CreateEventForm />
        </Route>
      </Switch>
    </div>
  );
};

export default GroupAbout;
