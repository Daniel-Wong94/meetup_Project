import GroupTitle from "./GroupTitle";
import GroupNav from "./GroupNav";
import GroupAbout from "./GroupAbout";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
// import { Route } from "react-router";

const GroupDetail = () => {
  const { groupId } = useParams();
  const group = Object.values(useSelector((state) => state.groups)).find(
    (group) => group.id === Number(groupId)
  );

  return (
    <div>
      Group Detail
      <GroupTitle group={group} />
      <GroupNav group={group} />
      <GroupAbout group={group} />
    </div>
  );
};

export default GroupDetail;
