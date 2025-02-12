import CreateEventForm from "./CreateEventForm";
import toast from "react-hot-toast";

export const CreateEvent = () => {
  const handleCreateEvent = async (eventData) => {
    try {
      const response = await fetch("http://localhost:5000/api/events/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(eventData),
      });

      const data = await response.json();
      console.log("Event created successfully:", data);
      toast.success("Event created successfully!");
      // redirect to the event page
      window.location.href = `/`;
    } catch (error) {
      toast.error("Error creating event. Please try again.");
      console.error("Error creating event:", error);
    }
  };

  return <CreateEventForm onSubmit={handleCreateEvent} />;
};
