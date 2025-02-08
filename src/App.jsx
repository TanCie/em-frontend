import EventList from "./components/EventList";
import Navbar from "./components/Navbar";
import { CreateEvent } from "./pages/CreateEvent";

function App() {
  return (
    <>
      <Navbar />
      <div className="text-red-200">Helllo</div>
      <div className="container mx-auto p-4">
        <EventList />
      </div>
      <p id="cally1"></p>
      <CreateEvent />
    </>
  );
}

export default App;
