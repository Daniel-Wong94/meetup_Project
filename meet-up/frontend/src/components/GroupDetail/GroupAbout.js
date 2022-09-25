import styles from "./GroupAbout.module.css";

const GroupAbout = ({ group }) => {
  return (
    <div className={styles.groupAboutContainer}>
      <div>
        <h2>What we're about</h2>
        <p>{group.about}</p>
      </div>
      <div>
        <h3>Organizer</h3>
        <h3>Members ({group.numMembers})</h3>
      </div>
    </div>
  );
};

export default GroupAbout;
