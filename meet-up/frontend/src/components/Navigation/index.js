import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import styles from "./Navigation.module.css";
import LoginFormModal from "../LoginFormModal";

const Navigation = () => {
  const sessionUser = useSelector((state) => state.session.user);

  return (
    <nav className={styles.navigationBar}>
      <NavLink exact to="/" activeClassName={styles.active}>
        Home
      </NavLink>
      {sessionUser ? (
        <ProfileButton user={sessionUser} />
      ) : (
        <>
          <NavLink to="/signup" activeClassName={styles.active}>
            Sign Up
          </NavLink>
          <LoginFormModal />
        </>
      )}
    </nav>
  );
};

export default Navigation;
