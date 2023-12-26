import http from "./httpService";

export default function getHotelDetail(id) {
  return http.get(`/hotels/${id}`);
}
