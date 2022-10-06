import { NavLink, Route, Switch } from "react-router-dom";
import EditProfile from "./EditProfile";
import PersonalInfo from "./PersonalInfo";
import styles from "./Settings.module.css";

const Settings = () => {
  return (
    <div className={styles.gridContainer}>
      <div className={styles.sideNavContainer}>
        <div className={styles.sideNav}>
          <div className={styles.sideNavLinks}>
            <h1 className={styles.settingsTitle}>Settings</h1>
            <NavLink
              to="/profile/settings/edit-profile"
              className={(state) => (state ? styles.active : styles.inactive)}
            >
              Edit Profile
            </NavLink>
            {/* <NavLink
              to="/profile/settings/personal-info"
              className={(state) => (state ? styles.active : styles.inactive)}
            >
              Personal Info
            </NavLink> */}
            {/* <NavLink to="">Account Management</NavLink> */}
            {/* <NavLink to="">Email Updates</NavLink>
            <NavLink to="">Privacy</NavLink>
            <NavLink to="">Social Media</NavLink>
            <NavLink to="">Interests</NavLink>
            <NavLink to="">Mobile Notifications</NavLink>
            <NavLink to="">Organizer Subscription</NavLink>
            <NavLink to="">Payment Methods</NavLink>
            <NavLink to="">Payments Made</NavLink>
            <NavLink to="">Payments Recieved</NavLink>
            <NavLink to="">Apps</NavLink> */}
          </div>
          <div className={styles.sideHelpLinks}>
            {/* <NavLink to="">API Guide</NavLink> */}
            {/* <NavLink to="">Help</NavLink> */}
          </div>
        </div>
      </div>
      <div className={styles.settingsContent}>
        <Switch>
          <Route path="/profile/settings/edit-profile">
            <EditProfile />
          </Route>
          <Route path="/profile/settings/personal-info">
            <PersonalInfo />
          </Route>
        </Switch>
      </div>
    </div>
  );
};

export default Settings;
