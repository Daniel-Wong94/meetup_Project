import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getGroups } from "../../store/groups";
import GroupCard from "./GroupCard";

const Groups = () => {
  console.log("in groups");
  const dispatch = useDispatch();
  // const sessionUser = useSelector((state) => state.session.user);
  const groups = Object.values(useSelector((state) => state.groups));

  useEffect(() => {
    (async () => {
      await dispatch(getGroups());
    })();
  }, [dispatch]);

  return (
    <div>
      <ul>
        {groups.map((group) => (
          <GroupCard key={group.id} group={group} />
        ))}
      </ul>
    </div>
  );
};

export default Groups;
