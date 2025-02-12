import { useState } from "react";
import utils from "../lib/utils"; // Import API function

const UpdateForm = ({ event, closeForm }) => {
  const [title, setTitle] = useState(event.title);
  const [category, setCategory] = useState(event.category);
  const [location, setLocation] = useState(event.location);
  const [date, setDate] = useState(event.date.split("T")[0]); // Ensure correct date format
  const [description, setDescription] = useState(event.description);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const updatedData = { title, category, location, date, description };
      await utils.updateForm(event._id, updatedData);
      closeForm(); // Close form after update
    } catch (error) {
      console.error("Error updating event:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container w-1/2 mx-auto bg-gray-800 p-8 shadow-lg rounded-lg mt-8">
      <h2 className="text-2xl font-semibold text-center text-green-200 mb-6">
        Update Event
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Grid Wrapper */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Title */}
          <div>
            <label className="block text-gray-200 font-medium mb-2">
              Event Title
            </label>
            <input
              type="text"
              className="w-full p-3 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter event title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-gray-200 font-medium mb-2">
              Category
            </label>
            <input
              type="text"
              className="w-full p-3 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter event category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </div>

          {/* Location */}
          <div>
            <label className="block text-gray-200 font-medium mb-2">
              Location
            </label>
            <input
              type="text"
              className="w-full p-3 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter event location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>

          {/* Date */}
          <div>
            <label className="block text-gray-200 font-medium mb-2">
              Event Date
            </label>
            <input
              type="date"
              className="w-full p-3 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
        </div>

        {/* Description (Full Width) */}
        <div>
          <label className="block text-gray-200 font-medium mb-2">
            Event Description
          </label>
          <textarea
            className="w-full p-3 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter event description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows="4"
          />
        </div>

        {/* Image Upload */}
        <div>
          <label className="block text-gray-200 font-medium mb-2">
            Upload Image
          </label>
          <input
            placeholder="Image cannot be changed"
            disabled
            className="w-full p-2 border border-gray-400 rounded-lg"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className={`w-full cursor-pointer bg-green-600 text-white py-3 rounded-lg font-semibold text-lg transition duration-300 ${
            loading ? "opacity-50 cursor-not-allowed" : "hover:bg-green-700"
          }`}
          disabled={loading}
        >
          {loading ? "Updating..." : "Update Event"}
        </button>
      </form>

      {/* Cancel Button */}
      <button
        onClick={closeForm}
        className="w-full mt-4 cursor-pointer bg-red-600 text-white py-3 rounded-lg font-semibold text-lg hover:bg-red-700 transition duration-300"
      >
        Cancel
      </button>
    </div>
  );
};

export default UpdateForm;
