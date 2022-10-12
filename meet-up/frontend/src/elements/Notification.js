import styles from "./Notification.module.css";

const Notification = ({ count }) => {
  // count = 12;
  return (
    <i className={"fa-solid fa-bell fa-beat fa-sm " + styles.notificationIcon}>
      <span className={styles.notificationNumber}>
        {count > 9 ? "9+" : count}
      </span>
    </i>
  );
};

export default Notification;
