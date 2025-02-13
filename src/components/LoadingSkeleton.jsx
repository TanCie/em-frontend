const LoadingSkeleton = () => {
  return (
    <div>
      <div className="flex flex-col md:flex-row gap-8 px-6 md:px-10">
        <div className="flex w-68 md:w-60 flex-col gap-4">
          <div className="skeleton  bg-gray-700 h-40 w-full"></div>
          <div className="skeleton  bg-gray-700 h-4 w-28"></div>
          <div className="skeleton  bg-gray-700 h-4 w-full"></div>
          <div className="skeleton  bg-gray-700 h-4 w-full"></div>
        </div>
        <div className="flex w-68 md:w-60 flex-col gap-4">
          <div className="skeleton  bg-gray-700 h-40 w-full"></div>
          <div className="skeleton  bg-gray-700 h-4 w-28"></div>
          <div className="skeleton  bg-gray-700 h-4 w-full"></div>
          <div className="skeleton  bg-gray-700 h-4 w-full"></div>
        </div>
        <div className="flex w-68 md:w-60 flex-col gap-4">
          <div className="skeleton  bg-gray-700 h-40 w-full"></div>
          <div className="skeleton  bg-gray-700 h-4 w-28"></div>
          <div className="skeleton  bg-gray-700 h-4 w-full"></div>
          <div className="skeleton  bg-gray-700 h-4 w-full"></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingSkeleton;
