import aircrafts from '@/store/modules/aircrafts';
import { aircraft } from '~/mocks/aircrafts';

describe('aircrafts - getters', () => {

  it(':currentOffset', () => {
    const state = {
      paginationParams: { offset: 5 },
    };

    expect(aircrafts.getters.currentOffset(state)).toEqual(5);
  });

  it(':perPage', () => {
    const state = {
      paginationParams: { limit: 25 },
    };

    expect(aircrafts.getters.perPage(state)).toEqual(25);
  });

  it(':totalRows', () => {
    const state = {
      paginationParams: { total: 560 },
    };

    expect(aircrafts.getters.totalRows(state)).toEqual(560);
  });
});

describe('aircrafts - actions', () => {

  it(':getAircrafts', () => {
    const fetchContent = jasmine.createSpy('fetchContent');
    const context = {
      state: {
        paginationParams: { limit: 25 },
      },
      commit: 'commit',
    };
    const page = 2;
    const methodName = 'getAircrafts';

    aircrafts.__Rewire__('fetchContent', fetchContent);
    aircrafts.actions.getAircrafts(context, page);

    const { args } = fetchContent.calls.first();

    expect(fetchContent).toHaveBeenCalled();
    expect(args[0]).toEqual(context.commit);
    expect(args[1]).toEqual(page * context.state.paginationParams.limit);
    expect(args[2]).toEqual(methodName);
  });
});

describe('aircraft - mutations', () => {

  it(':add-content', () => {
    const aircraftItems = [ aircraft ];
    const copiedAircrafts = aircraftItems.slice();
    const state = {
      content: aircraftItems,
    };

    copiedAircrafts[0].ident = 'ABCDE';

    aircrafts.mutations.addContent(state, copiedAircrafts);

    expect(state.content).toContain(aircraft);
    expect(state.content).toContain(copiedAircrafts[0]);
  });
});
