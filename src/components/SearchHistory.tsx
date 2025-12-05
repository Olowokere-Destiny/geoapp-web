import React from "react";
import { SearchHistoryProps } from "../utils/types";

const SearchHistory = ({
  searchHistory,
  selectedIps,
  onCheckboxChange,
  onHistoryClick,
  onDeleteSelected,
}: SearchHistoryProps) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800">Search History</h2>
        {selectedIps.length > 0 && (
          <button
            onClick={onDeleteSelected}
            className="px-3 py-1 bg-red-500 text-white text-sm rounded-md hover:bg-red-600 transition"
          >
            Delete Selected ({selectedIps.length})
          </button>
        )}
      </div>
      {searchHistory.length === 0 ? (
        <p className="text-gray-500 text-sm">No search history yet</p>
      ) : (
        <div className="space-y-2">
          {searchHistory.map((ip, index) => (
            <div
              key={index}
              className="flex items-center gap-3 px-4 py-3 bg-gray-50 hover:bg-gray-100 rounded-md transition border border-gray-200"
            >
              <input
                type="checkbox"
                checked={selectedIps.includes(ip)}
                onChange={() => onCheckboxChange(ip)}
                className="w-4 h-4 text-blue-600 rounded"
              />
              <button
                onClick={() => onHistoryClick(ip)}
                className="flex-1 text-left"
              >
                <p className="font-medium text-gray-900">{ip}</p>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchHistory;
