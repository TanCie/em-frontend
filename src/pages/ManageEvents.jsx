// import { useContext, useEffect, useState } from "react";
// import { AuthContext } from "../auth/AuthCheck";
// import utils from "../lib/utils";

// const MyCreatedEvents = () => {
//   const { userId } = useContext(AuthContext);
//   const [events, setEvents] = useState([]);
//   const [editEvent, setEditEvent] = useState(null);
//   const [formData, setFormData] = useState({
//     title: "",
//     description: "",
//     location: "",
//     category: "",
//   });

//   useEffect(() => {
//     if (!userId) return;

//     fetch(`http://localhost:5000/api/event-register/my-events/${userId}`)
//       .then((res) => res.json())
//       .then((data) => {
//         if (data.events) {
//           setEvents(data.events);
//         } else {
//           console.error("Failed to fetch events", data);
//         }
//       })
//       .catch((error) => console.error("Error fetching events:", error));
//   }, [userId]);

//   const handleEditClick = (event) => {
//     setEditEvent(event._id);
//     setFormData({ title: event.title, description: event.description });
//   };

//   const handleUpdate = async () => {
//     try {
//       await utils.updateForm(editEvent, formData);
//       setEvents((prevEvents) =>
//         prevEvents.map((event) =>
//           event._id === editEvent ? { ...event, ...formData } : event
//         )
//       );
//       setEditEvent(null);
//     } catch (error) {
//       console.error("Error updating event:", error);
//     }
//   };

//   return (
//     <div className="container mx-auto p-6">
//       <h2 className="text-2xl md:text-3xl font-bold my-6">My Created Events</h2>
//       <div className="flex gap-6 flex-wrap">
//         {events.length === 0 ? (
//           <p className="text-center">No events found.</p>
//         ) : (
//           events.map((event) => (
//             <div
//               key={event._id}
//               className="w-full rounded-xl bg-gray-800 p-2 pb-4 md:w-1/2 lg:w-1/3 xl:w-1/4"
//             >
//               <img
//                 src={event.image}
//                 alt=""
//                 className="w-full h-40 object-cover rounded-t-xl"
//               />
//               <h2 className="text-xl mt-2 text-white">{event.title}</h2>
//               <p className="text-gray-400">{event.description}</p>

//               <div className="flex mt-4 gap-4">
//                 <button
//                   onClick={() => handleEditClick(event)}
//                   className="btn btn-sm btn-outline text-green-300 hover:text-green-500"
//                 >
//                   Edit
//                 </button>
//                 <button className="btn btn-sm btn-outline text-red-300 hover:text-red-500">
//                   Delete
//                 </button>
//               </div>
//             </div>
//           ))
//         )}
//       </div>

//       {/* Popup Modal for Editing */}
//       {editEvent && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
//           <div className="bg-gray-900 p-6 rounded-lg shadow-lg w-1/3">
//             <h3 className="text-lg font-semibold text-green-300">Edit Event</h3>

//             <input
//               type="text"
//               className="w-full p-2 my-2 border border-gray-600 rounded"
//               value={formData.title}
//               onChange={(e) =>
//                 setFormData({ ...formData, title: e.target.value })
//               }
//               placeholder="Event Title"
//             />
//             <input
//               type="text"
//               className="w-full p-2 my-2 border border-gray-600 rounded"
//               value={formData.location}
//               onChange={(e) =>
//                 setFormData({ ...formData, title: e.target.value })
//               }
//               placeholder="Event Location"
//             />
//             <textarea
//               className="w-full p-2 my-2 border border-gray-600 rounded"
//               value={formData.description}
//               onChange={(e) =>
//                 setFormData({ ...formData, description: e.target.value })
//               }
//               placeholder="Event Description"
//             />
//             <div className="flex justify-end gap-3">
//               <button onClick={handleUpdate} className="btn btn-success">
//                 Save
//               </button>
//               <button
//                 onClick={() => setEditEvent(null)}
//                 className="btn btn-error"
//               >
//                 Cancel
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default MyCreatedEvents;

import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../auth/AuthCheck";
import utils from "../lib/utils";
import { AiOutlineClose } from "react-icons/ai";

const MyCreatedEvents = () => {
  const { userId } = useContext(AuthContext);
  const [events, setEvents] = useState([]);
  const [editEvent, setEditEvent] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    category: "",
  });

  useEffect(() => {
    if (!userId) return;

    fetch(`http://localhost:5000/api/event-register/my-events/${userId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.events) {
          setEvents(data.events);
        } else {
          console.error("Failed to fetch events", data);
        }
      })
      .catch((error) => console.error("Error fetching events:", error));
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
    } catch (error) {
      console.error("Error updating event:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      alert("Are you sure you want to delete?");
      await utils.deleteEvent(id);
      setEvents(events.filter((event) => event.id === id));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container bg-gray-900 opacity-95 mx-auto m-4 rounded-lg p-6">
      <h2 className="text-2xl md:text-3xl font-bold my-6 text-white">
        My Created Events
      </h2>
      <div className="flex gap-6 flex-wrap">
        {events.length === 0 ? (
          <p className="text-center text-gray-400">No events found.</p>
        ) : (
          events.map((event) => (
            <div
              key={event._id}
              className="w-full rounded-xl bg-gray-800 p-1 pb-6 md:w-1/2 lg:w-1/3 xl:w-1/4 shadow-lg hover:shadow-xl transition-all"
            >
              <img
                src={event.image}
                alt=""
                className="w-full h-40 object-cover rounded-t-xl"
              />
              <h2 className="text-xl px-2 mt-2 text-white">{event.title}</h2>
              <p className="text-gray-400 px-2">{event.description}</p>

              <div className="flex pt-3 w-1/3 mx-auto gap-4">
                <button
                  onClick={() => handleEditClick(event)}
                  className="btn btn-sm bg-green-600 text-white hover:bg-green-700"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(event._id)}
                  className="btn btn-sm bg-red-600 text-white hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Popup Modal for Editing */}
      {editEvent && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
          <div className="bg-gray-900 p-6 rounded-lg shadow-lg w-1/3 relative">
            {/* Close Button */}
            <button
              onClick={() => setEditEvent(null)}
              className="absolute top-3 right-3 text-gray-400 hover:text-white"
            >
              <AiOutlineClose size={20} />
            </button>

            <h3 className="text-lg font-semibold text-green-300 mb-4">
              Edit Event
            </h3>

            <input
              type="text"
              className="w-full p-2 my-2 border border-gray-600 rounded bg-gray-800 text-white"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              placeholder="Event Title"
            />
            <input
              type="text"
              className="w-full p-2 my-2 border border-gray-600 rounded bg-gray-800 text-white"
              value={formData.location}
              onChange={(e) =>
                setFormData({ ...formData, location: e.target.value })
              }
              placeholder="Event Location"
            />
            <textarea
              className="w-full p-2 my-2 border border-gray-600 rounded bg-gray-800 text-white"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              placeholder="Event Description"
            />
            <input
              type="text"
              className="w-full p-2 my-2 border border-gray-600 rounded bg-gray-800 text-white"
              value={formData.category}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
              placeholder="Event Category"
            />

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
