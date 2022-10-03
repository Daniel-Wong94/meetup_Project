import { Switch, Route, NavLink } from "react-router-dom";
import GroupForm from "../Groups/EditGroupForm";
import ProfileGroups from "./ProfileGroups";
import { useEffect, useState } from "react";
import { fetchUserGroups } from "../../store/session.js";
import { useDispatch } from "react-redux";
import styles from "./Profile.module.css";

const Profile = () => {
  const dispatch = useDispatch();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      await dispatch(fetchUserGroups());
      setLoaded(true);
    })();
  });

  return (
    loaded && (
      <div className={styles.dashboard}>
        {/* <h1>Dashboard</h1> */}
        <ul className={styles.profileNav}>
          <NavLink
            to="/homepage/groups"
            className={(state) => (state ? styles.active : styles.inactive)}
          >
            Your Groups
          </NavLink>
          {/* <NavLink to="/homepage/events">Your Events</NavLink> */}
        </ul>
        <div>
          <Switch>
            <Route path="/homepage/groups">
              <ProfileGroups />
            </Route>
            <Route path="/homepage/events">Events</Route>
            <Route path="/create-group">
              <GroupForm />
            </Route>
          </Switch>
        </div>
      </div>
    )
  );
};

export default Profile;
