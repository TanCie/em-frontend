import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import CategoryDropdown from "../components/Dropdown";

export const CreateEvent = () => {
  const [eventTitle, setEventTitle] = useState("");
  const [category, setCategory] = useState("Select Category");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [eventDate, setEventDate] = useState(new Date());
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [uploading, setUploading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !eventTitle ||
      category === "Select Category" ||
      !description ||
      !location ||
      !imageUrl
    ) {
      alert("Please fill in all fields!");
      return;
    }

    const eventData = {
      eventTitle,
      category,
      description,
      location,
      eventDate,
      image: imageUrl, // Cloudinary image URL
    };

    try {
      const response = await fetch("/api/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(eventData),
      });

      if (response.ok) {
        alert("Event Created Successfully!");
      } else {
        alert("Failed to create event.");
      }
    } catch (error) {
      console.error("Error creating event:", error);
    }
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "YOUR_UPLOAD_PRESET"); // Replace with your Cloudinary upload preset

    try {
      const response = await fetch(
        "https://api.cloudinary.com/v1_1/YOUR_CLOUD_NAME/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();
      setImageUrl(data.secure_url);
      setSelectedImage(URL.createObjectURL(file));
    } catch (error) {
      console.error("Error uploading image:", error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="w-2/3 mx-auto container">
      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-10">
        <h2 className="text-3xl text-center mb-4 font-bold col-span-2">
          Create a New Event
        </h2>

        {/* Event Title & Category */}
        <input
          type="text"
          className="input input-bordered w-full"
          placeholder="Event Title"
          value={eventTitle}
          onChange={(e) => setEventTitle(e.target.value)}
        />
        <div>
          <CategoryDropdown
            selectedCategory={category}
            setSelectedCategory={setCategory}
          />
        </div>

        {/* Event Description & Image Upload */}
        <textarea
          className="textarea textarea-bordered h-32 w-full"
          placeholder="Event Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <div className="flex flex-col items-center gap-2">
          <input
            type="file"
            accept="image/*"
            className="file-input file-input-bordered w-full max-w-xs"
            onChange={handleImageChange}
          />
          {uploading && <p className="text-sm text-gray-500">Uploading...</p>}
          {selectedImage && (
            <img
              src={selectedImage}
              alt="Preview"
              className="w-20 h-20 rounded-lg"
            />
          )}
        </div>

        {/* Event Date & Location */}
        <div>
          <label className="font-semibold">Event Date: </label>
          <DatePicker
            selected={eventDate}
            onChange={(date) => setEventDate(date)}
            className="input input-bordered w-full"
            dateFormat="MMMM d, yyyy"
          />
        </div>

        <input
          type="text"
          className="input input-bordered w-full"
          placeholder="Event Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />

        {/* Submit Button (Full Width) */}
        <button type="submit" className="btn btn-primary btn-block col-span-2">
          Create Event
        </button>
      </form>
    </div>
  );
};
