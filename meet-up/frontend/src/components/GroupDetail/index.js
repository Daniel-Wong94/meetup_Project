import GroupTitle from "./GroupTitle";
import GroupAbout from "./GroupAbout";
import { useSelector, useDispatch } from "react-redux";
import { useParams, NavLink, useHistory } from "react-router-dom";
import styles from "./GroupDetail.module.css";
import {
  deleteGroup,
  fetchEventsByGroup,
  fetchGroupDetail,
} from "../../store/groups";
import { useState, useEffect } from "react";
import { getMembers } from "../../store/groups";
import {
  fetchUserPendingMemberships,
  removeSessionGroup,
} from "../../store/session";
import Notification from "../../elements/Notification";

const GroupDetail = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [loaded, setLoaded] = useState(false);
  const { groupId } = useParams();

  const group = useSelector((state) => state.groups[groupId]);
  const sessionUser = useSelector((state) => state?.session?.user);

  const isOrganizer = group?.organizerId === sessionUser?.id;
  const isCohost =
    group?.members?.[sessionUser.id]?.Membership?.status === "co-host";

  const deleted = <h1>This group has been deleted!</h1>;

  const pending =
    group?.members &&
    Object.values(group?.members).filter(
      (member) => member?.Membership?.status === "pending"
    );

  useEffect(() => {
    (async () => {
      if (sessionUser) {
        await dispatch(fetchGroupDetail(groupId));
        await dispatch(getMembers(groupId));
        await dispatch(fetchEventsByGroup(groupId));
        await dispatch(fetchUserPendingMemberships());
      }
      setLoaded(true);
    })();
  }, [dispatch, groupId, sessionUser]);

  const handleDeleteGroup = async (e) => {
    e.preventDefault();

    await dispatch(removeSessionGroup(group.id));
    await dispatch(deleteGroup(group.id));

    return history.push(`/discover/groups/${group.id}`);
  };

  return (
    <>
      {!sessionUser && <h1>You must logged in!</h1>}
      {!loaded && sessionUser && <h1>Loading...</h1>}
      {sessionUser && loaded && group && (
        <div className={styles.groupDetailContainer}>
          <GroupTitle group={group} />
          <div className={styles.navContainer}>
            <ul className={styles.navLinks}>
              <NavLink to={`/discover/groups/${group.id}/about`}>About</NavLink>
              <NavLink to={`/discover/groups/${group.id}/events`}>
                Events
              </NavLink>
              <NavLink to={`/discover/groups/${group.id}/venues`}>
                Venues
              </NavLink>
              <NavLink to={`/discover/groups/${group.id}/members`}>
                <span className={styles.membersText}>
                  Members{" "}
                  <span className={styles.notificationIcon}>
                    {pending?.length > 0 && (
                      <Notification count={pending.length} />
                    )}
                  </span>
                </span>
              </NavLink>
            </ul>
            {
              (isOrganizer || isCohost) && (
                <div className={styles.buttonContainer}>
                  <NavLink to={`/discover/groups/${groupId}/add-event`}>
                    Add Event
                  </NavLink>
                  <NavLink to={`/edit-group/${group.id}`}>Edit Group</NavLink>
                  <button onClick={handleDeleteGroup}>Delete Group</button>
                </div>
              )
              // : (
              //   <div className={styles.buttonContainer}>
              //     {/* <button>Join this group</button> */}
              //   </div>)
            }
          </div>
          <GroupAbout />
        </div>
      )}
      {loaded && !group && deleted}
    </>
  );
};

export default GroupDetail;
