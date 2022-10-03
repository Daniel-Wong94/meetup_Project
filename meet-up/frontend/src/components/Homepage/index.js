import { useSelector } from "react-redux";
import styles from "./Homepage.module.css";
import HomepageSideNav from "./HomepageSideNav";
import Profile from "../Profile";

const Homepage = () => {
  const sessionUser = useSelector((state) => state.session.user);

  return sessionUser ? (
    <main className={styles.homepageContainer}>
      <section className={styles.homepageTitle}>
        <h1>
          Welcome, {sessionUser.firstName} {sessionUser.lastName} 👋
        </h1>
        <h2>Events from your groups</h2>
      </section>
      <section className={styles.sectionContainer}>
        <div className={styles.leftSection}>
          <HomepageSideNav />
        </div>
        <div className={styles.rightSection}>
          <Profile />
        </div>
      </section>
    </main>
  ) : (
    <h1>403</h1>
  );
};

export default Homepage;
