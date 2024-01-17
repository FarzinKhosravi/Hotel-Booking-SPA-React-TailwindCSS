import http from "./httpService";

export default function createBookmark(userBookmark) {
  return http.post("/bookmarks", userBookmark);
}
