import { useState, useEffect } from "react";
import moment from "moment";
import utils from "../lib/utils";
import Event from "./Event";

const EventList = () => {
  const [events, setEvents] = useState([]);
  const [pastEvents, setPastEvents] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await utils.getAllEvents();
        setEvents(data);
      } catch (error) {
        console.error("Error in component:", error);
      }
    };

    fetchEvents();
  }, []);

  useEffect(() => {
    // Filter events when 'events' state changes
    if (events.length > 0) {
      const today = moment().startOf("day"); // Today at 00:00:00

      const past = events.filter((event) => {
        const eventDate = moment(event.date);
        return eventDate.isBefore(today);
      });

      const upcoming = events.filter((event) => {
        const eventDate = moment(event.date);
        return eventDate.isSameOrAfter(today);
      });

      setPastEvents(past);
      setUpcomingEvents(upcoming);
    }
  }, [events]); // This effect depends on the 'events' state

  return (
    <div>
      {/* Upcoming Events */}
      <h2 className="text-2xl font-semibold mb-4">Upcoming Events</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {upcomingEvents.map((event) => (
          <Event key={event._id} event={event} />
        ))}
        {upcomingEvents.length === 0 && <p>No upcoming events.</p>}{" "}
        {/* Empty state */}
      </div>
      {/* Past Events */}
      <h2 className="text-2xl font-semibold mb-4 mt-8">Past Events</h2>{" "}
      {/* Add margin top */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {pastEvents.map((event) => (
          <Event key={event._id} event={event} />
        ))}
        {pastEvents.length === 0 && <p>No past events.</p>} {/* Empty state */}
      </div>
    </div>
  );
};

export default EventList;
