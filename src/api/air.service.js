import axios from 'axios';

axios.defaults.baseURL = process.env.VUE_APP_AIR_HOST;

const airService = {
  /**
   * Get all aircrafts with pagination
   * @param {*} offset - offset from first record
   */
  getAircrafts(offset = 0) {
    return new Promise(resolve => {
      axios.get(`/aircrafts?offset=${offset}`).then(resp =>
        resolve(resp.data)
      );
    });
  },
  /**
   * Get aircraft with specific id
   * @param {*} id - id of aircraft
   */
  getAircraft(id) {
    return new Promise(resolve => {
      axios.get(`/aircrafts/${id}`).then(resp =>
        resolve(resp.data)
      );
    });
  },
  /**
   * Get all flights with pagination
   * @param {*} offset - offset from first record
   */
  getFlights(offset = 0) {
    return new Promise(resolve => {
      axios.get(`/flights?offset=${offset}`).then(resp =>
        resolve(resp.data)
      );
    });
  },
  /**
   * Get flight with specific id
   * @param {*} id - id of flight
   */
  getFlight(id) {
    return new Promise(resolve => {
      axios.get(`/flights/${id}`).then(resp =>
        resolve(resp.data)
      );
    });
  },
};

export default airService;
