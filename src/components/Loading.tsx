import React from "react";
import { searchRoute } from "../routes/search";

/**
 * Senior Developer Component: Loading (Skeleton Loaders)
 * Dynamically intercepts the active route's search tab parameter and renders 
 * pixel-perfect pulsing theme-aware skeleton placeholders.
 */
const Loading: React.FC = () => {
  const { type } = searchRoute.useSearch();

  // Unified outer container matching the results max-width limits
  return (
    <div className="w-full animate-pulse select-none pointer-events-none">
      {renderSkeletons(type || "search")}
    </div>
  );
};

/**
 * Renders dedicated pulsing skeleton blocks based on active search type
 */
function renderSkeletons(type: string) {
  switch (type) {
    case "images":
      return (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="border border-theme-border/30 rounded-2xl overflow-hidden bg-theme-card/30 p-1">
              <div className="aspect-video w-full bg-theme-accent/10 rounded-xl" />
              <div className="p-3">
                <div className="h-2 w-1/3 bg-theme-accent/25 rounded-full mb-2" />
                <div className="h-3 w-5/6 bg-theme-text/10 rounded-full" />
              </div>
            </div>
          ))}
        </div>
      );

    case "videos":
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="border border-theme-border/30 rounded-2xl p-4 bg-theme-card/30 flex flex-col justify-between">
              <div>
                <div className="aspect-video w-full bg-theme-accent/10 rounded-xl mb-4" />
                <div className="h-4 w-4/5 bg-theme-accent/20 rounded-full mb-3" />
                <div className="h-3.5 w-full bg-theme-text/10 rounded-full mb-2" />
                <div className="h-3.5 w-5/6 bg-theme-text/10 rounded-full" />
              </div>
              <div className="flex justify-between items-center border-t border-theme-border/20 pt-3 mt-4">
                <div className="h-2 w-1/4 bg-theme-accent/20 rounded-full" />
                <div className="h-2 w-1/6 bg-theme-text/10 rounded-full" />
              </div>
            </div>
          ))}
        </div>
      );

    case "news":
      return (
        <div className="space-y-5">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="border border-theme-border/20 p-5 rounded-2xl bg-theme-card/30 flex justify-between items-start gap-5">
              <div className="flex-grow">
                <div className="flex items-center gap-3 mb-3">
                  <div className="h-2.5 w-20 bg-theme-accent/25 rounded-full" />
                  <div className="h-2.5 w-12 bg-theme-text/10 rounded-full" />
                </div>
                <div className="h-4 w-3/4 bg-theme-text/15 rounded-full mb-3.5" />
                <div className="h-3.5 w-full bg-theme-text/10 rounded-full mb-2" />
                <div className="h-3.5 w-5/6 bg-theme-text/10 rounded-full" />
              </div>
              <div className="w-24 h-24 bg-theme-accent/10 rounded-2xl shrink-0" />
            </div>
          ))}
        </div>
      );

    case "search":
    default:
      return (
        <div className="space-y-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="border border-theme-border/20 p-5 rounded-2xl bg-theme-card/30">
              <div className="h-2.5 w-40 bg-emerald-500/15 dark:bg-emerald-400/10 rounded-full mb-2.5" />
              <div className="h-5 w-3/5 bg-theme-accent/20 rounded-full mb-3" />
              <div className="h-3.5 w-full bg-theme-text/10 rounded-full mb-2" />
              <div className="h-3.5 w-5/6 bg-theme-text/10 rounded-full" />
            </div>
          ))}
        </div>
      );
  }
}

export default Loading;
