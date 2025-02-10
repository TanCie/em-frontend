import { useState } from "react";
import SearchAndFilter from "../components/Search";
import EventCard from "../components/Event";

const eventsData = [
  {
    id: 1,
    title: "AI Conference",
    category: "Technology",
    location: "Mumbai",
    image: "https://res.cloudinary.com/demo/image/upload/sample.jpg",
  },
  {
    id: 2,
    title: "Music Festival",
    category: "Music",
    location: "Delhi",
    image: "https://res.cloudinary.com/demo/image/upload/sample.jpg",
  },
  {
    id: 3,
    title: "Food Expo",
    category: "Food",
    location: "Bangalore",
    image: "https://res.cloudinary.com/demo/image/upload/sample.jpg",
  },
];

const categories = ["Technology", "Music", "Food"];

const EventsPage = () => {
  const [filteredEvents, setFilteredEvents] = useState(eventsData);

  const handleSearch = (searchTerm) => {
    setFilteredEvents(
      eventsData.filter((event) =>
        event.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  };

  const handleFilter = (category) => {
    if (category === "") {
      setFilteredEvents(eventsData);
    } else {
      setFilteredEvents(
        eventsData.filter((event) => event.category === category)
      );
    }
  };

  return (
    <div className="p-6">
      <SearchAndFilter
        categories={categories}
        onSearch={handleSearch}
        onFilter={handleFilter}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
        {filteredEvents.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
};

export default EventsPage;
