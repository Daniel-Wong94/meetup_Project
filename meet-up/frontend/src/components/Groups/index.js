import { useSelector } from "react-redux";
import GroupCard from "./GroupCard";
import styles from "./Groups.module.css";

const Groups = () => {
  const groups = Object.values(useSelector((state) => state?.groups));

  return (
    <div className={styles.groupsContainer}>
      <ul>
        {groups.map(
          (group, idx) =>
            Object.keys(group).length > 0 && (
              <GroupCard key={group.id + idx} group={group} />
            )
        )}
      </ul>
    </div>
  );
};

export default Groups;
