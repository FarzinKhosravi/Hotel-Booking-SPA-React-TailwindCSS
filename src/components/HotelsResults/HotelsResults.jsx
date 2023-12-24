import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useSearchParams } from "react-router-dom";
import { filterHotels } from "../../features/hotels/hotelsSlice";

function HotelsResults() {
  const location = useLocation();
  const hotelsData = location.state;

  const dispatch = useDispatch();
  const { loading, hotels, error } = useSelector((state) => state.hotels);

  const [searchParams] = useSearchParams();

  const destination = searchParams.get("destination");
  const rooms = searchParams.get("rooms");

  console.log("destination:", destination);
  console.log("rooms:", rooms);

  useEffect(() => {
    dispatch(filterHotels({ destination, rooms, hotelsData }));
  }, [destination, rooms]);

  console.log("hotels:", hotels);

  return (
    <div>
      <h2>HotelsResults 🏨</h2>
      <div>Container of hotels results list</div>
    </div>
  );
}

export default HotelsResults;
