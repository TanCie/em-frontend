import { useContext, useState } from "react";
import { AuthContext } from "../auth/AuthCheck";

const CreateEventForm = ({ onSubmit }) => {
  const { userId } = useContext(AuthContext);

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [loading, setLoading] = useState(false);

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

    setLoading(true);

    const eventData = {
      title,
      category,
      image: imageUrl,
      description,
      location,
      date,
      createdBy: userId,
    };

    try {
      await onSubmit(eventData);
    } catch (error) {
      console.error("Error submitting event:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container w-7/8 lg:w-2/3 opacity-90 mx-auto bg-gray-800 p-8 shadow-lg rounded-lg my-8 md:my-6">
      <h2 className="text-3xl font-semibold text-center text-green-100 mb-10">
        Create New Event
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-200 font-medium mb-2">
              Event Title
            </label>
            <input
              type="text"
              className="w-full p-3 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
              placeholder="Enter event title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-gray-200 font-medium mb-2">
              Category
            </label>
            <input
              type="text"
              className="w-full p-3 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
              placeholder="Enter event category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-gray-200 font-medium mb-2">
              Location
            </label>
            <input
              type="text"
              className="w-full p-3 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
              placeholder="Enter event location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-gray-200 font-medium mb-2">
              Event Date
            </label>
            <input
              type="date"
              className="w-full p-3 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-200 font-medium mb-2">
              Event Description
            </label>
            <textarea
              className="w-full p-3 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 h-44"
              placeholder="Enter event description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-gray-200 font-medium mb-2">
              Upload Image
            </label>
            <div className="w-full h-44 border border-gray-400 rounded-lg flex flex-col items-center justify-center bg-gray-700 relative">
              <input
                type="file"
                className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
                onChange={handleImageChange}
              />
              {imageUrl ? (
                <img
                  src={imageUrl}
                  alt="Event Preview"
                  className="w-full h-full object-cover rounded-lg"
                />
              ) : (
                <p className="text-gray-300">Click to upload image</p>
              )}
            </div>
          </div>
        </div>

        <button
          type="submit"
          className={`w-full cursor-pointer py-3 rounded-lg font-semibold text-lg transition duration-300 ${
            loading
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-green-600 hover:bg-green-700 text-white"
          }`}
          disabled={loading}
        >
          {loading ? "Creating..." : "Create Event"}
        </button>
      </form>
    </div>
  );
};

export default CreateEventForm;
