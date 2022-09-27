import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getGroups } from "../../store/groups";
import GroupCard from "./GroupCard";
import { Link } from "react-router-dom";

const Groups = ({ owner }) => {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const allGroups = Object.values(useSelector((state) => state.groups));
  const userGroups = allGroups.filter(
    (group) => group.organizerId === sessionUser.id
  );

  useEffect(() => {
    (async () => {
      await dispatch(getGroups());
    })();
  }, [dispatch]);

  const renderGroups = (groups) =>
    groups.map((group) => <GroupCard key={group.id} group={group} />);

  return (
    <div>
      <ul>{owner ? renderGroups(userGroups) : renderGroups(allGroups)}</ul>
      {userGroups.length <= 0 && "You do not have any groups!"}
    </div>
  );
};

export default Groups;
