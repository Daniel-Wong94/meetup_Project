import { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addGroup, addImageToGroupById } from "../../store/groups";
import { useHistory } from "react-router-dom";
import STATES from "../../assets/states.json";
import styles from "./GroupForm.module.css";
import SubmitButton from "../../elements/SubmitButton";

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
  const [errors, setErrors] = useState({});

  const [charCount, setCharCount] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = { name, about, type, city, state, private: isPrivate };

    try {
      if (previewImage) await verifyUrl(previewImage);
      const group = await dispatch(addGroup(form));
      await dispatch(addImageToGroupById(group.id, previewImage));

      return history.push("/homepage/groups");
    } catch (err) {
      if (err?.errors) {
        setErrors(err.errors);
      } else {
        const errors = await err?.json();
        setErrors(errors.errors);
      }
    }
  };

  const verifyUrl = async (url) => {
    const response = await fetch(url);

    if (!response.ok) {
      const err = {};
      err.errors = { imageUrl: "Image not found" };
      throw err;
    }

    return response;
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

  const handleAboutChange = (e) => {
    setAbout(e.target.value);
    setCharCount(e.target.value.length);
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
          {errors.name && (
            <div className={styles.validationError}>{errors.name}</div>
          )}
          <label htmlFor="type" className={styles.typeContainer}>
            Type:
            <div>
              <input
                checked={type === "In person"}
                id="type"
                type="radio"
                value="In person"
                onChange={(e) => setType(e.target.value)}
              />
              In Person
            </div>
            <div>
              <input
                checked={type === "Online"}
                id="type"
                type="radio"
                value="Online"
                onChange={(e) => setType(e.target.value)}
              />
              Online
            </div>
          </label>
          <label htmlFor="about">
            {/* About: (enter at least 50 characters) {charCount} characters */}
            About: ({charCount} characters)
          </label>
          <textarea
            id="about"
            placeholder="(enter at least 50 characters)"
            className={styles.about}
            value={about}
            onChange={handleAboutChange}
          />
          {errors.about && (
            <div className={styles.validationError}>{errors.about}</div>
          )}
          <label htmlFor="city">City (required):</label>
          <input
            id="city"
            type="text"
            value={city}
            required
            onChange={(e) => setCity(e.target.value)}
          />
          {errors.city && (
            <div className={styles.validationError}>{errors.city}</div>
          )}
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
          {errors.imageUrl && (
            <div className={styles.validationError}>{errors.imageUrl}</div>
          )}
        </div>
        <SubmitButton>Create Group</SubmitButton>
      </form>
    </div>
  ) : (
    "FORBIDDEN"
  );
};

export default CreateGroupForm;

{
  /* <label for="avatar">Choose a profile picture:</label>

<input type="file"
       id="avatar" name="avatar"
       accept="image/png, image/jpeg"></input> */
}
