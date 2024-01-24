import { useEffect, useState } from "react";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvent,
} from "react-leaflet";
import { useSelector } from "react-redux";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import useGeoLocation from "../../hooks/useGeoLocation";
import generateRandomNumbers from "../../utils/generateRandomNumbers";
import generateRandomNames from "../../utils/generateRandomNames";

function Map() {
  const location = useLocation();

  console.log("location:", location);

  const { hotels } = useSelector((state) => state.hotels);
  const { bookmarksList } = useSelector((state) => state.bookmarksList);

  const [mapCenter, setMapCenter] = useState([51, -3]);

  // *** Convert to Custom Hook ***

  const [searchParams] = useSearchParams();
  const latitude = searchParams.get("lat");
  const longitude = searchParams.get("lng");
  const hostLocation = searchParams.get("hostLocation");
  const mapTitle = searchParams.get("mapTitle");

  const { isLoading, userLocation, getUserLocation } = useGeoLocation();

  useEffect(() => {
    if (latitude && longitude) setMapCenter([latitude, longitude]);
  }, [latitude, longitude]);

  useEffect(() => {
    if (userLocation?.lat && userLocation?.lng)
      setMapCenter([userLocation.lat, userLocation.lng]);
  }, [userLocation]);

  console.log("BOOKMARKS_LIST:", bookmarksList);

  return (
    <div>
      <div className="overflow-hidden">
        <MapContainer
          className="relative min-h-screen rounded-lg lg:h-[calc(100vh-160px)] lg:min-h-0"
          center={mapCenter}
          zoom={13}
          scrollWheelZoom={true}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
          />

          <DetectClickOnMap />

          {/* Map Title */}
          <div className="absolute right-2 top-2 z-1000 flex items-center justify-center rounded-full bg-yellow-400 px-3 py-2 font-Rasa text-sm font-semibold text-stone-800">
            <span className="block">{`You are Watching ${mapTitle}`}</span>
            <sup className="ml-0.5 block">
              <span className="relative flex h-4 w-4">
                <span className="absolute inline-block animate-ping rounded-full text-xs">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="h-4 w-4 text-stone-800"
                  >
                    <path
                      fillRule="evenodd"
                      d="m9.69 18.933.003.001C9.89 19.02 10 19 10 19s.11.02.308-.066l.002-.001.006-.003.018-.008a5.741 5.741 0 0 0 .281-.14c.186-.096.446-.24.757-.433.62-.384 1.445-.966 2.274-1.765C15.302 14.988 17 12.493 17 9A7 7 0 1 0 3 9c0 3.492 1.698 5.988 3.355 7.584a13.731 13.731 0 0 0 2.273 1.765 11.842 11.842 0 0 0 .976.544l.062.029.018.008.006.003ZM10 11.25a2.25 2.25 0 1 0 0-4.5 2.25 2.25 0 0 0 0 4.5Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
                <span className="relative inline-flex h-4 w-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="h-4 w-4 text-stone-800"
                  >
                    <path
                      fillRule="evenodd"
                      d="m9.69 18.933.003.001C9.89 19.02 10 19 10 19s.11.02.308-.066l.002-.001.006-.003.018-.008a5.741 5.741 0 0 0 .281-.14c.186-.096.446-.24.757-.433.62-.384 1.445-.966 2.274-1.765C15.302 14.988 17 12.493 17 9A7 7 0 1 0 3 9c0 3.492 1.698 5.988 3.355 7.584a13.731 13.731 0 0 0 2.273 1.765 11.842 11.842 0 0 0 .976.544l.062.029.018.008.006.003ZM10 11.25a2.25 2.25 0 1 0 0-4.5 2.25 2.25 0 0 0 0 4.5Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
              </span>
            </sup>
          </div>

          {/* Convert to Component */}
          <button
            onClick={getUserLocation}
            className="absolute bottom-4 left-4 z-1000 rounded-full bg-sky-600 px-4 py-2 font-Rasa text-xs font-semibold text-white"
          >
            {isLoading ? "Loading ..." : " Use Your Location"}
          </button>

          <ChangeCenter position={mapCenter} />

          {location.pathname === "/bookmarks/add" ? null : latitude &&
            longitude ? (
            <Marker position={[latitude, longitude]}>
              <Popup>{hostLocation}</Popup>
            </Marker>
          ) : location.pathname === "/hotels-results" ? (
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
          ) : (
            bookmarksList?.map((bookmark) => {
              return (
                <Marker
                  key={bookmark.id}
                  position={[bookmark.latitude, bookmark.longitude]}
                >
                  <Popup>{bookmark.principalSubdivision}</Popup>
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

function DetectClickOnMap() {
  const navigate = useNavigate();

  const price = generateRandomNumbers();

  const locationName = generateRandomNames();

  console.log("price:", price, "locationName:", locationName);

  useMapEvent({
    click: (event) =>
      navigate(
        `/bookmarks/add?lat=${event.latlng.lat}&lng=${event.latlng.lng}&locationName=${locationName}&price=${price}&mapTitle=Bookmark Form`
      ),
  });

  return null;
}
