import { useState, useEffect } from "react";
import moment from "moment";
import utils from "../lib/utils";
import EventCard from "../components/EventCard";
import { FaSearch } from "react-icons/fa";
import { MdArrowDropDown } from "react-icons/md";
import socket from "../lib/socket";

const EventList = () => {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState("All");

  const categories = [
    "All Categories",
    "technology",
    "music",
    "psychology",
    "food",
    "sports",
    "TV",
    "social",
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
    fetchEvents();

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
    if (category !== "All Categories") {
      filtered = filtered.filter((event) => event.category === category);
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
          <FaSearch className="absolute left-5 top-5 text-gray-300" />
          <input
            type="text"
            placeholder="Search events..."
            className="input w-full rounded-full pl-12 pr-4 h-14"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        {/* Category Dropdown */}

        <div className="relative w-2/3 sm:w-1/3">
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
        <h2 className="text-2xl md:text-5xl font-semibold my-10">
          Upcoming Events
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {upcomingEvents.length > 0 ? (
            upcomingEvents.map((event) => (
              <EventCard key={event._id} event={event} />
            ))
          ) : (
            <p>No upcoming events found.</p>
          )}
        </div>
      </div>
      {/* Past Events */}
      <div className="flex flex-col items-center justify-center">
        <h2 className="text-2xl md:text-5xl font-semibold mt-16 mb-6">
          Past Events
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {pastEvents.length > 0 ? (
            pastEvents.map((event) => (
              <EventCard key={event._id} event={event} />
            ))
          ) : (
            <p>No past events found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventList;
