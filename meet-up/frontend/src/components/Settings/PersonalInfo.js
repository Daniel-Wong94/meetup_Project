import { useDispatch, useSelector } from "react-redux";
import styles from "./EditProfile.module.css";
import { useState } from "react";
import { changeUserCredentials } from "../../store/session";
import SubmitButton from "../../elements/SubmitButton";
import ProfilePicture from "../../elements/ProfilePicture";

const PersonalInfo = () => {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state?.session?.user);

  const [firstName, setFirstName] = useState(sessionUser?.firstName);
  const [lastName, setLastName] = useState(sessionUser?.lastName);
  const [currentPassword, setCurrentPassword] = useState("");

  const [errors, setErrors] = useState({});
  const [hasUpdated, setHasUpdated] = useState(false);

  const handleSaveChanges = async (e) => {
    e.preventDefault();

    const form = { firstName, lastName };

    try {
      await dispatch(changeUserCredentials(form));
      setHasUpdated(true);
    } catch (err) {
      const error = await err.json();
      setErrors(error.errors);
      setHasUpdated(false);
    }
  };

  return sessionUser ? (
    <form
      className={styles.settingsForm}
      onSubmit={handleSaveChanges}
      onChange={() => setHasUpdated(false)}
    >
      <h2 className={styles.settingsFormTitle}>Personal Info</h2>
      <p>This information will appear on your public profile.</p>
      <div className={styles.profileContainer}>
        <ProfilePicture
          initials={sessionUser.firstName[0] + sessionUser.lastName[0]}
        />
      </div>
      <div className={styles.fields}>
        <label htmlFor="firstName">First Name:</label>
        <input
          id="firstName"
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        {errors.firstName && <div>{errors.firstName}</div>}
      </div>
      <div className={styles.fields}>
        <label htmlFor="firstName">Last Name:</label>
        <input
          id="lastName"
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        {errors.firstName && <div>{errors.firstName}</div>}
      </div>
      <div className={styles.fields}>
        <label htmlFor="password">Current Password:</label>
        <input
          id="password"
          type="password"
          required
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
        />
        {errors.currentPassword && <div>{errors.currentPassword}</div>}
      </div>
      <SubmitButton
        disabled={hasUpdated}
        className={hasUpdated && styles.successfulUpdate}
      >
        {hasUpdated ? "Updated!" : "Save Changes"}
      </SubmitButton>
    </form>
  ) : (
    <div>403 FORBIDDEN</div>
  );
};

export default PersonalInfo;
