import { useState } from "react";
import { LoadScript, Autocomplete } from "@react-google-maps/api";

const libraries = ["places"];
const apiKey = ""; // Replace with your actual API key

const LocationSelector = () => {
  const [selectedLocation, setSelectedLocation] = useState("Select Location");
  const [autocomplete, setAutocomplete] = useState(null);

  const onLoad = (autoC) => setAutocomplete(autoC);
  const onPlaceChanged = () => {
    if (autocomplete !== null) {
      const place = autocomplete.getPlace();
      setSelectedLocation(place.formatted_address || "Unknown Location");
    }
  };

  return (
    <LoadScript googleMapsApiKey={apiKey} libraries={libraries}>
      <div className="w-full flex flex-col items-center">
        <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
          <input
            type="text"
            placeholder="Search location..."
            className="input input-bordered w-full max-w-xs"
          />
        </Autocomplete>
        <p className="mt-2 text-lg font-semibold">{selectedLocation}</p>
      </div>
    </LoadScript>
  );
};

export default LocationSelector;
