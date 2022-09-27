import { Switch, Route, NavLink } from "react-router-dom";
import Groups from "../Groups";
import GroupForm from "../Groups/GroupForm";
import { useState } from "react";

const Profile = () => {
  const [showGroups, setShowGroups] = useState(true);
  const [showEvents, setShowEvents] = useState(false);

  const handleShowGroups = (e) => {
    e.preventDefault();

    setShowGroups(true);
    setShowEvents(false);
  };

  const handleShowEvents = (e) => {
    e.preventDefault();

    setShowGroups(false);
    setShowEvents(true);
  };

  return (
    <div>
      <h1>Your Stuff</h1>
      <ul>
        {/* <NavLink to="/profile/groups">Your Groups</NavLink>
        <NavLink to="/profile/events">Your Events</NavLink> */}
        {/* <NavLink to="/profile/create-group">Create a Group</NavLink> */}
        <button onClick={handleShowGroups}>Groups</button>
        <button onClick={handleShowEvents}>Events</button>
      </ul>
      <div>
        {/* <Switch>
          <Route path="/profile/groups">
            <Groups owner={true} />
          </Route>
          <Route path="/profile/events">Events</Route>
          <Route path="/profile/create-group">
            <GroupForm />
          </Route>
        </Switch> */}
        {showGroups && <Groups owner={true} />}
      </div>
    </div>
  );
};

export default Profile;
