import axios from "axios";

export default axios.create({
  baseURL: "http://192.168.1.120:8082",
  headers: {
    "Content-type": "application/json"
  }
});
