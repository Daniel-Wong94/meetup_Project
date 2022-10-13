import ProfilePicture from "../../elements/ProfilePicture";
import SubmitButton from "../../elements/SubmitButton";
import styles from "./MemberCard.module.css";
import { useParams } from "react-router";
import {
  deleteMembership,
  getMembers,
  updateMembershipStatus,
} from "../../store/groups";
import { useDispatch } from "react-redux";

const MemberCard = ({ member }) => {
  const dispatch = useDispatch();
  const { groupId } = useParams();

  const handleRemoveMember = async (e) => {
    e.preventDefault();

    await dispatch(deleteMembership(groupId, member.id));
    await dispatch(getMembers(groupId));
  };

  const handleAcceptMember = async (e) => {
    e.preventDefault();

    await dispatch(updateMembershipStatus(groupId, member.id, "member"));
    await dispatch(getMembers(groupId));
  };

  return (
    <div className={styles.memberCardContainer}>
      <div>
        <ProfilePicture initials={member.firstName[0] + member.lastName[0]} />
      </div>
      <div className={styles.memberInfo}>
        <p>
          {member.firstName} {member.lastName}
        </p>
        <p>
          Status:{" "}
          {member.Membership.status[0].toUpperCase() +
            member.Membership.status.slice(1)}
        </p>
      </div>
      <div className={styles.buttonContainer}>
        {member.Membership.status !== "host" ? (
          <SubmitButton
            onClick={
              member.Membership.status === "pending"
                ? handleAcceptMember
                : handleRemoveMember
            }
          >
            {member.Membership.status === "pending" ? "Accept" : "Remove"}
          </SubmitButton>
        ) : (
          <div className={styles.fontStarContainer}>
            <i className={"fa-solid fa-star fa-xl " + styles.fontStar}></i>
          </div>
        )}
      </div>
    </div>
  );
};

export default MemberCard;
