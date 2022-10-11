import ProfilePicture from "../../elements/ProfilePicture";
import SubmitButton from "../../elements/SubmitButton";
import styles from "./MemberCard.module.css";

const MemberCard = ({ member }) => {
  const handleRemoveMember = (e) => {
    e.preventDefault();
    console.log("removing member");
  };

  const handleAcceptMember = (e) => {
    e.preventDefault();
    console.log("accepting member");
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
        <p>Status: {member.Membership.status}</p>
      </div>
      <div className={styles.buttonContainer}>
        <SubmitButton
          onClick={
            member.Membership.status === "pending"
              ? handleAcceptMember
              : handleRemoveMember
          }
        >
          {member.Membership.status === "pending" ? "Accept" : "Remove"}
        </SubmitButton>
      </div>
    </div>
  );
};

export default MemberCard;
