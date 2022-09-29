import { useState } from "react";

const HomepageSideNav = () => {
  const today = new Date().toISOString().split("T")[0];
  const [date, setDate] = useState(today);

  console.log("date ", date);

  return (
    <div>
      <label htmlFor="date">Pick a Date:</label>
      <input
        type="date"
        id="date"
        name="event-date"
        value={date}
        min={today}
        onChange={(e) => setDate(e.target.value)}
      />
    </div>
  );
};

export default HomepageSideNav;
