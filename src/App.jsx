import EventList from "./components/EventList";
import Navbar from "./components/Navbar";
import { CreateEvent } from "./pages/CreateEvent";
import { Routes, Route } from "react-router-dom";
import EventsPage from "./pages/EventsPage";

function App() {
  return (
    <div>
      <Navbar />
      <EventsPage />
      <Routes>
        <Route path="/" element={<EventList />} />
        <Route path="/create" element={<CreateEvent />} />
      </Routes>
    </div>
  );
}

export default App;
