import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import ProfileButton from "./ProfileButton";
import { logout } from "../../store/session";
import styles from "./Navigation.module.css";

const Navigation = () => {
  const sessionUser = useSelector((state) => state.session.user);
  const dispatch = useDispatch();

  return (
    <nav className={styles.navigationBar}>
      <NavLink to="/" activeClassName={styles.active}>
        Home
      </NavLink>
      {sessionUser ? (
        <ProfileButton user={sessionUser} />
      ) : (
        <>
          <NavLink to="/signup" activeClassName={styles.active}>
            Sign Up
          </NavLink>
          <NavLink to="/login" activeClassName={styles.active}>
            Log In
          </NavLink>
        </>
      )}
    </nav>
  );
};

export default Navigation;
