import http from "./httpService";

export default function removeBookmark(id) {
  return http.delete(`/bookmarks/${id}`);
}
