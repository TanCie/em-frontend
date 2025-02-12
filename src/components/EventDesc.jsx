import { useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import utils from "../lib/utils"; // Import API functions
import { AuthContext } from "../auth/AuthCheck";
import socket from "../lib/socket";

const EventDesc = () => {
  const { eventId } = useParams();
  const { isLoggedIn, userId } = useContext(AuthContext); // Get userId from AuthContext

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hasJoined, setHasJoined] = useState(false);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const data = await utils.getEventById(eventId);
        setEvent(data);

        // Check if user has already joined (by userId)
        if (data.joinedUsers?.includes(userId)) {
          setHasJoined(true);
        }
      } catch (err) {
        setError("Error fetching event details.");
        console.error("Error fetching event:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();

    socket.on(`eventUpdated`, (updatedEvent) => {
      setEvent(updatedEvent);
    });

    return () => {
      socket.off(`eventUpdated`);
    };
  }, [eventId, userId]);

  const handleJoinEvent = async () => {
    if (!event || hasJoined || !isLoggedIn) return;

    try {
      const updatedEvent = await utils.updateEvent(event._id, userId, "join");
      setHasJoined(true);
      console.log("Updated Event:", updatedEvent); // Verify in console
    } catch (err) {
      console.error("Error joining event:", err);
    }
  };

  const handleLeaveEvent = async () => {
    if (!event || !hasJoined || !isLoggedIn) return;

    try {
      const updatedEvent = await utils.updateEvent(event._id, userId, "leave"); // Send "leave"
      setHasJoined(false);
      console.log("Updated Event:", updatedEvent);
    } catch (err) {
      console.error("Error leaving event:", err);
    }
  };

  if (loading) return <div className="p-4 text-center">Loading...</div>;
  if (error) return <div className="p-4 text-center text-red-500">{error}</div>;
  if (!event) return <div className="p-4 text-center">Event not found</div>;

  return (
    <div className="mt-10 p-6 max-w-4xl mx-auto flex justify-center items-center flex-col md:flex-row gap-6">
      {/* Left Column: Image */}
      <div className="md:w-1/2">
        {event.image ? (
          <img
            src={event.image}
            alt={event.title}
            className="w-full h-80 rounded-lg shadow-lg"
          />
        ) : (
          <div className="w-full h-64 bg-gray-300 flex items-center justify-center rounded-lg">
            No Image
          </div>
        )}
      </div>

      {/* Right Column: Details */}
      <div className="md:w-1/2 flex flex-col gap-4">
        <div>
          <h1 className="text-3xl font-bold">{event.title}</h1>
          <p className="btn btn-sm btn-outline btn-accent rounded-full px-5 mt-2 cursor-text">
            {event.category}
          </p>
        </div>
        <p className="text-gray-400">📍 {event.location}</p>
        <p className="text-gray-400">
          📅
          {new Date(event.date).toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
        <p className="text-gray-200">{event.description}</p>
        <p className="text-gray-200">Attendees: {event.attendees}</p>

        {/* Join Event Button */}
        {isLoggedIn ? (
          <button
            onClick={handleJoinEvent}
            disabled={hasJoined}
            className={`mt-4 px-4 py-2 cursor-pointer text-white rounded-md ${
              hasJoined
                ? "bg-gray-400 cursor-text"
                : "bg-green-600 hover:bg-green-700"
            }`}
          >
            {hasJoined ? "Joined ✅" : "Join Event"}
          </button>
        ) : (
          <p className="text-red-500">Please log in to join this event.</p>
        )}
        {hasJoined && (
          <button onClick={handleLeaveEvent} className="btn bg-red-700">
            Leave Event
          </button>
        )}
      </div>
    </div>
  );
};

export default EventDesc;
