import { useSelector } from "react-redux";
import GroupCard from "./GroupCard";

const Groups = () => {
  const groups = Object.values(useSelector((state) => state.groups));

  const renderGroups = (groups) =>
    groups.map((group) => <GroupCard key={group.id} group={group} />);

  return (
    <div>
      <ul>{renderGroups(groups)}</ul>
    </div>
  );
};

export default Groups;
