import http from "./httpService";

export default function getHotels() {
  return http.get("/hotels");
}
