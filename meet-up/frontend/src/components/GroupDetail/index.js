import GroupTitle from "./GroupTitle";
import GroupNav from "./GroupNav";
import GroupAbout from "./GroupAbout";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getGroups } from "../../store/groups";
import { useEffect } from "react";
import styles from "./GroupDetail.module.css";

const GroupDetail = () => {
  const dispatch = useDispatch();
  const { groupId } = useParams();
  const group = Object.values(useSelector((state) => state.groups)).find(
    (group) => group.id === Number(groupId)
  );

  const deleted = <h1>This group has been deleted!</h1>;

  useEffect(() => {
    (async () => {
      await dispatch(getGroups());
    })();
  }, [dispatch]);

  return group ? (
    <div className={styles.groupDetailContainer}>
      <GroupTitle group={group} />
      <GroupNav group={group} />
      <GroupAbout group={group} />
    </div>
  ) : (
    deleted
  );
};

export default GroupDetail;
