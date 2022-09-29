import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import styles from "./GroupTitle.module.css";

const GroupTitle = () => {
  const { groupId } = useParams();
  const group = useSelector((state) => state.groups[groupId]);

  return (
    <div className={styles.groupTitleContainer}>
      <div className={styles.imageContainer}>
        <img
          src={
            group.Images?.[0]?.url ||
            group?.previewImage ||
            "https://theme.zdassets.com/theme_assets/2041222/c3ea09fd3c3bd646257ea97a6083bf5f45807354.png"
          }
          alt={group.name}
        />
      </div>
      <div className={styles.infoContainer}>
        <h1 className={styles.groupName}>{group.name}</h1>
        <p>
          {group.city}, {group.state}
        </p>
        <p>
          {group.numMembers} members . {group.private ? "Private" : "Public"}{" "}
          Group
        </p>
        <p>Organized by User {group.organizerId}</p>
      </div>
    </div>
  );
};

export default GroupTitle;
