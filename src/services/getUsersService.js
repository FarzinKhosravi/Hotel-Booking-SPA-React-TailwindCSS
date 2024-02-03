import http from "./httpService";

export default function getUsers() {
  return http.get("/users");
}
