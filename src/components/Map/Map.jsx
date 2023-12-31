import { useEffect, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import useGeoLocation from "../../hooks/useGeoLocation";

function Map() {
  const { hotels } = useSelector((state) => state.hotels);

  const [mapCenter, setMapCenter] = useState([51, -3]);

  const [searchParams] = useSearchParams();

  const latitude = searchParams.get("lat");
  const longitude = searchParams.get("lng");

  const { isLoading, userLocation, getUserLocation } = useGeoLocation();

  useEffect(() => {
    if (latitude && longitude) setMapCenter([latitude, longitude]);
  }, [latitude, longitude]);

  useEffect(() => {
    if (userLocation?.lat && userLocation?.lng)
      setMapCenter([userLocation.lat, userLocation.lng]);
  }, [userLocation]);

  // console.log("lat:", latitude, "lng:", longitude);

  // console.log("mapCenter:", mapCenter);

  console.log("userLocation:", userLocation);

  return (
    <div>
      <div className="overflow-hidden">
        <MapContainer
          className="relative h-[calc(100vh-160px)] rounded-lg"
          center={mapCenter}
          zoom={13}
          scrollWheelZoom={true}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
          />

          <button
            onClick={getUserLocation}
            className="z-1000 absolute bottom-4 left-4 rounded-xl bg-sky-600 px-4 py-2 font-semibold text-white"
          >
            {isLoading ? "Loading ..." : " Use Your Location"}
          </button>

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
