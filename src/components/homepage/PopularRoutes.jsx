"use client";

import React from "react";
import { MapPin, ArrowRight, Compass } from "lucide-react";

const PopularRoutes = () => {
  const routes = [
    { from: "Dhaka", to: "Chittagong", count: "45+ Daily Buses" },
    { from: "Dhaka", to: "Sylhet", count: "28+ Daily Buses" },
    { from: "Dhaka", to: "Rajshahi", count: "20+ Daily Buses" },
    { from: "Dhaka", to: "Khulna", count: "18+ Daily Buses" },
    { from: "Chittagong", to: "Cox's Bazar", count: "35+ Daily Buses" },
    { from: "Sylhet", to: "Dhaka", count: "30+ Daily Buses" },
  ];

  return (
    // Ekhane bg-base-100 transaction effect shoho root div secure korbe
    <div className="w-full bg-base-100 transition-colors duration-200  border-b-6 border-base-300">
      <div className="max-w-7xl mx-auto px-4 py-16 md:py-20">
        {/* Centered Heading Layout - Pure Dynamic Text Enabled */}
        <div className="text-center max-w-xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 bg-secondary/10 text-secondary text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full mb-3">
            <Compass className="w-3.5 h-3.5" /> Network
          </div>

          {/* FIX: text-secondary bad diye text-base-content use kora holo jate text noshto na hoy */}
          <h2 className="text-3xl md:text-4xl font-black tracking-tight text-base-content flex items-center justify-center gap-2">
            <span className="inline-block">🛣️</span> Popular Routes
          </h2>

          {/* FIX: text-base-content/70 color contrast perfect maintain korbe high text read level-e */}
          <p className="text-base-content/70 text-sm md:text-base font-medium mt-3">
            Explore our most frequently traveled destinations and book your
            preferred seats instantly.
          </p>
        </div>

        {/* Grid Configuration */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {routes.map((route, idx) => (
            <div
              key={idx}
              className="card bg-base-100 border border-base-200 shadow-sm hover:shadow-md hover:border-secondary/30 hover:scale-[1.01] active:scale-[0.99] transition-all duration-200 cursor-pointer p-5 group"
            >
              <div className="flex items-center justify-between w-full">
                {/* Route Path Indicator */}
                <div className="flex items-center gap-3 min-w-0">
                  <div className="p-2.5 bg-secondary/10 text-secondary rounded-xl group-hover:bg-secondary group-hover:text-secondary-content transition-colors duration-200">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <div className="flex items-center gap-2 text-base font-bold text-base-content tracking-tight">
                      <span className="truncate">{route.from}</span>
                      <ArrowRight className="w-4 h-4 text-secondary flex-shrink-0 group-hover:translate-x-0.5 transition-transform" />
                      <span className="truncate">{route.to}</span>
                    </div>
                    {/* Subtle Subtext */}
                    <span className="text-xs font-semibold text-base-content/50 mt-0.5">
                      {route.count}
                    </span>
                  </div>
                </div>

                {/* Action Circle */}
                <div className="w-7 h-7 rounded-full bg-base-200 group-hover:bg-secondary text-base-content/40 group-hover:text-secondary-content flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 shadow-inner">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PopularRoutes;
