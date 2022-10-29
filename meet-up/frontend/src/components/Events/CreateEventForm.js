import { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { createEvent } from "../../store/events";
import { addEventToGroup } from "../../store/groups";
import styles from "./EventForm.module.css";
import SubmitButton from "../../elements/SubmitButton";

const CreateEventForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const textareaElement = useRef(null);
  const { groupId } = useParams();

  const sessionUser = useSelector((state) => state.session.user);
  const group = useSelector((state) => state.groups[groupId]);

  const today = new Date().toISOString().split("T")[0];

  const [name, setName] = useState("");
  const [venueId, setVenueId] = useState("");
  const [type, setType] = useState("In person");
  const [capacity, setCapacity] = useState(1);
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState(today);
  const [startTime, setStartTime] = useState("12:00");
  const [endDate, setEndDate] = useState(today);
  const [endTime, setEndTime] = useState("13:00");
  const [charCount, setCharCount] = useState(0);

  const [errors, setErrors] = useState({});

  // Still need validations
  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = {
      name,
      venueId: venueId || null,
      type,
      capacity: Number(capacity),
      price,
      description,
      startDate: startDate + " " + startTime + ":00",
      endDate: endDate + " " + endTime + ":00",
    };

    try {
      const event = await dispatch(createEvent(groupId, form));
      await dispatch(addEventToGroup(groupId, event));

      return history.push(`/discover/groups/${groupId}/events`);
    } catch (err) {
      const errors = await err.json();
      setErrors(errors.errors);
    }
  };

  const handleDescriptionChange = (e) => {
    e.preventDefault();

    setDescription(e.target.value);
    setCharCount(e.target.value.length);
  };

  return sessionUser ? (
    // < className={styles.eventFormContainer}>
    <form onSubmit={handleSubmit} className={styles.eventForm}>
      <div className={styles.formName}>
        <h1>Create Event</h1>
        <p>Fill out the form to create an Event</p>
      </div>
      <div className={styles.eventFormField}>
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
        <label htmlFor="description">
          Description: ({charCount} characters)
        </label>
        <textarea
          id="description"
          className={styles.description}
          ref={textareaElement}
          placeholder="(enter at least 50 characters)"
          value={description}
          onChange={handleDescriptionChange}
        />
        {errors.description && (
          <div className={styles.validationError}>{errors.description}</div>
        )}
        <label htmlFor="venue">Venue (optional):</label>
        <select
          id="venue"
          value={venueId}
          // required
          onChange={(e) => setVenueId(e.target.value)}
        >
          <option value={""} disabled>
            NO VENUE
          </option>
          {group?.Venues?.map((venue) => (
            <option value={venue.id} key={venue.id}>
              {venue.address}
            </option>
          ))}
        </select>
        <label htmlFor="city">Capacity:</label>
        <input
          id="city"
          type="number"
          min="1"
          value={capacity}
          onChange={(e) => setCapacity(e.target.value)}
        />
        {errors.capacity && (
          <div className={styles.validationError}>{errors.capacity}</div>
        )}
        <label htmlFor="price">Price:</label>
        <input
          id="price"
          type="number"
          min="0"
          step="any"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <label htmlFor="startDate">Start Date and Time:</label>
        <input
          id="startDate"
          type="date"
          min={today}
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <input
          id="startTime"
          type="time"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
        />
        {errors.startDate && (
          <div className={styles.validationError}>{errors.startDate}</div>
        )}
        <label htmlFor="endDate">End Date and Time:</label>
        <input
          id="endDate"
          type="date"
          min={startDate}
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
        <input
          id="endTime"
          type="time"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
        />
        {errors.endDate && (
          <div className={styles.validationError}>{errors.endDate}</div>
        )}
      </div>
      <SubmitButton>Create Event</SubmitButton>
    </form>
  ) : (
    "FORBIDDEN"
  );
};

export default CreateEventForm;
