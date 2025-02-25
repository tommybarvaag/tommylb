import { query } from "@/lib/query";
import { Suspense } from "react";

const mockFetch = (
  url: string,
  delay: number = 1000
): Promise<{
  json: () => { url: string; delay: number };
}> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (url.includes("error")) {
        reject(new Error("Error"));
      } else {
        resolve({
          json: () => {
            return {
              url,
              delay
            };
          }
        });
      }
    }, delay);
  });
};

async function ParallelismLiveTestAllSettled() {
  const start = new Date().getTime();

  const results = await query([
    mockFetch("https://jsonplaceholder.typicode.com/posts").then(x => x.json()),
    mockFetch("https://jsonplaceholder.typicode.com/comments").then(x => x.json()),
    mockFetch("https://jsonplaceholder.typicode.com/users").then(x => x.json())
  ]);

  const end = new Date().getTime();

  // Render each component based on its status and value
  return (
    <div>
      <h2 className="font-bold underline">Promise.allSettled</h2>
      <p>{`Total execution time: ${end - start} ms`}</p>
      <div>
        {results.map((result, index) => {
          if (result.success) {
            // Render component with resolved value
            switch (index) {
              case 0:
                return <p key={index}>Posts delay: {result.data.delay} ms</p>;
              case 1:
                return <p key={index}>Comments delay: {result.data.delay} ms</p>;
              case 2:
                return <p key={index}>Users delay: {result.data.delay} ms</p>;
            }
          } else {
            // Render error message with rejection reason
            return <p key={index}>Error: {result.error}</p>;
          }
        })}
      </div>
    </div>
  );
}

async function ParallelismLiveTestAsyncAwait() {
  const start = new Date().getTime();

  // Fetch data from three APIs using React Server Components
  const results = [
    await mockFetch("https://jsonplaceholder.typicode.com/posts").then(x => x.json()),
    await mockFetch("https://jsonplaceholder.typicode.com/comments").then(x => x.json()),
    await mockFetch("https://jsonplaceholder.typicode.com/users").then(x => x.json())
  ];

  const end = new Date().getTime();
  // Render each component based on its status and value
  return (
    <div>
      <h2 className="font-bold underline">Async await</h2>
      <p>{`Total execution time: ${end - start} ms`}</p>
      <div>
        {results.map((result, index) => {
          switch (index) {
            case 0:
              return <p key={index}>Posts delay: {result.delay} ms</p>;
            case 1:
              return <p key={index}>Comments delay: {result.delay} ms</p>;
            case 2:
              return <p key={index}>Users delay: {result.delay} ms</p>;
          }
        })}
      </div>
    </div>
  );
}

function Skeleton() {
  return (
    <div>
      <h2 className="mb-[2px] h-[22px] min-w-[137px] animate-pulse bg-zinc-700"></h2>
      <p className="mb-[2px] h-[22px] w-[225px] animate-pulse bg-zinc-700"></p>
      <div className="">
        <div className="mb-[2px] h-[22px] w-[175px] animate-pulse bg-zinc-700"></div>
        <div className="mb-[2px] h-[22px] w-[190px] animate-pulse bg-zinc-700"></div>
        <div className="mb-[2px] h-[22px] w-[180px] animate-pulse bg-zinc-700"></div>
      </div>
    </div>
  );
}

async function ParallelismWithPromisesExample() {
  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
      <Suspense fallback={<Skeleton />}>
        <ParallelismLiveTestAllSettled />
      </Suspense>
      <Suspense fallback={<Skeleton />}>
        <ParallelismLiveTestAsyncAwait />
      </Suspense>
    </div>
  );
}

export { ParallelismWithPromisesExample };
