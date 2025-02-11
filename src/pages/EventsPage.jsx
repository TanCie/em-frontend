import { useState, useEffect } from "react";
import moment from "moment";
import utils from "../lib/utils";
import EventCard from "../components/EventCard";
import { FaSearch } from "react-icons/fa";

const EventList = () => {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState("All");

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
          <FaSearch className="absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            placeholder="Search events..."
            className="input input-bordered w-full pl-10 pr-4 h-12"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        {/* Category Dropdown */}
        <select
          className="select select-bordered h-12 min-w-[160px]"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="All">All Categories</option>
          <option value="technology">Technology</option>
          <option value="music">Music</option>
          <option value="psychology">Psychology</option>
          <option value="food">Food</option>
        </select>
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
