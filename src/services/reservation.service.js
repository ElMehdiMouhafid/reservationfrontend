import http from "../http-common";

class ReservationDataService {
  createReservation(data) {
    return http.post("/Reservation", data);
  }
}

export default new ReservationDataService();