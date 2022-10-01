// import { useState } from "react";

const HomepageSideNav = () => {
  // const today = new Date().toISOString().split("T")[0];
  // const [date, setDate] = useState(today);

  return (
    <div>
      {/* <label htmlFor="date">Pick a Date:</label>
      <input
        type="date"
        id="date"
        name="event-date"
        value={date}
        min={today}
        onChange={(e) => setDate(e.target.value)}
      /> */}
      Today's Date:
      <p>{new Date().toString().split("G")[0]}</p>
    </div>
  );
};

export default HomepageSideNav;
