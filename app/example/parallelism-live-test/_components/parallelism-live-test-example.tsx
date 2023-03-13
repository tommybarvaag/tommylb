import { Suspense } from "react";
import { ParallelismLiveTestAllSettled } from "./parallelism-live-test-all-settled";
import { ParallelismLiveTestAsyncAwait } from "./parallelism-live-test-async-await";

const Skeleton = () => {
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
};

async function ParallelismLiveTestExample() {
  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
      <Suspense fallback={<Skeleton />}>
        {/* @ts-expect-error Async Server Component */}
        <ParallelismLiveTestAllSettled />
      </Suspense>
      <Suspense fallback={<Skeleton />}>
        {/* @ts-expect-error Async Server Component */}
        <ParallelismLiveTestAsyncAwait />
      </Suspense>
    </div>
  );
}

export { ParallelismLiveTestExample };
