import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import styles from "./GroupTitle.module.css";
import SubmitButton from "../../elements/SubmitButton";
import {
  requestMembershipByGroupId,
  deleteMembership,
} from "../../store/groups";
import { fetchUserPendingMemberships } from "../../store/session";
import { useEffect } from "react";

const GroupTitle = () => {
  const dispatch = useDispatch();
  const { groupId } = useParams();
  const group = useSelector((state) => state.groups?.[groupId]);
  const sessionUser = useSelector((state) => state.session.user);
  const pending = useSelector((state) => state.session?.pending);

  const isMember =
    group?.members?.[sessionUser?.id]?.Membership?.status === "member";
  const isOrganizer = sessionUser?.id === group?.organizerId;
  const isPending =
    pending &&
    Object.values(pending).find(
      (membership) => membership?.groupId === Number(groupId)
    );

  const allMembers = group?.members && Object.values(group?.members);
  const members = allMembers?.filter(
    (member) => member?.Membership?.status !== "pending"
  );

  useEffect(() => {
    (async () => {
      await dispatch(fetchUserPendingMemberships());
    })();
  }, [dispatch]);

  const handleJoinGroup = async (e) => {
    e.preventDefault();
    await dispatch(requestMembershipByGroupId(groupId));
    await dispatch(fetchUserPendingMemberships());
  };

  const handleLeaveGroup = async (e) => {
    e.preventDefault();

    await dispatch(deleteMembership(groupId, sessionUser.id));
    await dispatch(fetchUserPendingMemberships());
  };

  const joinGroupButton = (
    <SubmitButton onClick={handleJoinGroup}>Join Group</SubmitButton>
  );
  const leaveGroupButton = (
    <SubmitButton onClick={handleLeaveGroup}>Leave Group</SubmitButton>
  );
  const pendingButton = (
    <SubmitButton disabled={true}>Pending Request...</SubmitButton>
  );

  return (
    sessionUser && (
      <div className={styles.groupTitleContainer}>
        <div className={styles.imageContainer}>
          <img
            src={
              group?.Images?.[0]?.url ||
              group?.previewImage ||
              "https://theme.zdassets.com/theme_assets/2041222/c3ea09fd3c3bd646257ea97a6083bf5f45807354.png"
            }
            alt={group?.name}
            width="700 rem"
            height="500 rem"
          />
        </div>
        <div className={styles.infoContainer}>
          <h1 className={styles.groupName}>{group.name}</h1>
          <p>
            {group?.city}, {group?.state}
          </p>
          <p>
            {members?.length} members · {group.private ? "Private" : "Public"}{" "}
            Group
          </p>
          <p>
            Organized by{" "}
            {group?.Organizer?.firstName + " " + group?.Organizer?.lastName}
          </p>
          {/* REFACTOR */}
          <div className={styles.buttonRequestContainer}>
            {!isOrganizer && isPending && !isMember && pendingButton}
            {!isOrganizer && !isPending && !isMember && joinGroupButton}
            {!isOrganizer && isMember && leaveGroupButton}
          </div>
        </div>
      </div>
    )
  );
};

export default GroupTitle;
