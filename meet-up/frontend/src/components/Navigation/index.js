import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import styles from "./Navigation.module.css";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";

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
          <SignupFormModal />
          <LoginFormModal />
        </>
      )}
    </nav>
  );
};

export default Navigation;
