import { useState } from "react";

const SearchAndFilter = ({ categories, onSearch, onFilter }) => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="flex flex-wrap items-center gap-4 p-4 shadow-md rounded-lg">
      {/* 🔍 Search Bar */}
      <input
        type="text"
        placeholder="Search events..."
        className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          onSearch(e.target.value);
        }}
      />

      {/* 📌 Categories List */}
      <div className="flex flex-wrap gap-2">
        <button
          className="px-4 py-2 bg-gray-600 rounded-lg hover:bg-gray-300"
          onClick={() => onFilter("")}
        >
          All
        </button>
        {categories.map((category) => (
          <button
            key={category}
            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-gray-600"
            onClick={() => onFilter(category)}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SearchAndFilter;
