import styles from "./EditProfile.module.css";
import SubmitButton from "../../elements/SubmitButton";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { changeUserCredentials } from "../../store/session";

const EditProfile = () => {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state?.session?.user);

  const [email, setEmail] = useState(sessionUser?.email);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [hasUpdated, setHasUpdated] = useState(false);

  const handleSaveChanges = async (e) => {
    e.preventDefault();

    const form = { newEmail: email, currentPassword, newPassword };

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
      <h2 className={styles.settingsFormTitle}>Edit profile</h2>
      {/* <p>This information will appear on your public profile</p> */}
      {/* <div className={styles.profileContainer}> */}
      {/* <ProfilePicture
          initials={sessionUser.firstName[0] + sessionUser.lastName[0]}
        /> */}
      {/* <button>Upload New</button>
        <button>Choose from library</button> */}
      {/* </div> */}
      <div className={styles.fields}>
        <label htmlFor="email">Email:</label>
        <input
          id="email"
          type="text"
          placeholder="Your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {errors.newEmail && <div>{errors.newEmail}</div>}
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
      <div className={styles.fields}>
        <label htmlFor="newPassword">New Password:</label>
        <input
          id="newPassword"
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        {errors.newPassword && <div>{errors.newPassword}</div>}
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

export default EditProfile;
