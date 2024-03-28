import axios from "axios";

axios.defaults.baseURL = "https://hotel-booking-db.onrender.com/";

const http = {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  patch: axios.patch,
  delete: axios.delete,
};

export default http;
