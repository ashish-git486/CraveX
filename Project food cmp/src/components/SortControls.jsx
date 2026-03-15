import React from 'react';

export default function SortControls({ sortBy, setSortBy, sortOrder, setSortOrder, algorithm, setAlgorithm }) {
  return (
    <div className="flex flex-wrap items-center gap-4 p-4 bg-gray-50 rounded-lg mb-4">
      <div className="flex items-center gap-2">
        <label className="text-sm font-medium text-gray-700">Sort by:</label>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="px-3 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="name">Name</option>
          <option value="price">Price</option>
          <option value="rating">Rating</option>
          <option value="restaurant">Restaurant</option>
        </select>
      </div>

      <div className="flex items-center gap-2">
        <label className="text-sm font-medium text-gray-700">Order:</label>
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="px-3 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>

      <div className="flex items-center gap-2">
        <label className="text-sm font-medium text-gray-700">Algorithm:</label>
        <select
          value={algorithm}
          onChange={(e) => setAlgorithm(e.target.value)}
          className="px-3 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="bubble">Bubble Sort</option>
          <option value="selection">Selection Sort</option>
          <option value="insertion">Insertion Sort</option>
        </select>
      </div>

      <div className="text-xs text-gray-500">
        <span className="font-medium">Current:</span> {algorithm} sort by {sortBy} ({sortOrder})
      </div>
    </div>
  );
} 