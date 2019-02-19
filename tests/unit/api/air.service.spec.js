import airService from '@/api/air.service';

describe('air.service', () => {
  const axios = {
    get(reqRoute) {
      return new Promise(resolve =>
        resolve({ data: reqRoute })
      );
    },
  };

  airService.__Rewire__('axios', axios);

  it(':getAircrafts', done => {
    const offset = 25;

    airService.getAircrafts(offset).then(resp => {
      expect(resp).toEqual(`/aircrafts?offset=${offset}`);

      done();
    });
  });

  it(':getAircraft', done => {
    const id = 5;

    airService.getAircraft(id).then(resp => {
      expect(resp).toEqual(`/aircrafts/${id}`);

      done();
    });
  });

  it(':getFlights', done => {
    const offset = 25;

    airService.getFlights(offset).then(resp => {
      expect(resp).toEqual(`/flights?offset=${offset}`);

      done();
    });
  });

  it(':getFlight', done => {
    const id = 5;

    airService.getFlight(id).then(resp => {
      expect(resp).toEqual(`/flights/${id}`);

      done();
    });
  });
});
