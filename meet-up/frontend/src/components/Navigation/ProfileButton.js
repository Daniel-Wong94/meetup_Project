import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../store/session";
import { useHistory, Link } from "react-router-dom";
import ProfilePicture from "../../elements/ProfilePicture";
import styles from "./ProfileButton.module.css";

const ProfileButton = ({ user }) => {
  const [showMenu, setShowMenu] = useState(false);

  const dispatch = useDispatch();
  const history = useHistory();

  const handleOpenMenu = () => setShowMenu(true);
  const handleCloseMenu = () => setShowMenu(false);
  const handleLogout = () => {
    dispatch(logout());
    return history.push("/");
  };

  useEffect(() => {
    if (showMenu) document.addEventListener("click", handleCloseMenu);
    else return;

    return () => document.removeEventListener("click", handleCloseMenu);
  }, [showMenu]);

  return (
    <div className={styles.dropDownContainer}>
      <div className={styles.dropDownButton}>
        <ProfilePicture
          handleOpenMenu={handleOpenMenu}
          initials={user.firstName[0] + user.lastName[0]}
        />
        <i
          className={`fa-solid fa-caret-down fa-2xl ${
            showMenu ? styles.dropUpArrow : styles.dropDownArrow
          }`}
          onClick={handleOpenMenu}
        ></i>
      </div>
      {showMenu && (
        <div className={styles.dropdownContent}>
          {/* <Link to="/profile/events">Your Events</Link> */}
          <Link to="/homepage/groups">Your Groups</Link>
          <Link to="/profile/settings/edit-profile">Settings</Link>
          <button className={styles.logoutButton} onClick={handleLogout}>
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileButton;
