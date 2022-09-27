const EventTitle = ({ event }) => {
  return (
    <div>
      <div>{/* <img src={group.previewImage} alt={group.name} /> */}</div>
      <div>
        <h1>{event.name}</h1>
        <p>
          {event.city}, {event.state}
        </p>
        <p>
          {event.numOfMembers} members . {event.private ? "Private" : "Public"}
        </p>
        <p>{event.organizerId}</p>
      </div>
    </div>
  );
};

export default EventTitle;
