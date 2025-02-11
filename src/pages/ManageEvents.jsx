// MY CREATED EVENTS
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../auth/AuthCheck";

const MyCreatedEvents = () => {
  const { userId } = useContext(AuthContext);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    console.log("Fetching events for userId:", userId); // Debugging

    if (!userId) {
      console.warn("User ID is missing. Skipping API call.");
      return;
    }

    fetch(`http://localhost:5000/api/event-register/my-events/${userId}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("API Response:", data); // Debugging

        if (data.events) {
          setEvents(data.events);
        } else {
          console.error("Failed to fetch events", data);
        }
      })
      .catch((error) => console.error("Error fetching events:", error));
  }, [userId]);

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl md:text-3xl font-bold my-6">My Created Events</h2>
      <div className="flex gap-6">
        {events.length === 0 ? (
          <p className="text-center">
            No events found. Create one by clicking on the button above.
          </p>
        ) : (
          events.map((event) => (
            <div
              key={event._id}
              className="w-full rounded-xl bg-gray-800 p-2 pb-4 md:w-1/2 lg:w-1/3 xl:w-1/4"
            >
              <img src={event.image} alt="" />
              <h2 className="text-xl mt-2">{event.title}</h2>
              <p>{event.description}</p>
              <div className="flex mt-4 gap-4">
                <button className="btn btn-sm btn-outline text-green-300 hover:text-green-500">
                  Edit
                </button>
                <button className="btn btn-sm btn-outline text-red-300 hover:text-red-500">
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MyCreatedEvents;
