import { Switch, Route, NavLink } from "react-router-dom";
import Groups from "../Groups";
import GroupForm from "../Groups/GroupForm";

const Profile = () => {
  return (
    <>
      <h1>Your Profile</h1>
      <ul>
        <NavLink to="/profile/groups">Your Groups</NavLink>
        <NavLink to="/profile/events">Your Events</NavLink>
        <NavLink to="/profile/create-group">Create a Group</NavLink>
      </ul>
      <div>
        <Switch>
          <Route path="/profile/groups">
            <Groups owner={true} />
          </Route>
          <Route path="/profile/events">Events</Route>
          <Route path="/profile/create-group">
            <GroupForm />
          </Route>
        </Switch>
      </div>
    </>
  );
};

export default Profile;
