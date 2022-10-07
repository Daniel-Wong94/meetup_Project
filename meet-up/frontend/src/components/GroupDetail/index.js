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
import { removeSessionGroup } from "../../store/session";

const GroupDetail = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [loaded, setLoaded] = useState(false);
  const { groupId } = useParams();

  const group = useSelector((state) => state.groups[groupId]);
  const sessionUser = useSelector((state) => state.session.user);
  const isOrganizer = group?.organizerId === sessionUser.id;
  const isCohost =
    group?.members?.[sessionUser.id]?.Membership?.status === "co-host";
  const deleted = <h1>This group has been deleted!</h1>;

  useEffect(() => {
    (async () => {
      await dispatch(fetchGroupDetail(groupId));
      await dispatch(getMembers(groupId));
      await dispatch(fetchEventsByGroup(groupId));
      setLoaded(true);
    })();
  }, [dispatch, groupId]);

  const handleDeleteGroup = async (e) => {
    e.preventDefault();

    await dispatch(removeSessionGroup(group.id));
    await dispatch(deleteGroup(group.id));

    return history.push(`/discover/groups/${group.id}`);
  };

  return loaded && group ? (
    <div className={styles.groupDetailContainer}>
      <GroupTitle group={group} />
      <div className={styles.navContainer}>
        <ul className={styles.navLinks}>
          <NavLink to={`/discover/groups/${group.id}/about`}>About</NavLink>
          <NavLink to={`/discover/groups/${group.id}/events`}>Events</NavLink>
        </ul>
        {isOrganizer || isCohost ? (
          <div className={styles.buttonContainer}>
            <NavLink to={`/discover/groups/${groupId}/add-event`}>
              Add Event
            </NavLink>
            <NavLink to={`/edit-group/${group.id}`}>Edit Group</NavLink>
            <button onClick={handleDeleteGroup}>Delete Group</button>
          </div>
        ) : (
          <div className={styles.buttonContainer}>
            {/* <button>Join this group</button> */}
          </div>
        )}
      </div>
      <GroupAbout />
    </div>
  ) : (
    deleted
  );
  // if (!loaded) return <div>loading...</div>;
  // else
  //   return group ? (
  //     <div className={styles.groupDetailContainer}>
  //       <GroupTitle group={group} />
  //       <div className={styles.navContainer}>
  //         <ul className={styles.navLinks}>
  //           <NavLink to={`/discover/groups/${group.id}/about`}>About</NavLink>
  //           <NavLink to={`/discover/groups/${group.id}/events`}>Events</NavLink>
  //         </ul>
  //         {isOrganizer || isCohost ? (
  //           <div className={styles.buttonContainer}>
  //             <NavLink to={`/discover/groups/${groupId}/add-event`}>
  //               Add Event
  //             </NavLink>
  //             <NavLink to={`/edit-group/${group.id}`}>Edit Group</NavLink>
  //             <button onClick={handleDeleteGroup}>Delete Group</button>
  //           </div>
  //         ) : (
  //           <div className={styles.buttonContainer}>
  //             {/* <button>Join this group</button> */}
  //           </div>
  //         )}
  //       </div>
  //       <GroupAbout />
  //     </div>
  //   ) : (
  //     deleted
  //   );
};

export default GroupDetail;
