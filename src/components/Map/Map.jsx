import { useEffect, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";

function Map() {
  const { hotels } = useSelector((state) => state.hotels);

  const [mapCenter, setMapCenter] = useState([51, -3]);

  const [searchParams] = useSearchParams();

  const latitude = searchParams.get("lat");
  const longitude = searchParams.get("lng");

  useEffect(() => {
    if (latitude && longitude) setMapCenter([latitude, longitude]);
  }, [latitude, longitude]);

  //   console.log("hotels in Map:", hotels);

  console.log("lat:", latitude, "lng:", longitude);

  console.log("mapCenter:", mapCenter);

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

          <ChangeCenter position={mapCenter} />

          {latitude && longitude ? (
            <Marker position={[latitude, longitude]}>
              <Popup>Lorem, ipsum dolor.</Popup>
            </Marker>
          ) : (
            hotels?.map((hotel) => {
              return (
                <Marker
                  key={hotel.id}
                  position={[hotel.latitude, hotel.longitude]}
                >
                  <Popup>{hotel.host_location}</Popup>
                </Marker>
              );
            })
          )}
        </MapContainer>
      </div>
    </div>
  );
}

export default Map;

function ChangeCenter({ position }) {
  const map = useMap();

  map.setView(position);

  return null;
}
