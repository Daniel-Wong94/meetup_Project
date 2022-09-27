import { NavLink, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { deleteGroup } from "../../store/groups";

const GroupNav = ({ group }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const sessionUser = useSelector((state) => state.session.user);
  const isOrganizer = group.organizerId === sessionUser.id;

  const handleDeleteGroup = async (e) => {
    e.preventDefault();

    await dispatch(deleteGroup(group.id));
  };

  return (
    <ul>
      <NavLink to={`/discover/groups/${group.id}`}>About</NavLink>
      <NavLink to="/discover/groups">Events</NavLink>
      <NavLink to="/discover/groups">Members</NavLink>
      <NavLink to="/discover/groups">Photos</NavLink>
      <NavLink to="/discover/groups">Discussions</NavLink>
      <NavLink to="/discover/groups">More</NavLink>
      {isOrganizer ? (
        <>
          <button onClick={handleDeleteGroup}>Delete Group</button>
          <button>Edit Group</button>
        </>
      ) : (
        <button>Join this group</button>
      )}
    </ul>
  );
};

export default GroupNav;
