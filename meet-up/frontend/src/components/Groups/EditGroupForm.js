import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateGroup } from "../../store/groups";
import { useHistory, useParams } from "react-router-dom";
import STATES from "../../assets/states.json";
import styles from "./GroupForm.module.css";

const EditGroupForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const selectElement = useRef(null);

  const { groupId } = useParams();
  const sessionUser = useSelector((state) => state.session.user);
  const group = useSelector((state) => state.groups[groupId]);

  const isOrganizer = group.organizerId === sessionUser.id;

  const [name, setName] = useState(group.name);
  const [about, setAbout] = useState(group.about);
  const [type, setType] = useState(group.type);
  const [city, setCity] = useState(group.city);
  const [state, setState] = useState(group.state);
  const [isPrivate, setIsPrivate] = useState(group.private);

  // Still need validations
  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = { name, about, type, city, state, private: isPrivate };

    await dispatch(updateGroup(form, groupId));

    return history.push("/homepage/groups");
  };

  // useRef for DOM selection - for state select tag
  const handleMouseDown = (e) => {
    if (selectElement.current.length > 8) selectElement.current.size = 8;
  };

  // on click - set state and reset size to 0
  const handleStateChange = (e) => {
    setState(e.target.value);
    selectElement.current.size = 0;
  };

  return sessionUser && isOrganizer ? (
    <div className={styles.groupFormContainer}>
      <form onSubmit={handleSubmit} className={styles.groupForm}>
        <div className={styles.formName}>
          <h1>Update Group</h1>
          <p>Fill out the form to update the group</p>
        </div>
        <div className={styles.groupFormField}>
          <label htmlFor="name">Name:</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <label htmlFor="type">
            Type:
            <input
              checked={type === "In person"}
              id="type"
              type="radio"
              value="In person"
              onChange={(e) => setType(e.target.value)}
            />
            In Person
            <input
              checked={type === "Online"}
              id="type"
              type="radio"
              value="Online"
              onChange={(e) => setType(e.target.value)}
            />
            Online
          </label>
          <label htmlFor="about">About:</label>
          <textarea
            id="about"
            className={styles.about}
            value={about}
            onChange={(e) => setAbout(e.target.value)}
          >
            Enter Description
          </textarea>
          <label htmlFor="city">City:</label>
          <input
            id="city"
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <label htmlFor="state">State:</label>
          <select
            id="state"
            value={state}
            required
            ref={selectElement}
            onMouseDown={handleMouseDown}
            onChange={handleStateChange}
          >
            <option value="" disabled>
              SELECT STATE
            </option>
            {STATES.map(({ abbreviation }) => (
              <option key={abbreviation} value={abbreviation}>
                {abbreviation}
              </option>
            ))}
          </select>
          <label htmlFor="isPrivate">
            <input
              id="isPrivate"
              type="checkbox"
              checked={isPrivate}
              onChange={(e) => setIsPrivate(!isPrivate)}
            />
            Private Group
          </label>
        </div>
        <button>Update Group</button>
      </form>
    </div>
  ) : (
    "FORBIDDEN"
  );
};

export default EditGroupForm;
