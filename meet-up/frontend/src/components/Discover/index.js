import { Route } from "react-router";
import { NavLink } from "react-router-dom";
import Events from "../Events";
import Groups from "../Groups";
import GroupDetail from "../GroupDetail";
import styles from "./Discover.module.css";

const Discover = () => {
  return (
    <div>
      <u className={styles.discoverNav}>
        <NavLink to="/discover/groups">Groups</NavLink>
        <NavLink to="/discover/events">Events</NavLink>
      </u>
      <Route exact path="/discover/groups">
        <Groups />
      </Route>
      <Route path="/discover/groups/:groupId">
        <GroupDetail />
      </Route>
      <Route path="/discover/events">
        <Events />
      </Route>
    </div>
  );
};

export default Discover;
