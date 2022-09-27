import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addGroup } from "../../store/groups";
import { useHistory } from "react-router-dom";
import STATES from "../../assets/states.json";
import styles from "./GroupForm.module.css";

const GroupForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const sessionUser = useSelector((state) => state.session.user);
  const [name, setName] = useState("");
  const [about, setAbout] = useState("");
  const [type, setType] = useState("In person");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [isPrivate, setIsPrivate] = useState(false);

  // Still need validations
  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = { name, about, type, city, state, private: isPrivate };
    const result = await dispatch(addGroup(form));

    console.log("result", result);
    return history.push("/profile/groups");
  };

  // for state selection
  const handleMouseDown = (e) => {
    const select = document.querySelector("#state");
    if (e.target.length > 8) select.size = 8;
  };

  // on click - set state and reset size to 0
  const handleStateChange = (e) => {
    const select = document.querySelector("#state");
    setState(e.target.value);
    select.size = 0;
  };

  return sessionUser ? (
    <div className={styles.groupFormContainer}>
      <form onSubmit={handleSubmit} className={styles.groupForm}>
        <div className={styles.formName}>
          <h1>Create Group</h1>
          <p>Fill out the form to create a group</p>
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
        <button>Create Group</button>
      </form>
    </div>
  ) : (
    "FORBIDDEN"
  );
};

export default GroupForm;
