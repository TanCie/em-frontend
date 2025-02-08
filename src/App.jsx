import EventList from "./components/EventList";
import Navbar from "./components/Navbar";

function App() {
  return (
    <>
      <Navbar />
      <div className="text-red-200">Helllo</div>
      <div className="container mx-auto p-4">
        <EventList />
      </div>
    </>
  );
}

export default App;
