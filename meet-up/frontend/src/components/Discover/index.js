import { NavLink, Route, Switch } from "react-router-dom";
import Events from "../Events";
import Groups from "../Groups";
import GroupDetail from "../GroupDetail";
import EventDetail from "../EventDetail";
import styles from "./Discover.module.css";

const Discover = () => {
  return (
    <div>
      <ul className={styles.discoverNav}>
        <NavLink
          to="/discover/groups"
          className={(state) => (state ? styles.active : styles.inactive)}
        >
          Groups
        </NavLink>
        <NavLink
          to="/discover/events"
          className={(state) => (state ? styles.active : styles.inactive)}
        >
          Events
        </NavLink>
      </ul>
      <div className={styles.discoverContent}>
        <Switch>
          <Route exact path="/discover/groups">
            <Groups />
          </Route>
          <Route path="/discover/groups/:groupId">
            <GroupDetail />
          </Route>
          <Route exact path="/discover/events">
            <Events />
          </Route>
          <Route path="/discover/events/:eventId">
            <EventDetail />
          </Route>
          <Route>404: PAGE NOT FOUND</Route>
        </Switch>
      </div>
    </div>
  );
};

export default Discover;
