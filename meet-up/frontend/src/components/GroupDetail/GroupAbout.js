import styles from "./GroupAbout.module.css";
import { getMembers } from "../../store/groups";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import ProfilePicture from "../../elements/ProfilePicture";

const GroupAbout = ({ group }) => {
  const dispatch = useDispatch();
  const members = useSelector((state) => state.groups[group.id]["members"]);

  console.log("members", members);
  useEffect(() => {
    (async () => {
      await dispatch(getMembers(group.id));
    })();
  }, [dispatch, group.id]);

  return (
    members && (
      <div className={styles.groupAboutContainer}>
        <div>
          <h2>What we're about</h2>
          <p>{group.about}</p>
        </div>
        <div>
          <h3>Organizer</h3>
          <h3>Members ({group.numMembers})</h3>
          <ul>
            {members.map((member) => (
              <ProfilePicture
                key={member.id}
                initials={member.firstName[0] + member.lastName[0]}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  );
};

export default GroupAbout;
