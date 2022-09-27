import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import styles from "./Navigation.module.css";
import FormModal from "../FormModal";
import MeetupLogo from "../../elements/MeetupLogo";

const Navigation = () => {
  const sessionUser = useSelector((state) => state.session.user);

  const loggedIn = (
    <div className={styles.loggedInLinks}>
      <NavLink to="/discover/groups">Discover</NavLink>
      <NavLink to="/profile/create-group">Create a Group</NavLink>
      <ProfileButton user={sessionUser} />
    </div>
  );

  const loggedOut = <FormModal />;

  return (
    <nav className={sessionUser ? styles.loggedInNav : styles.loggedOutNav}>
      <NavLink exact to={sessionUser ? "/homepage" : "/"}>
        <MeetupLogo />
      </NavLink>
      {sessionUser ? loggedIn : loggedOut}
    </nav>
  );
};

export default Navigation;
