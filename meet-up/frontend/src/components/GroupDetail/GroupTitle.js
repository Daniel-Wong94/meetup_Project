import styles from "./GroupTitle.module.css";

const GroupTitle = ({ group }) => {
  return (
    <div className={styles.groupTitleContainer}>
      <div className={styles.imageContainer}>
        <img src={group.previewImage} alt={group.name} />
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
