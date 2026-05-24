import React from "react";
import { searchRoute } from "../routes/search";

/**
 * Loading — type-aware skeleton loaders that mirror the real result layouts.
 * Each skeleton matches the exact structure of its result component.
 */
const Loading: React.FC = () => {
  const { type } = searchRoute.useSearch();
  return (
    <div className="w-full animate-pulse select-none pointer-events-none">
      {renderSkeletons(type || "search")}
    </div>
  );
};

// Shimmer base class reused across all skeletons
const shimmer = "bg-theme-text/8 rounded-full";
const shimmerAccent = "bg-theme-accent/15 rounded-full";

function renderSkeletons(type: string) {
  switch (type) {

    /* ── IMAGES ─────────────────────────────────────────── */
    case "images":
      return (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2.5">
          {Array.from({ length: 15 }).map((_, i) => (
            <div key={i} className="rounded-xl overflow-hidden border border-theme-border bg-theme-card/20">
              <div className="w-full bg-theme-accent/10" style={{ aspectRatio: "4/3" }} />
              <div className="px-2 py-1.5 space-y-1">
                <div className={`h-2 w-1/2 ${shimmer}`} />
                <div className={`h-2.5 w-5/6 ${shimmer}`} />
              </div>
            </div>
          ))}
        </div>
      );

    /* ── VIDEOS ─────────────────────────────────────────── */
    case "videos":
      return (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-3 md:gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="rounded-2xl overflow-hidden border border-theme-border bg-theme-card/20 flex flex-col">
              <div className="w-full bg-theme-accent/10" style={{ aspectRatio: "16/9" }} />
              <div className="p-3 space-y-2">
                <div className={`h-3 w-full ${shimmer}`} style={{ borderRadius: "4px" }} />
                <div className={`h-3 w-3/4 ${shimmer}`} style={{ borderRadius: "4px" }} />
                <div className={`h-2.5 w-1/2 ${shimmerAccent}`} />
              </div>
            </div>
          ))}
        </div>
      );

    /* ── NEWS ────────────────────────────────────────────── */
    case "news":
      return (
        <div className="space-y-0 divide-y divide-theme-border">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="flex gap-5 justify-between items-start py-5 first:pt-0">
              {/* Text block */}
              <div className="flex-grow space-y-3">
                {/* Source + date row */}
                <div className="flex items-center gap-3">
                  <div className={`h-2.5 w-20 ${shimmerAccent}`} />
                  <div className={`h-2.5 w-14 ${shimmer}`} />
                </div>
                {/* Headline */}
                <div className={`h-5 w-4/5 ${shimmer}`} style={{ borderRadius: "6px" }} />
                <div className={`h-5 w-3/5 ${shimmer}`} style={{ borderRadius: "6px" }} />
                {/* Snippet */}
                <div className="space-y-1.5 pt-1">
                  <div className={`h-3 w-full ${shimmer}`} />
                  <div className={`h-3 w-5/6 ${shimmer}`} />
                </div>
              </div>
              {/* Thumbnail placeholder */}
              <div className="w-24 h-24 rounded-2xl bg-theme-accent/8 shrink-0" />
            </div>
          ))}
        </div>
      );

    /* ── SHOPPING ───────────────────────────────────────── */
    case "shopping":
      return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="rounded-3xl overflow-hidden border border-theme-border bg-theme-card/20 flex flex-col justify-between">
              <div className="aspect-square bg-theme-accent/8 w-full" />
              <div className="p-5 space-y-4 flex-grow flex flex-col justify-between">
                <div className="space-y-2">
                  <div className={`h-2.5 w-16 ${shimmer}`} />
                  <div className={`h-4 w-5/6 ${shimmerAccent}`} style={{ borderRadius: "4px" }} />
                  <div className={`h-4 w-2/3 ${shimmerAccent}`} style={{ borderRadius: "4px" }} />
                </div>
                <div className="flex justify-between items-center border-t border-theme-border pt-3.5 mt-2">
                  <div className={`h-5 w-14 ${shimmer}`} />
                  <div className={`h-8 w-16 rounded-full ${shimmerAccent}`} />
                </div>
              </div>
            </div>
          ))}
        </div>
      );

    /* ── SCHOLAR ────────────────────────────────────────── */
    case "scholar":
      return (
        <div className="space-y-6 max-w-4xl">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="p-6 border border-theme-border bg-theme-card/20 rounded-3xl space-y-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-theme-text/8" />
                  <div className={`h-2.5 w-24 ${shimmer}`} />
                </div>
                <div className={`h-5 w-24 rounded-full ${shimmerAccent}`} />
              </div>
              <div className={`h-5 w-3/4 ${shimmerAccent}`} style={{ borderRadius: "4px" }} />
              <div className={`h-3 w-48 ${shimmer}`} />
              <div className="space-y-1.5">
                <div className={`h-3 w-full ${shimmer}`} />
                <div className={`h-3 w-5/6 ${shimmer}`} />
              </div>
              <div className={`h-8 w-28 rounded-full ${shimmer}`} />
            </div>
          ))}
        </div>
      );

    /* ── WEB / ALL ───────────────────────────────────────── */
    case "search":
    default:
      return (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left column */}
          <div className="lg:col-span-8 space-y-0">

            {/* Lumen Summary skeleton */}
            <div className="border border-theme-accent bg-theme-accent/4 p-6 rounded-3xl mb-5 space-y-3">
              <div className={`h-2 w-24 ${shimmerAccent}`} />
              <div className="space-y-2 pt-1">
                <div className={`h-4 w-full ${shimmer}`} style={{ borderRadius: "6px" }} />
                <div className={`h-4 w-5/6 ${shimmer}`} style={{ borderRadius: "6px" }} />
                <div className={`h-4 w-4/6 ${shimmer}`} style={{ borderRadius: "6px" }} />
              </div>
              <div className="flex gap-2 pt-2">
                <div className={`h-6 w-20 rounded-full ${shimmer}`} />
                <div className={`h-6 w-24 rounded-full ${shimmer}`} />
                <div className={`h-6 w-16 rounded-full ${shimmer}`} />
              </div>
            </div>

            {/* Result rows — no cards, just dividers */}
            <div className="divide-y divide-theme-border">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="py-5 first:pt-0 space-y-2">
                  {/* Breadcrumb row */}
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-theme-text/8" />
                    <div className={`h-2.5 w-36 ${shimmer}`} />
                  </div>
                  {/* Title */}
                  <div className={`h-6 w-3/4 ${shimmerAccent}`} style={{ borderRadius: "6px" }} />
                  {/* Snippet */}
                  <div className="space-y-1.5 pt-0.5">
                    <div className={`h-3 w-full ${shimmer}`} />
                    <div className={`h-3 w-5/6 ${shimmer}`} />
                    <div className={`h-3 w-2/3 ${shimmer}`} />
                  </div>
                  {/* Pills */}
                  <div className="flex gap-2 pt-1">
                    {i === 0 && <div className={`h-5 w-20 rounded-full ${shimmerAccent}`} />}
                    <div className={`h-5 w-28 rounded-full ${shimmer}`} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right column */}
          <div className="lg:col-span-4 space-y-6">
            {/* PAA skeleton */}
            <div className="space-y-2">
              <div className={`h-2 w-28 ${shimmer} mb-3`} />
              <div className="border border-theme-border rounded-3xl overflow-hidden divide-y divide-theme-border">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="px-4 py-4 flex items-center justify-between">
                    <div className={`h-3 w-4/5 ${shimmer}`} />
                    <div className="w-3 h-3 rounded-full bg-theme-text/8" />
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Facts skeleton */}
            <div className="space-y-2">
              <div className={`h-2 w-20 ${shimmer} mb-3`} />
              <div className="border border-theme-border rounded-3xl overflow-hidden">
                <div className="aspect-video w-full bg-theme-accent/12" />
                <div className="p-5 space-y-4">
                  <div className={`h-5 w-2/3 ${shimmerAccent}`} style={{ borderRadius: "6px" }} />
                  <div className="space-y-1.5">
                    <div className={`h-3 w-full ${shimmer}`} />
                    <div className={`h-3 w-4/5 ${shimmer}`} />
                  </div>
                  <div className="border-t border-theme-border pt-4 space-y-3">
                    {Array.from({ length: 4 }).map((_, i) => (
                      <div key={i} className="flex justify-between">
                        <div className={`h-3 w-1/3 ${shimmer}`} />
                        <div className={`h-3 w-1/4 ${shimmer}`} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
  }
}

export default Loading;
