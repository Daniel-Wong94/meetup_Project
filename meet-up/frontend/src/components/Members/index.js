import { useSelector } from "react-redux";
import { useParams } from "react-router";
import MemberCard from "./MemberCard";

const Members = () => {
  const { groupId } = useParams();
  const members = useSelector((state) => state?.groups?.[groupId]?.members);

  return (
    <div>
      {Object.values(members).map((member) => (
        <MemberCard key={member.id} member={member} />
      ))}
    </div>
  );
};

export default Members;
