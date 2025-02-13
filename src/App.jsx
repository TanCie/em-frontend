import Navbar from "./components/Navbar";
import { CreateEvent } from "./pages/CreateEvent";
import { Routes, Route } from "react-router-dom";
import EventsPage from "./pages/EventsPage";
import LoginPage from "./pages/LoginPage";
import Register from "./pages/Register";
import { AuthProvider } from "./auth/AuthCheck";
import EventDesc from "./components/EventDesc";
import ManageEvents from "./pages/ManageEvents";
import { Toaster } from "react-hot-toast";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen bgimg">
        <Navbar />
        <div className="page-font">
          <Routes>
            <Route path="/" element={<EventsPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<Register />} />
            <Route path="/create" element={<CreateEvent />} />
            <Route path="/events/:eventId" element={<EventDesc />} />
            <Route
              path="/event-register/my-events/:userId"
              element={<ManageEvents />}
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
        <Toaster />
      </div>
    </AuthProvider>
  );
}

export default App;
