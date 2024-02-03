import http from "./httpService";

export default function createUser(user) {
  return http.post("/users", user);
}
