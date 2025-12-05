import { useEffect, useState } from "react";
import { validateIp } from "../utils/validateIp";
import { type GeoData } from "../utils/types";
import { getCurrentIp } from "../utils/getCurrentIp";
import { searchIpAdress } from "../utils/searchIpAdress";
import SearchHistory from "./SearchHistory";

const Home = () => {
  const [searchIp, setSearchIp] = useState("");
  const [error, setError] = useState("");
  const [currentGeoData, setCurrentGeoData] = useState<null | GeoData>(null);
  const [isSearched, setIsSearched] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const [selectedIps, setSelectedIps] = useState<string[]>([]);

  // Load history from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("geo_app_ips");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setSearchHistory(Array.isArray(parsed) ? parsed : []);
      } catch (err) {
        console.error("Failed to parse history:", err);
        setSearchHistory([]);
      }
    }
  }, []);

  // Save history to localStorage
  const saveHistory = (history: string[]) => {
    localStorage.setItem("geo_app_ips", JSON.stringify(history));
    setSearchHistory(history);
  };

  const fetchGeo = async () => {
    try {
      setIsLoading(true);
      const data = await getCurrentIp();
      setCurrentGeoData(data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = async () => {
    if (!searchIp.trim()) {
      setError("Please enter an IP address");
      return;
    }

    if (!validateIp(searchIp)) {
      setError("Please enter a valid IP address");
      return;
    }

    setError("");
    setIsSearched(true);
    setIsLoading(true);

    const geoData = await searchIpAdress(searchIp);
    setCurrentGeoData(geoData);
    setIsLoading(false);

    // Add to history if not already present
    if (!searchHistory.includes(searchIp)) {
      const newHistory = [searchIp, ...searchHistory];
      saveHistory(newHistory);
    }
  };

  const handleClear = () => {
    setSearchIp("");
    setError("");
    fetchGeo();
    setIsSearched(false);
  };

  const handleHistoryClick = (ip: string) => {
    setSearchIp(ip);
    setError("");
  };

const handleCheckboxChange = (ip: string) => {
  setSelectedIps((prev) => {
    if (prev.includes(ip)) {
      return prev.filter((item) => item !== ip);
    }
    return [...prev, ip];
  });
};

const handleDeleteSelected = () => {
  const newHistory = searchHistory.filter((ip) => !selectedIps.includes(ip));
  saveHistory(newHistory);
  setSearchHistory(newHistory);
  setSelectedIps([]);
};


  // Get user geo data once on the page
  useEffect(() => {
    fetchGeo();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800">IP Geolocation</h1>
            <button className="text-sm text-gray-500 hover:text-gray-800">
              Logout
            </button>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Search IP Address
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={searchIp}
                onChange={(e) => {
                  setSearchIp(e.target.value);
                  setError("");
                }}
                placeholder="Enter IP address"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md"
              />
              <button
                onClick={handleSearch}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700 transition"
              >
                Search
              </button>
              {searchIp && (
                <button
                  onClick={handleClear}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition"
                >
                  Clear
                </button>
              )}
            </div>
            {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
          </div>

          <div className="bg-blue-50 rounded-lg p-6 border border-blue-100">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              {isSearched ? "Search Result" : "Your Location"}
            </h2>
            {isLoading ? (
              <div className="text-sm h-40 flex items-center justify-center">
                Loading...
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">IP Address</p>
                  <p className="text-lg font-medium text-gray-900">
                    {currentGeoData?.ip}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">City</p>
                  <p className="text-lg font-medium text-gray-900">
                    {currentGeoData?.city}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Region</p>
                  <p className="text-lg font-medium text-gray-900">
                    {currentGeoData?.region}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Country</p>
                  <p className="text-lg font-medium text-gray-900">
                    {currentGeoData?.country}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Timezone</p>
                  <p className="text-lg font-medium text-gray-900">
                    {currentGeoData?.timezone}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Org</p>
                  <p className="text-lg font-medium text-gray-900">
                    {currentGeoData?.org}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        <SearchHistory
          selectedIps={selectedIps}
          searchHistory={searchHistory}
          onCheckboxChange={handleCheckboxChange}
          onHistoryClick={handleHistoryClick}
          onDeleteSelected={handleDeleteSelected}
        />
      </div>
    </div>
  );
};

export default Home;
