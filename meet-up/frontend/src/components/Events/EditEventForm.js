import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router";
import { fetchEventById, updateEventById } from "../../store/events";
import styles from "./EventForm.module.css";
import { fetchGroupDetail } from "../../store/groups";
import SubmitButton from "../../elements/SubmitButton";

const EditEventForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { eventId } = useParams();

  const sessionUser = useSelector((state) => state.session.user);
  const event = useSelector((state) => state.events[eventId]);
  const group = useSelector((state) => state.groups[event.Group.id]);

  const [name, setName] = useState(event.name);
  const [venueId, setVenueId] = useState(1);
  const [type, setType] = useState(event.type);
  const [capacity, setCapacity] = useState(event.capacity || 0);
  const [price, setPrice] = useState(event.price);
  const [description, setDescription] = useState(event.description);
  const [startDate, setStartDate] = useState(event.startDate.split(" ")[0]);
  const [startTime, setStartTime] = useState(event.startDate.split(" ")[1]);
  const [endDate, setEndDate] = useState(event.endDate.split(" ")[0]);
  const [endTime, setEndTime] = useState(event.endDate.split(" ")[1]);
  const today = new Date().toISOString().split("T")[0];

  useEffect(() => {
    (async () => {
      await dispatch(fetchGroupDetail(group.id));
    })();
  }, [dispatch]);

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

    await dispatch(updateEventById(event.id, form));

    return history.push(`/discover/events/${event.id}/about`);
  };

  return sessionUser ? (
    <div className={styles.eventFormContainer}>
      <form onSubmit={handleSubmit} className={styles.eventForm}>
        <div className={styles.formName}>
          <h1>Update Event</h1>
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
          <label htmlFor="description">description:</label>
          <textarea
            id="description"
            className={""}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          >
            Enter Description
          </textarea>
          <label htmlFor="venue">Venue:</label>
          <select
            id="venue"
            value={venueId}
            required
            onChange={(e) => setVenueId(e.target.value)}
          >
            <option value="" disabled>
              SELECT VENUE
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
          <label htmlFor="endDate">End Date:</label>
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
            min={startTime}
            onChange={(e) => setEndTime(e.target.value)}
          />
        </div>
        {/* <button>Update Event</button> */}
        <SubmitButton>Update Event</SubmitButton>
      </form>
    </div>
  ) : (
    "FORBIDDEN"
  );
};

export default EditEventForm;
