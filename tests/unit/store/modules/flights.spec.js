import flights from '@/store/modules/flights';

describe('flights - getters', () => {

  it(':currentPage', () => {
    const state = {
      paginationParams: { offset: 5 },
    };

    expect(flights.getters.currentPage(state)).toEqual(5);
  });
});

describe('flights - actions', () => {

  it(':getFlights', () => {
    const fetchContent = jasmine.createSpy('fetchContent');
    const state = 'state';
    const page = 'page';
    const methodName = 'getFlights';

    flights.__Rewire__('fetchContent', fetchContent);
    flights.actions.getFlights(state, page);

    const { args } = fetchContent.calls.first();

    expect(fetchContent).toHaveBeenCalled();
    expect(args[0]).toEqual(state);
    expect(args[1]).toEqual(page);
    expect(args[2]).toEqual(methodName);
  });
});
