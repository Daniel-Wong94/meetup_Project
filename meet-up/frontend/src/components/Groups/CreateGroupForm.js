import { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addGroup, addImageToGroupById } from "../../store/groups";
import { useHistory } from "react-router-dom";
import STATES from "../../assets/states.json";
import styles from "./GroupForm.module.css";

const CreateGroupForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const selectElement = useRef(null);

  const sessionUser = useSelector((state) => state.session.user);

  const [name, setName] = useState("");
  const [about, setAbout] = useState("");
  const [type, setType] = useState("In person");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [isPrivate, setIsPrivate] = useState(false);
  const [previewImage, setPreviewImage] = useState("");

  // Still need validations
  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = { name, about, type, city, state, private: isPrivate };
    const group = await dispatch(addGroup(form));
    await dispatch(addImageToGroupById(group.id, previewImage));

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

  // BUG: /EDIT-GROUP/{DELETED GROUP} RENDERS CREATE GROUP FORM
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
          <label htmlFor="state">State (Required):</label>
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
          <label htmlFor="previewImage">Image URL (Optional):</label>
          <input
            id="previewImage"
            type="text"
            value={previewImage}
            onChange={(e) => setPreviewImage(e.target.value)}
          />
          {/* <label htmlFor="address">Address</label>
          <input
            id="address"
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          /> */}
        </div>
        <button>Create Group</button>
      </form>
    </div>
  ) : (
    "FORBIDDEN"
  );
};

export default CreateGroupForm;
