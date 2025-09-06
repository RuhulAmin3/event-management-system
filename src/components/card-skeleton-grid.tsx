const CardSkeletonGrid = () => {
  return (
    <div className="container mx-auto px-4">
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {Array.from({ length: 6 }).map((_, index) => (
        <div
          key={index}
          className="border rounded-lg p-4 shadow-sm bg-white animate-pulse flex flex-col"
        >
          {/* Image placeholder */}
          <div className="w-full h-40 bg-gray-200 rounded-md mb-4" />

          {/* Title placeholder */}
          <div className="h-5 bg-gray-200 rounded w-3/4 mb-2" />

          {/* Subtitle placeholder */}
          <div className="h-4 bg-gray-200 rounded w-1/2" />

          {/* Button placeholder */}
          <div className="mt-auto h-8 bg-gray-200 rounded w-1/3" />
        </div>
      ))}
    </div>
    </div>
  );
};

export default CardSkeletonGrid;