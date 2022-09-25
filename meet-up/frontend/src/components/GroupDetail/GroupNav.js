import { NavLink } from "react-router-dom";

const GroupNav = ({ group }) => {
  return (
    <ul>
      <NavLink to={`/all-groups/${group.id}`}>About</NavLink>
      <NavLink to="/all-groups">Events</NavLink>
      <NavLink to="/all-groups">Members</NavLink>
      <NavLink to="/all-groups">Photos</NavLink>
      <NavLink to="/all-groups">Discussions</NavLink>
      <NavLink to="/all-groups">More</NavLink>
      <button>Join this group</button>
    </ul>
  );
};

export default GroupNav;
