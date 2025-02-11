import { useState } from "react";

const CreateEventForm = ({ onSubmit }) => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "eventmpics");

    try {
      const response = await fetch(
        "https://api.cloudinary.com/v1_1/dohmbmmvr/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();
      setImageUrl(data.secure_url);
      console.log("Image uploaded:", data.secure_url);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !title ||
      !category ||
      !imageUrl ||
      !description ||
      !location ||
      !date
    ) {
      alert("Please fill in all fields!");
      return;
    }

    const eventData = {
      title,
      category,
      image: imageUrl,
      description,
      location,
      date,
    };

    try {
      await onSubmit(eventData);
    } catch (error) {
      console.error("Error submitting event:", error);
    }
  };

  return (
    <div className="container mx-auto bg-gray-800 p-8 shadow-lg rounded-lg mt-8">
      <h2 className="text-2xl font-semibold text-center text-gray-200 mb-6">
        Create New Event
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
            type="file"
            className="w-full p-2 border border-gray-400 rounded-lg"
            onChange={handleImageChange}
          />
          {imageUrl && (
            <img
              src={imageUrl}
              alt="Event"
              className="mt-4 w-full h-48 object-cover rounded-lg shadow-md"
            />
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full cursor-pointer bg-green-600 text-white py-3 rounded-lg font-semibold text-lg hover:bg-green-700 transition duration-300"
        >
          Create Event
        </button>
      </form>
    </div>
  );
};

export default CreateEventForm;
