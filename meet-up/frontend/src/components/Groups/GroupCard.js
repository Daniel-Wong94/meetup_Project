import styles from "./GroupCard.module.css";
import { Link } from "react-router-dom";

const GroupCard = ({ group }) => {
  return (
    <div className={styles.groupContainer}>
      <div className={styles.imgContainer}>
        <img src={group.previewImage} alt={group.name} />
      </div>
      <div className={styles.detailContainer}>
        <Link to={`/all-groups/${group.id}`}>
          <h1 className={styles.groupName}>{group.name}</h1>
        </Link>
        <h2 className={styles.groupCity}>
          {group.city}, {group.state}
        </h2>
        <p className={styles.about}>{group.about}</p>
        <p className={styles.cardFooter}>
          {group.numMembers} members · {group.private ? "Private" : "Public"} ·{" "}
          {group.type}
        </p>
      </div>
    </div>
  );
};

export default GroupCard;
