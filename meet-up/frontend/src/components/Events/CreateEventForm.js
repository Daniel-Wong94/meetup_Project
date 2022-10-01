import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { createEvent } from "../../store/events";
import { addEventToGroup } from "../../store/groups";
import styles from "./EventForm.module.css";

const CreateEventForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { groupId } = useParams();

  const sessionUser = useSelector((state) => state.session.user);

  // const today = new Date();
  // const tomorrow = today.setDate(today.getDate() + 1);

  // console.log("date", tomorrow);

  const [name, setName] = useState("");
  const [venueId, setVenueId] = useState(1);
  const [type, setType] = useState("In person");
  const [capacity, setCapacity] = useState(1);
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [startTime, setStartTime] = useState("12:00");
  const [endDate, setEndDate] = useState("");
  const [endTime, setEndTime] = useState("13:00");

  // Still need validations
  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = {
      name,
      venueId: 2,
      type,
      capacity: Number(capacity),
      price,
      description,
      startDate: startDate + " " + startTime + ":00",
      endDate: endDate + " " + endTime + ":00",
    };

    const event = await dispatch(createEvent(groupId, form));
    await dispatch(addEventToGroup(groupId, event));

    return history.push(`/discover/groups/${groupId}/events`);
  };

  return sessionUser ? (
    <div className={styles.eventFormContainer}>
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
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            className={""}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          >
            Enter Description
          </textarea>
          <label htmlFor="city">Capacity:</label>
          <input
            id="city"
            type="number"
            min="1"
            value={capacity}
            onChange={(e) => setCapacity(e.target.value)}
          />
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
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
          <input
            id="startTime"
            type="time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
          />
          <label htmlFor="endDate">End Date:</label>
          <input
            id="endDate"
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
          <input
            id="endTime"
            type="time"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
          />
        </div>
        <button>Create Event</button>
      </form>
    </div>
  ) : (
    "FORBIDDEN"
  );
};

export default CreateEventForm;
