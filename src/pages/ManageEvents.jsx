import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../auth/AuthCheck";
import utils from "../lib/utils";
import { AiOutlineClose } from "react-icons/ai";
import toast from "react-hot-toast";
import LoadingSkeleton from "../components/LoadingSkeleton";

const MyCreatedEvents = () => {
  const navigate = useNavigate();
  const { userId } = useContext(AuthContext);
  const [events, setEvents] = useState([]);
  const [editEvent, setEditEvent] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    category: "",
  });

  const categories = [
    "Select a category",
    "general",
    "theater",
    "sports",
    "education",
    "relationships",
    "music",
    "social",
    "technology",
    "food",
    "psychology",
  ];

  useEffect(() => {
    if (!userId) return;

    fetch(`${utils.API_URL}/event-register/my-events/${userId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.events) {
          setEvents(data.events);
        } else {
          console.error("Failed to fetch events", data);
        }
      })
      .catch((error) => console.error("Error fetching events:", error))
      .finally(() => setFetching(false));
  }, [userId]);

  const handleEditClick = (event) => {
    setEditEvent(event._id);
    setFormData({
      title: event.title,
      description: event.description,
      location: event.location,
      category: event.category,
    });
  };

  const handleUpdate = async () => {
    setLoading(true);
    try {
      await utils.updateForm(editEvent, formData);
      setEvents((prevEvents) =>
        prevEvents.map((event) =>
          event._id === editEvent ? { ...event, ...formData } : event
        )
      );
      setEditEvent(null);
      toast.success("Event updated successfully");
    } catch (error) {
      console.error("Error updating event:", error);
      toast.error("Failed to update event.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      const confirmed = window.confirm("Are you sure you want to delete?");
      if (!confirmed) {
        toast.error("Deletion cancelled.");
        return;
      }

      await utils.deleteEvent(id);
      setEvents((prevEvents) => prevEvents.filter((event) => event.id !== id));

      toast.success("Event deleted successfully!");
      navigate("/");
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete event.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center bg-gray-900 opacity-75 mx-auto mt-0 rounded-lg p-6">
      <h2 className="text-2xl md:text-3xl font-bold mb-10 text-white">
        My Created Events
      </h2>
      {fetching ? (
        <LoadingSkeleton />
      ) : (
        <div className="flex flex-col flex-wrap  items-center min-w-xl max-w-2xl justify-center gap-6">
          {events.length === 0 ? (
            <p className="text-center text-gray-400">No events found.</p>
          ) : (
            events.map((event) => (
              <div
                key={event._id}
                className="min-w-1/3 max-w-2/3 rounded-xl bg-gray-800 p-1 pb-6 shadow-lg hover:shadow-xl transition-all"
              >
                <img
                  src={event.image}
                  alt=""
                  className="w-full h-60 object-cover rounded-t-xl"
                />
                <h2 className="text-xl px-2 mt-2 font-semibold text-white">
                  {event.title}
                </h2>

                <p className="text-gray-300 px-2 mt-2 italic">
                  {event.description}
                </p>

                <div className="flex mt-auto flex-col pt-3 w-1/2 mx-auto gap-4">
                  <button
                    onClick={() => handleEditClick(event)}
                    className="btn btn-sm rounded-lg bg-green-600 text-white hover:bg-green-700"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(event._id)}
                    className="btn btn-sm rounded-lg bg-red-600 text-white hover:bg-red-700"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Popup Modal for Editing */}
      {editEvent && (
        <div className="fixed page-font inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
          <div className="bg-gray-900 p-6 rounded-lg shadow-lg w-5/6 md:w-1/2 relative">
            {/* Close Button */}
            <button
              onClick={() => setEditEvent(null)}
              className="absolute top-3 right-3 cursor-pointer text-gray-400 hover:text-white"
            >
              <AiOutlineClose size={20} />
            </button>

            <h3 className="text-2xl md:text-3xl font-bold text-green-300 mb-4">
              Edit Event
            </h3>

            <label className="block text-gray-200 font-medium">Title</label>
            <input
              type="text"
              className="w-full p-2 my-2 border border-gray-600 rounded bg-gray-800 text-white"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              placeholder="Event Title"
            />
            <label className="block text-gray-200 font-medium">Location</label>
            <input
              type="text"
              className="w-full p-2 my-2 border border-gray-600 rounded bg-gray-800 text-white"
              value={formData.location}
              onChange={(e) =>
                setFormData({ ...formData, location: e.target.value })
              }
              placeholder="Event Location"
            />
            <label className="block text-gray-200 font-medium">
              Description
            </label>
            <textarea
              className="w-full h-28 p-2 my-2 border border-gray-600 rounded bg-gray-800 text-white"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              placeholder="Event Description"
            />

            <label className="block text-gray-200 font-medium">Category</label>
            <select
              className="block cursor-pointer w-full px-4 py-2 my-1.5 text-gray-200 border bg-gray-800 border-gray-400 rounded-lg shadow-md appearance-none"
              value={formData.category}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
            >
              {categories.map((cat) => (
                <option
                  value={cat}
                  key={cat}
                  className="text-gray-200 text-sm py-0.5"
                >
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </option>
              ))}
            </select>
            <span className="text-sm flex mt-5 justify-center italic text-green-200">
              {" "}
              (other fields cannot be updated)
            </span>

            {/* Buttons */}
            <div className="flex justify-end gap-3 mt-4">
              {loading ? (
                <div className="flex items-center">
                  <div className="w-5 h-5 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
                  <span className="ml-2 text-green-300">Updating...</span>
                </div>
              ) : (
                <>
                  <button
                    onClick={handleUpdate}
                    className="btn bg-green-600 hover:bg-green-700 text-white"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditEvent(null)}
                    className="btn bg-red-600 hover:bg-red-700 text-white"
                  >
                    Cancel
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyCreatedEvents;
