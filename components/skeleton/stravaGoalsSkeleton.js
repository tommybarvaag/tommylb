import * as React from "react";

export default function StravaGoalsSkeleton({ ...other }) {
  return (
    <div className="w-full mb-12" {...other}>
      <div class="w-full">
        <div class="h-full overflow-hidden">
          <div class="pt-2">
            <h2 class="bg-gray-400 animate-pulse h-8 w-2/3 mb-3"></h2>
            <p class="leading-relaxed mb-3 w-2/3 h-3 animate-pulse bg-transparent"></p>
            <p class="leading-relaxed mb-6 w-full h-3 animate-pulse bg-gray-400"></p>
            <p class="leading-relaxed mb-6 w-full h-3 animate-pulse bg-gray-400"></p>
            <p class="leading-relaxed mb-6 w-full h-3 animate-pulse bg-gray-400"></p>
            <p class="leading-relaxed mb-5 w-full h-3 animate-pulse bg-gray-400"></p>
          </div>
        </div>
      </div>
    </div>
  );
}
