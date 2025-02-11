import Navbar from "./components/Navbar";
import { CreateEvent } from "./pages/CreateEvent";
import { Routes, Route } from "react-router-dom";
import EventsPage from "./pages/EventsPage";
import LoginPage from "./pages/LoginPage";
import Register from "./pages/Register";
import { AuthProvider } from "./auth/AuthCheck";
import EventDesc from "./components/EventDesc";
import AttendEvents from "./pages/AttendEvents";
import ManageEvents from "./pages/ManageEvents";

function App() {
  const userId = localStorage.getItem("userId");
  return (
    <AuthProvider>
      <Navbar />
      <Routes>
        <Route path="/" element={<EventsPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/create" element={<CreateEvent />} />
        <Route path="/events/:eventId" element={<EventDesc />} />
        <Route
          path="/event-register/myreg-events/:userId"
          element={<AttendEvents userId={userId} />}
        />
        <Route
          path="/event-register/my-events/:userId"
          element={<ManageEvents />}
        />
      </Routes>
    </AuthProvider>
  );
}

export default App;
