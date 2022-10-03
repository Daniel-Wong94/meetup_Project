// import { NavLink, useHistory } from "react-router-dom";
// import { useSelector, useDispatch } from "react-redux";
// import { deleteGroup, getGroups } from "../../store/groups";
// import styles from "./GroupNav.module.css";
// import { useEffect } from "react";

// const GroupNav = ({ group }) => {
//   const dispatch = useDispatch();
//   const history = useHistory();
//   const sessionUser = useSelector((state) => state.session.user);
//   const isOrganizer = group.organizerId === sessionUser.id;

//   useEffect(() => {
//     async () => await dispatch(getGroups());
//   }, []);

//   const handleDeleteGroup = async (e) => {
//     e.preventDefault();

//     await dispatch(deleteGroup(group.id));

//     return history.push(`/discover/groups/${group.id}`);
//   };

//   return (
//     <div className={styles.navContainer}>
//       <ul className={styles.navLinks}>
//         <NavLink to={`/discover/groups/${group.id}`}>About</NavLink>
//         <NavLink to="/discover/groups">Events</NavLink>
//         {/* <NavLink to="/discover/groups">Members</NavLink> */}
//         {/* <NavLink to="/discover/groups">Photos</NavLink> */}
//         {/* <NavLink to="/discover/groups">Discussions</NavLink> */}
//         {/* <NavLink to="/discover/groups">More</NavLink> */}
//       </ul>
//       {isOrganizer ? (
//         <div className={styles.buttonContainer}>
//           <button onClick={handleDeleteGroup}>Delete Group</button>
//           <NavLink to={`/edit-group/${group.id}`}>Edit Group</NavLink>
//         </div>
//       ) : (
//         <div className={styles.buttonContainer}>
//           <button>Join this group</button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default GroupNav;
