import { useDispatch, useSelector } from "react-redux";
import styles from "./PersonalInfo/module.css";
import { useState } from "react";

const PersonalInfo = () => {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);

  const [firstName, setFirstName] = useState(sessionUser.firstName);
  const [lastName, setLastName] = useState(sessionUser.lastName);

  return <form></form>;
};

export default PersonalInfo;
