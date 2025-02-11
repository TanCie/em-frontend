import CreateEventForm from "./CreateEventForm";
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
      alert("Event created successfully!");
      // redirect to the event page
      window.location.href = `/`;
    } catch (error) {
      console.error("Error creating event:", error);
    }
  };

  return <CreateEventForm onSubmit={handleCreateEvent} />;
};
