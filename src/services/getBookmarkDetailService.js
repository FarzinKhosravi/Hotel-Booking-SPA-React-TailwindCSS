import http from "./httpService";

export default function getBookmarkDetail(id) {
  return http.get(`/bookmarks/${id}`);
}
