import styles from "./GroupAbout.module.css";
import { useDispatch, useSelector } from "react-redux";
import ProfilePicture from "../../elements/ProfilePicture";
import { Switch, Route, useParams } from "react-router-dom";
import EventCard from "../Events/EventCard";
import { useEffect, useState } from "react";
import { getMembers } from "../../store/groups";
import { fetchEventsByGroup } from "../../store/groups";
import CreateEventForm from "../Events/CreateEventForm";

const GroupAbout = () => {
  const dispatch = useDispatch();
  const [loaded, setLoaded] = useState(false);
  const { groupId } = useParams();
  const group = useSelector((state) => state.groups[groupId]);

  useEffect(() => {
    (async () => {
      await dispatch(getMembers(groupId));
      // await dispatch(fetchEventsByGroup(groupId));
      setLoaded(true);
    })();
  }, [dispatch, groupId]);

  return (
    loaded && (
      <div>
        <Switch>
          <Route path={`/discover/groups/${group.id}/about`}>
            <div className={styles.groupAboutContainer}>
              <div className={styles.about}>
                <h2>What we're about</h2>
                <p>{group.about}</p>
              </div>
              <div>
                <h3>Organizer</h3>
                <h3>Members ({group.numMembers})</h3>
                <ul>
                  {group?.members?.map((member) => (
                    <ProfilePicture
                      key={member.id}
                      initials={member.firstName[0] + member.lastName[0]}
                    />
                  ))}
                </ul>
              </div>
            </div>
          </Route>
          <Route path={`/discover/groups/${group.id}/events`}>
            {group.events?.length > 0 ? (
              group.events?.map((event) => (
                <EventCard key={event.id} event={event} />
              ))
            ) : (
              <div>There are currently no events for this group!</div>
            )}
          </Route>
          <Route path={`/discover/groups/${group.id}/add-event`}>
            Add Event Form Here
            <CreateEventForm />
          </Route>
        </Switch>
      </div>
    )
  );
};

export default GroupAbout;
