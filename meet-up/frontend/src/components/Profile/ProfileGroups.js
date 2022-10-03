import { useSelector } from "react-redux";
import GroupCard from "../Groups/GroupCard";

const ProfileGroups = () => {
  const groups = Object.values(useSelector((state) => state.session.groups));

  const renderGroups = (groups) =>
    groups.map((group) => <GroupCard key={group.id} group={group} />);

  return groups.length > 0 ? (
    <div>{renderGroups(groups)}</div>
  ) : (
    <div>You haven't joined any groups yet!</div>
  );
};

export default ProfileGroups;
