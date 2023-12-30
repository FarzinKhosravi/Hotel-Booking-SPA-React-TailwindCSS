import { useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { useSelector } from "react-redux";

function Map() {
  const { hotels } = useSelector((state) => state.hotels);

  const [mapCenter, setMapCenter] = useState([51.505, -0.09]);

  console.log("hotels in Map:", hotels);

  return (
    <div>
      <div className="overflow-hidden">
        <MapContainer
          className="h-[calc(100vh-160px)] rounded-lg"
          center={mapCenter}
          zoom={13}
          scrollWheelZoom={true}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
          />
          {hotels?.map((hotel) => {
            return (
              <Marker
                key={hotel.id}
                position={[hotel.latitude, hotel.longitude]}
              >
                <Popup>{hotel.host_location}</Popup>
              </Marker>
            );
          })}
        </MapContainer>
      </div>
    </div>
  );
}

export default Map;
