"use client";

import React from "react";
import { Bus } from "lucide-react";

export default function Loading() {
  return (
    // Full Viewport alignment container - Automatically checks dark/light base theme context
    <div className="w-full h-[80vh] flex flex-col justify-center items-center bg-base-100 transition-colors duration-200">
      <div className="flex flex-col items-center gap-4 text-center">
        {/* Core Animated Indicator Loader Grid Matrix */}
        <div className="relative flex items-center justify-center">
          {/* Outer Ring Circle Spinner Layout */}
          <span className="loading loading-spinner loading-lg text-primary scale-110"></span>

          {/* Center Floating Core Transport Logo - App theme specific flair */}
          <div className="absolute animate-pulse text-primary/80">
            <Bus className="w-5 h-5" />
          </div>
        </div>

        {/* Dynamic Context Typography Loading Captions */}
        <div className="space-y-1">
          <p className="text-base font-black tracking-tight text-base-content/90">
            Finding Best Routes...
          </p>
          <p className="text-xs font-semibold text-base-content/40 tracking-wider uppercase max-w-[180px] mx-auto">
            Please wait a moment
          </p>
        </div>
      </div>
    </div>
  );
}
