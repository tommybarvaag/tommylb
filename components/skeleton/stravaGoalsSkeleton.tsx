export default function StravaGoalsSkeleton({ ...other }) {
  return (
    <div className="mb-12 w-full" {...other}>
      <div className="w-full">
        <div className="h-full overflow-hidden">
          <div className="pt-2">
            <h2 className="mb-3 h-8 w-2/3 animate-pulse bg-gray-400"></h2>
            <p className="mb-3 h-3 w-2/3 animate-pulse bg-transparent leading-relaxed"></p>
            <p className="mb-6 h-3 w-full animate-pulse bg-gray-400 leading-relaxed"></p>
            <p className="mb-6 h-3 w-full animate-pulse bg-gray-400 leading-relaxed"></p>
            <p className="mb-6 h-3 w-full animate-pulse bg-gray-400 leading-relaxed"></p>
            <p className="mb-5 h-3 w-full animate-pulse bg-gray-400 leading-relaxed"></p>
          </div>
        </div>
      </div>
    </div>
  );
}
