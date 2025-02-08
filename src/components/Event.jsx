import moment from "moment";

const Event = ({ event }) => {
  return (
    <div className="mx-auto mb-5 card bg-base-100 w-2/3 sm:w-10/12 shadow-md transition duration-300 hover:scale-105">
      <figure className="relative">
        <img
          src="https://images.unsplash.com/photo-1477346611705-65d1883cee1e?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt={event.title}
          className="object-cover h-64 w-full rounded-t-lg"
        />
      </figure>
      <div className="card-body p-4">
        <h2 className="card-title text-xl font-semibold mb-2 line-clamp-2">
          {event.title || "Untitled Event"}
        </h2>
        <div className="card-actions justify-end mt-2">
          <div className="badge badge-outline text-sm">
            {moment(event.date).format("MMMM DD, YYYY")}
          </div>
          <div className="badge badge-outline text-sm">
            {event.category || "what"}
          </div>
          <div className="badge badge-outline text-sm">
            Attendees: {event.attendees}
          </div>
          <div className="badge badge-outline text-sm">
            {event.location || "Online"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Event;
