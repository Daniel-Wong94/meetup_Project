import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import styles from "./Navigation.module.css";
import FormModal from "../FormModal";
import MeetupLogo from "../../elements/MeetupLogo";

const Navigation = () => {
  const sessionUser = useSelector((state) => state.session.user);

  const loggedIn = (
    <>
      {/* <NavLink to="/all-events">Events</NavLink>
      <NavLink to="/all-groups">Groups</NavLink> */}
      <NavLink to="/discover/groups">Discover</NavLink>
      <ProfileButton user={sessionUser} />
    </>
  );

  const loggedOut = <FormModal />;

  return (
    <nav className={sessionUser ? styles.homepageNavBar : styles.navBar}>
      <NavLink exact to={sessionUser ? "/homepage" : "/"}>
        <MeetupLogo />
      </NavLink>
      {sessionUser ? loggedIn : loggedOut}
    </nav>
  );
};

export default Navigation;
