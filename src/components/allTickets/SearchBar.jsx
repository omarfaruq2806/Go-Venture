"use client";

import React from "react";
import { MapPin, Bus, ArrowUpDown, Search } from "lucide-react";

const SearchBar = ({
  searchFrom,
  setSearchFrom,
  searchTo,
  setSearchTo,
  transportType,
  setTransportType,
  sortBy,
  setSortBy,
}) => {
  return (
    <div className="w-full space-y-4">
      {/* 4 Column Layout: Mobile e full width structure column line thakbe, desktop mode e standard grid map hobe */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Input: From Destination */}
        <div className="relative flex items-center group">
          <MapPin className="absolute left-3.5 w-4 h-4 text-base-content/40 group-focus-within:text-primary transition-colors z-10" />
          <input
            type="text"
            placeholder="Where from? (e.g. Dhaka)"
            value={searchFrom}
            onChange={(e) => setSearchFrom(e.target.value)}
            className="input input-bordered w-full pl-10 bg-base-100 font-medium text-sm text-base-content focus:border-primary focus:outline-none transition-all rounded-xl shadow-inner border-base-300"
          />
        </div>

        {/* Input: To Destination */}
        <div className="relative flex items-center group">
          <MapPin className="absolute left-3.5 w-4 h-4 text-base-content/40 group-focus-within:text-primary transition-colors z-10" />
          <input
            type="text"
            placeholder="Where to? (e.g. Sylhet)"
            value={searchTo}
            onChange={(e) => setSearchTo(e.target.value)}
            className="input input-bordered w-full pl-10 bg-base-100 font-medium text-sm text-base-content focus:border-primary focus:outline-none transition-all rounded-xl shadow-inner border-base-300"
          />
        </div>

        {/* Select: Transport Type filter */}
        <div className="relative flex items-center group">
          <Bus className="absolute left-3.5 w-4 h-4 text-base-content/40 group-focus-within:text-primary transition-colors z-10" />
          <select
            value={transportType}
            onChange={(e) => setTransportType(e.target.value)}
            className="select select-bordered w-full pl-10 bg-base-100 font-medium text-sm text-base-content focus:border-primary focus:outline-none transition-all rounded-xl border-base-300"
          >
            <option value="">All Transports</option>
            <option value="bus">🚌 Bus</option>
            <option value="train">🚂 Train</option>
            <option value="flight">✈️ Flight</option>
          </select>
        </div>

        {/* Select: Sorting Pricing Engine */}
        <div className="relative flex items-center group">
          <ArrowUpDown className="absolute left-3.5 w-4 h-4 text-base-content/40 group-focus-within:text-primary transition-colors z-10" />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="select select-bordered w-full pl-10 bg-base-100 font-medium text-sm text-base-content focus:border-primary focus:outline-none transition-all rounded-xl border-base-300"
          >
            <option value="">Sort by: Default</option>
            <option value="low">💰 Price: Low to High</option>
            <option value="high">📈 Price: High to Low</option>
          </select>
        </div>
      </div>

      {/* Clear Active Filters Quick UI Bar (Jodi kono data input dewa thake) */}
      {(searchFrom || searchTo || transportType || sortBy) && (
        <div className="flex justify-end pt-1">
          <button
            onClick={() => {
              setSearchFrom("");
              setSearchTo("");
              setTransportType("");
              setSortBy("");
            }}
            className="text-xs font-bold text-error/80 hover:text-error bg-error/5 hover:bg-error/10 px-3 py-1.5 rounded-lg transition-all"
          >
            🧹 Clear All Active Filters
          </button>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
