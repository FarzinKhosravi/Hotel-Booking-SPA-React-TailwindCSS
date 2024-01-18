export default function saveLocalStorage(key, data) {
  return localStorage.setItem(key, JSON.stringify(data));
}
