import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../store/session";

const ProfileButton = ({ user }) => {
  const [showMenu, setShowMenu] = useState(false);

  const dispatch = useDispatch();

  const handleOpenMenu = () => setShowMenu(true);
  const handleCloseMenu = () => setShowMenu(false);
  const handleLogout = () => dispatch(logout());

  useEffect(() => {
    if (showMenu) document.addEventListener("click", handleCloseMenu);
    else return;

    return () => document.removeEventListener("click", handleCloseMenu);
  }, [showMenu]);

  return (
    <>
      <button onClick={handleOpenMenu}>
        <i className="fa-solid fa-user"></i>
      </button>
      {showMenu && (
        <div className="dropdown">
          <ul>
            <li>User Email: {user.email}</li>
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
