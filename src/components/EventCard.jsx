import moment from "moment";
import { CiCalendar } from "react-icons/ci";
import { FaLocationDot } from "react-icons/fa6";
import { IoPeopleSharp } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";

const EventCard = ({ event }) => {
  const navigate = useNavigate();

  const handleAttend = async (eventId) => {
    const token = localStorage.getItem("token"); // Check if user is logged in

    if (!token) {
      alert("You need to log in first!");
      navigate("/login");
      return;
    }

    const confirmJoin = window.confirm(
      "Are you sure you want to join this event?"
    );
    if (!confirmJoin) return;

    try {
      const res = await fetch(
        `http://localhost:5000/api/event-register/${eventId}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`, // Send token for authentication
          },
        }
      );

      const data = await res.json();
      alert(data.message);
      navigate(`/events/${eventId}`); // Redirect to description page
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to register for event");
    }
  };

  return (
    <div className="w-full max-w-sm rounded-lg shadow-md bg-gray-900 overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-lg">
      {/* Event Image */}
      <div className="w-full h-48 relative">
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-full object-cover opacity-90 hover:opacity-100 transition-opacity duration-300"
        />
      </div>

      {/* Event Details */}
      <div className="p-4">
        {/* Title & Category */}
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold text-gray-100">
            {event.title.split(" ").slice(0, 4).join(" ")}
            {event.title.split(" ").length > 4 && ".."}
          </h3>
          <span className="px-4 py-1 border border-green-600 text-green-500 text-xs font-medium ml-1.5 rounded-full">
            {event.category}
          </span>
        </div>

        {/* DO THIS LINK FIXXXX */}
        <Link to={"/events"} className="text-sm text-gray-300 hover:underline">
          Click here to know more...
        </Link>

        <div className="flex items-center text-sm text-gray-400 mt-3">
          <CiCalendar className="text-xl text-blue-400" />
          <span className="ml-2">
            {moment(event.date).format("dddd, h:mm A")} -{" "}
            {moment(event.date).format("MMMM DD, YYYY")}
          </span>
        </div>
        <div className="flex items-center text-sm font-medium mt-2 text-gray-300">
          <FaLocationDot className="text-red-400" />
          <span className="ml-2">{event.location}</span>
        </div>

        {/* Attendees & Price */}
        <div className="flex justify-between items-center mt-1">
          <div className="flex items-center text-gray-400 text-sm">
            <IoPeopleSharp className="text-lg text-green-400" />
            <span className="ml-2">{event.attendees} going</span>
          </div>
          <div className="flex items-center font-medium text-gray-200">
            <button
              onClick={() => handleAttend(event._id)}
              disabled={new Date(event.date) < new Date()} // Disable if event date is in the past
              className={`px-4 py-2 font-semibold rounded-lg transition duration-300 ${
                new Date(event.date) < new Date()
                  ? "btn btn-sm btn-ghost cursor-not-allowed"
                  : "btn btn-sm btn-accent btn-outline rounded-lg"
              }`}
            >
              {new Date(event.date) < new Date() ? "Event ended" : "Join Event"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
