import http from "./httpService";

export default function getBookmarksList() {
  return http.get("/bookmarks");
}
