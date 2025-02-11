import { useParams } from "react-router-dom";

const EventDesc = () => {
  const { eventId } = useParams();
  return (
    <div className="p-4 text-center text-lg">Event Details for {eventId}</div>
  );
};

export default EventDesc;
