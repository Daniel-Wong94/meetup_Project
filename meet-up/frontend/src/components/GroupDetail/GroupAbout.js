import styles from "./GroupAbout.module.css";
import { useSelector } from "react-redux";
import ProfilePicture from "../../elements/ProfilePicture";
import { Switch, Route, useParams } from "react-router-dom";
import EventCard from "../Events/EventCard";
import CreateEventForm from "../Events/CreateEventForm";
import Venues from "../Venues";

const GroupAbout = () => {
  const { groupId } = useParams();
  const group = useSelector((state) => state.groups[groupId]);
  const sessionUser = useSelector((state) => state.session.user);
  const isOrganizer = group?.organizerId === sessionUser.id;

  const allMembers = Object.values(group?.members);
  const members = allMembers.filter(
    (member) => member.Membership.status !== "pending"
  );
  const pending = allMembers.filter(
    (member) => member.Membership.status === "pending"
  );

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
              <h3>Members ({members.length})</h3>
              <ul className={styles.membersContainer}>
                {members.map((member, idx) => (
                  <ProfilePicture
                    key={idx}
                    initials={member.firstName[0] + member.lastName[0]}
                  />
                ))}
              </ul>
              {isOrganizer && (
                <>
                  <h3>Pending ({pending.length})</h3>
                  <ul className={styles.membersContainer}>
                    {pending.map((member, idx) => (
                      <ProfilePicture
                        key={idx}
                        initials={member.firstName[0] + member.lastName[0]}
                      />
                    ))}
                  </ul>
                </>
              )}
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
        <Route path={`/discover/groups/:groupId/venues`}>
          <Venues groupId={groupId} />
        </Route>
        <Route path={`/discover/groups/:groupId/add-event`}>
          <CreateEventForm />
        </Route>
      </Switch>
    </div>
  );
};

export default GroupAbout;
