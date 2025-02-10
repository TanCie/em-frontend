import { useState } from "react";

const CategoryDropdown = ({ selectedCategory, setSelectedCategory }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const categories = ["Technology", "Music", "Psychology", "Food"];

  return (
    <div className="relative w-full">
      <button
        type="button"
        className="btn w-full"
        onClick={() => setDropdownOpen(!dropdownOpen)}
      >
        {selectedCategory}
      </button>

      {dropdownOpen && (
        <ul className="absolute w-full bg-base-100 rounded-box shadow p-2 z-10">
          {categories.map((category) => (
            <li key={category}>
              <a
                className="block px-4 py-2 hover:bg-gray-600 cursor-pointer"
                onClick={() => {
                  setSelectedCategory(category);
                  setDropdownOpen(false);
                }}
              >
                {category}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CategoryDropdown;
