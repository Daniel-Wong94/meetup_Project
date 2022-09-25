import { useSelector } from "react-redux";
import styles from "./Homepage.module.css";

const Homepage = () => {
  const sessionUser = useSelector((state) => state.session.user);

  return sessionUser ? (
    <main className={styles.gridContainer}>
      <section className={styles.leftColumn}>
        <h1>Welcome, {sessionUser.firstName} 👋</h1>
        <h2>Events from your groups</h2>
      </section>
      <section className={styles.rightColumn}>right column</section>
    </main>
  ) : (
    <h1>403</h1>
  );
};

export default Homepage;
