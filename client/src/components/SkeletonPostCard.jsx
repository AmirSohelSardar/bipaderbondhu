export default function SkeletonPostCard() {
  return (
    <div className="animate-pulse w-full border border-gray-300 h-[400px] overflow-hidden rounded-lg sm:w-[430px] mx-auto">
      <div className="h-[260px] bg-gray-300"></div>

      <div className="p-3 flex flex-col gap-3">
        <div className="h-5 bg-gray-300 rounded w-3/4"></div>
        <div className="h-4 bg-gray-300 rounded w-1/2"></div>
        <div className="h-10 bg-gray-300 rounded mt-auto"></div>
      </div>
    </div>
  );
}
