import flights from '@/store/modules/flights';
import flightItems, { flight } from '~/mocks/flights';

describe('flights - getters', () => {

  it(':currentOffset', () => {
    const state = {
      paginationParams: { offset: 5 },
    };

    expect(flights.getters.currentOffset(state)).toEqual(5);
  });

  it(':perPage', () => {
    const state = {
      paginationParams: { limit: 25 },
    };

    expect(flights.getters.perPage(state)).toEqual(25);
  });

  it(':totalRows', () => {
    const state = {
      paginationParams: { total: 560 },
    };

    expect(flights.getters.totalRows(state)).toEqual(560);
  });
});

describe('flights - actions', () => {

  it(':getFlights', () => {
    const fetchContent = jasmine.createSpy('fetchContent');
    const context = {
      state: {
        paginationParams: { limit: 25 },
      },
      commit: 'commit',
    };
    const page = 2;
    const methodName = 'getFlights';

    flights.__Rewire__('fetchContent', fetchContent);
    flights.actions.getFlights(context, page);

    const { args } = fetchContent.calls.first();

    expect(fetchContent).toHaveBeenCalled();
    expect(args[0]).toEqual(context.commit);
    expect(args[1]).toEqual(page * context.state.paginationParams.limit);
    expect(args[2]).toEqual(methodName);
  });
});

describe('flights - mutations', () => {

  it(':add-content', () => {
    const state = {
      content: [ flight ],
    };

    flights.mutations.addContent(state, flightItems);

    expect(state.content).toContain(flight);
    expect(state.content).toContain(flightItems[1]);
  });
});
