import http from "../http-common";

class VolDataService {
  getByRequest(data) {
    return http.post("/Vol", data);
  }
}

export default new VolDataService();