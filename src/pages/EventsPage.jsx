import { useState, useEffect } from "react";
import moment from "moment";
import utils from "../lib/utils";
import EventCard from "../components/EventCard";
import { FaSearch } from "react-icons/fa";
import { MdArrowDropDown } from "react-icons/md";
import socket from "../lib/socket";
import LoadingSkeleton from "../components/LoadingSkeleton";

const EventList = () => {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [loading, setLoading] = useState(true);

  const categories = [
    "Select a Category",
    "All",
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
    const fetchEvents = async () => {
      try {
        const data = await utils.getAllEvents();
        setEvents(data);
        setFilteredEvents(data);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };
    fetchEvents().finally(() => setLoading(false));

    socket.on("eventUpdated", (updatedEvent) => {
      setEvents((prevEvents) =>
        prevEvents.map((event) =>
          event._id === updatedEvent._id ? updatedEvent : event
        )
      );
    });

    return () => {
      socket.off("eventUpdated");
    };
  }, []);

  useEffect(() => {
    let filtered = events;
    if (searchQuery) {
      filtered = filtered.filter((event) =>
        event.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    if (category !== "All") {
      filtered = filtered.filter(
        (event) => event.category.toLowerCase() === category.toLowerCase()
      );
    }
    setFilteredEvents(filtered);
  }, [searchQuery, category, events]);

  const upcomingEvents = filteredEvents
    .filter((event) => moment(event.date).isAfter(moment()))
    .sort((a, b) => moment(a.date).diff(moment(b.date)));

  const pastEvents = filteredEvents
    .filter((event) => moment(event.date).isBefore(moment()))
    .sort((a, b) => moment(b.date).diff(moment(a.date)));

  return (
    <div className="container page-font opacity-90 mx-auto px-8 md:px-10 pb-20 pt-16">
      {/* Search & Category Filter */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
        {/* Search Bar */}
        <div className="relative flex-1">
          <FaSearch className="absolute left-4 top-4 text-gray-300" />
          <input
            type="text"
            placeholder="Search events..."
            className="input w-full rounded-full pl-10 pr-4 h-12"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        {/* Category Dropdown */}

        <div className="relative w-1/3">
          <select
            className="block cursor-pointer w-full px-4 py-3 text-white bg-gray-800 border border-gray-600 rounded-lg shadow-md appearance-none"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {categories.map((cat) => (
              <option value={cat} key={cat} className="text-gray-200 text-sm">
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none">
            <MdArrowDropDown className="text-2xl" />
          </div>
        </div>
      </div>

      {/* Upcoming Events */}

      <div className="flex flex-col items-center justify-center">
        <h2 className="relative text-2xl md:text-5xl font-semibold my-10 text-white px-6">
          <span className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-10 md:h-16 bg-black opacity-70 rounded-full blur-md"></span>
          <span className="relative">Upcoming Events</span>
        </h2>

        {loading ? (
          <LoadingSkeleton />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 px-2 md:px-10">
            {upcomingEvents.length > 0 ? (
              upcomingEvents.map((event) => (
                <EventCard key={event._id} event={event} />
              ))
            ) : (
              <p className="text-center">No upcoming events found.</p>
            )}
          </div>
        )}
      </div>
      {/* Past Events */}
      <div className="flex flex-col items-center justify-center">
        <h2 className="relative text-2xl md:text-5xl font-semibold my-10 text-white px-6">
          <span className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-10 md:h-16 bg-black opacity-70 rounded-full blur-md"></span>
          <span className="relative">Past Events</span>
        </h2>
        {loading ? (
          <LoadingSkeleton />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {pastEvents.length > 0 ? (
              pastEvents.map((event) => (
                <EventCard key={event._id} event={event} />
              ))
            ) : (
              <p>No past events found.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default EventList;
