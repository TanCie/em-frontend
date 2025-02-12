// MY REGISTERED EVENTS
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../auth/AuthCheck";

const MyRegisteredEvents = () => {
  const { userId } = useContext(AuthContext);

  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const res = await fetch(
        `${API_URL}/event-register/myreg-events/${userId}`
      );
      const data = await res.json();
      setEvents(data);
    };
    fetchEvents();
  }, [userId]);

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">My Registered Events</h2>
      {events.map((event) => (
        <div
          key={event._id}
          className="p-4 border rounded-lg shadow-md mb-4 bg-gray-100"
        >
          <h3 className="text-xl font-semibold">{event.title}</h3>
          <p>{event.date}</p>
          <p>{event.location}</p>
        </div>
      ))}
    </div>
  );
};

export default MyRegisteredEvents;
