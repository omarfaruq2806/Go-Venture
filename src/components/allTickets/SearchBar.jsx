"use client";

const SearchBar = ({
  searchFrom,
  setSearchFrom,
  searchTo,
  setSearchTo,
  transportType,
  setTransportType,
}) => {
  return (
    <div className="flex gap-4 mb-6">
      <input
        type="text"
        placeholder="From"
        value={searchFrom}
        onChange={(e) => setSearchFrom(e.target.value)}
        className="input input-bordered"
      />

      <input
        type="text"
        placeholder="To"
        value={searchTo}
        onChange={(e) => setSearchTo(e.target.value)}
        className="input input-bordered"
      />
      <select
        value={transportType}
        onChange={(e) => setTransportType(e.target.value)}
        className="select select-bordered"
      >
        <option value="">All Transport</option>
        <option value="bus">Bus</option>
        <option value="train">Train</option>
        <option value="flight">Flight</option>
      </select>
    </div>
  );
};

export default SearchBar;
