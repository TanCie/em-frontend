export const CreateEvent = () => {
  return (
    <div className="m-10">
      <div className="flex flex-col gap-10">
        <div className="text-3xl">Create a new Event</div>
        <div className="flex justify-between items-center">
          <input type="text" className="input" placeholder="Event Title" />
          <div>Category</div>
        </div>
        <div className="flex justify-between items-center">
          <input
            type="textarea"
            className="input h-24"
            placeholder="Event Description"
          />

          <input
            type="file"
            accept="image/*"
            className="file-input file-input-bordered w-full max-w-xs h-24"
          />
        </div>
        <div className="flex justify-between items-center">
          <input type="text" className="input" placeholder="Event Location" />
          <div>Date</div>
        </div>
        <button className="btn btn-block">block</button>
      </div>
    </div>
  );
};
