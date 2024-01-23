import http from "./httpService";

export default function updateBookmark(id, updateBookmark) {
  return http.patch(`/bookmarks/${id}`, updateBookmark);
}
