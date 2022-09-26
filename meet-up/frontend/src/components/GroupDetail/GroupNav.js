import { NavLink } from "react-router-dom";

const GroupNav = ({ group }) => {
  return (
    <ul>
      <NavLink to={`/discover/groups/${group.id}`}>About</NavLink>
      <NavLink to="/discover/groups">Events</NavLink>
      <NavLink to="/discover/groups">Members</NavLink>
      <NavLink to="/discover/groups">Photos</NavLink>
      <NavLink to="/discover/groups">Discussions</NavLink>
      <NavLink to="/discover/groups">More</NavLink>
      <button>Join this group</button>
    </ul>
  );
};

export default GroupNav;
