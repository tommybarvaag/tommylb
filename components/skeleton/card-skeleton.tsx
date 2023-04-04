export default function CardSkeleton({ ...other }) {
  return (
    <div className="mx-auto mt-8 min-w-1/2" {...other}>
      <div className="min-w-1/2 p-4">
        <div className="h-full overflow-hidden rounded-lg border-2 border-gray-200">
          <div className="w-full bg-gray-400 object-cover object-center md:h-36 lg:h-48"></div>
          <div className="p-6">
            <h2 className="mb-2 h-4 w-1/4 animate-pulse bg-gray-400"></h2>
            <h1 className="mb-4 h-6 w-1/2 animate-pulse bg-gray-500"></h1>
            <p className="mb-3 h-3 w-full animate-pulse bg-gray-400 leading-relaxed"></p>
            <p className="mb-3 h-3 w-2/3 animate-pulse bg-gray-400 leading-relaxed"></p>
            <p className="mb-3 h-3 w-1/2 animate-pulse bg-gray-400 leading-relaxed"></p>
            <div className="flex flex-wrap items-center ">
              <a className="mt-2 inline-flex h-4 w-32 animate-pulse items-center bg-gray-400 md:mb-2 lg:mb-0"></a>
              <span className="ml-auto mr-3 mt-2 inline-flex h-4 w-16 animate-pulse items-center bg-gray-400 px-2 py-1 pr-5 text-sm leading-none"></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
