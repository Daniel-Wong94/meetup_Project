import { Route } from "react-router";
import { NavLink } from "react-router-dom";
import Events from "../Events";
import Groups from "../Groups";
import GroupDetail from "../GroupDetail";
import styles from "./Discover.module.css";
import EventDetail from "../EventDetail";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

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
    </div>
  );
};

export default Discover;
