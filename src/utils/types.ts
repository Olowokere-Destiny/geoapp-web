export type GeoData = {
    ip: string;
    city: string;
    region: string;
    country: string;
    loc: string;
    timezone: string;
    org: string;
};

export type SearchHistoryProps = {
  searchHistory: string[];
  selectedIps: string[];
  onCheckboxChange: (ip: string) => void;
  onHistoryClick: (ip: string) => void;
  onDeleteSelected: () => void;
}