import { useState, useEffect } from "react";
import moment from "moment";
import utils from "../lib/utils";
import EventCard from "../components/EventCard";
import { FaSearch } from "react-icons/fa";
import { MdArrowDropDown } from "react-icons/md";

const EventList = () => {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState("All");

  const categories = [
    "Select a Category",
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
  }, []);

  useEffect(() => {
    let filtered = events;
    if (searchQuery) {
      filtered = filtered.filter((event) =>
        event.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    if (category !== "All") {
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
    <div className="container mx-auto px-2 py-6 my-10">
      {/* Search & Category Filter */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
        {/* Search Bar */}
        <div className="relative flex-1">
          <FaSearch className="absolute left-4 top-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search events..."
            className="input input-bordered w-full pl-10 pr-4 h-12"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        {/* Category Dropdown */}

        <div className="relative sm:w-1/3 w-1/2">
          <select
            className="block cursor-pointer w-full px-4 py-3 text-white bg-gray-700 border border-gray-600 rounded-lg shadow-md appearance-none"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {categories.map((cat) => (
              <option value={cat} key={cat} className="text-gray-200">
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
        <h2 className="text-2xl md:text-4xl font-semibold mt-8 mb-6">
          Upcoming Events
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
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
        <h2 className="text-2xl md:text-4xl font-semibold mt-16 mb-6">
          Past Events
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
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
