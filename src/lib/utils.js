import axios from 'axios';

const API_URL = 'http://localhost:5000/api/events';

const getAllEvents = async () => {
  try {
    const response = await axios.get(API_URL + '/');
    return response.data;
  } catch (error) {
    console.error("Error fetching events:", error);
    throw error;
  }
};

const getEventById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching event ${id}:`, error);
    throw error;
  }
};

const createEvent = async (eventData) => {
  try {
    const response = await axios.post(`${API_URL}/create`, eventData);
    return response.data;
  } catch (error) {
    console.error("Error creating event:", error);
    throw error;
  }
};

const updateEvent = async (id, userId, action) => {
  try {
    const response = await axios.patch(`${API_URL}/update/${id}`, { userId, action });
    return response.data;
  } catch (error) {
    console.error(`Error updating event ${id}:`, error);
    throw error;
  }
};

const deleteEvent = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/delete/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting event ${id}:`, error);
    throw error;
  }
};

const updateForm = async (eventId, updatedData) => {
  try {
    const response = await fetch(`http://localhost:5000/api/events/update-form/${eventId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    });

    if (!response.ok) {
      throw new Error("Failed to update event");
    }

    return await response.json();
  } catch (error) {
    console.error(`Error updating event ${eventId}:`, error);
    throw error;
  }
}

export default {
  getAllEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
  updateForm,
};