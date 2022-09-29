import { useSelector, useDispatch } from "react-redux";
import GroupCard from "./GroupCard";
import { fetchUserGroups } from "../../store/session";
import { useEffect, useState } from "react";
import { getGroups } from "../../store/groups";

const Groups = () => {
  const dispatch = useDispatch();
  const [loaded, setLoaded] = useState(false);
  const groups = Object.values(useSelector((state) => state.groups));

  useEffect(() => {
    (async () => {
      await dispatch(getGroups());
      setLoaded(true);
    })();
  }, [dispatch]);

  const renderGroups = (groups) =>
    groups.map((group) => <GroupCard key={group.id} group={group} />);

  return (
    loaded && (
      <div>
        <ul>{renderGroups(groups)}</ul>
      </div>
    )
  );
};

export default Groups;
