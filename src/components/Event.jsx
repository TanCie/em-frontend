import moment from "moment";
import { LuTicket } from "react-icons/lu";
import { IoPeopleSharp } from "react-icons/io5";
import { FaLocationDot } from "react-icons/fa6";
import { CiCalendar } from "react-icons/ci";

// const Event = ({ event }) => {
//   return (
//     <div className="mx-auto mb-5 card bg-base-100 w-2/3 sm:w-10/12 shadow-md transition duration-300 hover:scale-105">
//       <figure className="relative">
//         <img
//           src="https://images.unsplash.com/photo-1477346611705-65d1883cee1e?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
//           alt={event.title}
//           className="object-cover h-64 w-full rounded-t-lg"
//         />
//       </figure>
//       <div className="card-body p-4">
//         <h2 className="card-title text-xl font-semibold mb-2 line-clamp-2">
//           {event.title || "Untitled Event"}
//         </h2>
//         <div className="card-actions justify-end mt-2">
//           <div className="badge badge-outline text-sm">
//             {moment(event.date).format("MMMM DD, YYYY")}
//           </div>
//           <div className="badge badge-outline text-sm">
//             {event.category || "what"}
//           </div>
//           <div className="badge badge-outline text-sm">
//             Attendees: {event.attendees}
//           </div>
//           <div className="badge badge-outline text-sm">
//             {event.location || "Online"}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Event;

const EventCard = ({ event }) => {
  return (
    <div className="w-full max-w-sm rounded-lg shadow-md overflow-hidden">
      {/* Event Image */}
      <div className="w-full h-48 relative">
        <img src={event.image} alt={event.title} className="object-cover" />
      </div>

      {/* Event Details */}
      <div className="p-4 pt-0">
        <h3 className="text-lg font-semibold">{event.title}</h3>
        <a href="#" className="text-sm text-gray-500">
          Click here to know more...
        </a>

        {/* Date & Location */}
        <div className="flex text-sm justify-between items-center mt-3 text-gray-400">
          <span className="flex items-center gap-2">
            <CiCalendar className="text-2xl" />
            {moment(event.date).format("dddd, h:mm A")} -{" "}
            {moment(event.date).format("MMMM DD, YYYY")}
          </span>
        </div>
        <div className="text-sm font-medium mt-1.5">
          <span className="flex items-center gap-2">
            <FaLocationDot /> {event.location}
          </span>
        </div>

        {/* Attendees & Price */}
        <div className="flex justify-between items-center mt-2">
          <div className="text-sm text-gray-500">
            <span className="flex items-center gap-2">
              <IoPeopleSharp /> {event.attendees} going
            </span>
          </div>
          <div className="text-sm font-medium">
            <span className="flex items-center gap-2">
              <LuTicket /> Free
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
