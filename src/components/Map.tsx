import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix for default marker icon (i found fix online)
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

const defaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

L.Marker.prototype.options.icon = defaultIcon;

// Component to handle map recentering
const ChangeView = ({ center }: { center: [number, number] }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(center, map.getZoom());
  }, [map, center]);
  return null;
};

const Map = ({ loc, city }: { loc: string, city: string }) => {
  const lat = Number(loc.split(",")[0]);
  const lon = Number(loc.split(",")[1]);
  const position: [number, number] = [lat, lon];

//   console.log(loc)

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mt-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Location on map</h2>
      <div className="h-96 rounded-lg overflow-hidden">
        <MapContainer 
          center={position} 
          zoom={13} 
          scrollWheelZoom={false}
          style={{ height: "100%", width: "100%" }}
        >
          <ChangeView center={position} />
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={position}>
            <Popup>
              {city}
            </Popup>
          </Marker>
        </MapContainer>
      </div>
    </div>
  );
};

export default Map;