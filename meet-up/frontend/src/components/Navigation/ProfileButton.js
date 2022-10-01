import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../store/session";
import { useHistory, Link } from "react-router-dom";
import ProfilePicture from "../../elements/ProfilePicture";

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
    <>
      <ProfilePicture
        handleOpenMenu={handleOpenMenu}
        initials={user.firstName[0] + user.lastName[0]}
      />
      {showMenu && (
        <div className="dropdown">
          <ul>
            {/* <li>
              <Link to="/profile/events">Your Events</Link>
            </li>
            <li>
              <Link to="/profile/groups">Your Groups</Link>
            </li> */}
            {/* <li>
              <Link to="/profile/settings">Settings</Link>
            </li> */}
            <li>
              <button onClick={handleLogout}>Logout</button>
            </li>
          </ul>
        </div>
      )}
    </>
  );
};

export default ProfileButton;
