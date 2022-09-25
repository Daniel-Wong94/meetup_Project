import styles from "./GroupTitle.module.css";

const GroupTitle = ({ group }) => {
  return (
    <div className={styles.groupTitleContainer}>
      <div>
        <img src={group.previewImage} alt={group.name} />
      </div>
      <div>
        <h1>{group.name}</h1>
        <p>
          {group.city}, {group.state}
        </p>
        <p>
          {group.numOfMembers} members . {group.private ? "Private" : "Public"}
        </p>
        <p>{group.organizerId}</p>
      </div>
    </div>
  );
};

export default GroupTitle;
