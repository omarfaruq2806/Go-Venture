"use client";

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
      <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
        <option value="">Default</option>
        <option value="low">Low to High</option>
        <option value="high">High to Low</option>
      </select>
    </div>
  );
};

export default SearchBar;
