import aircrafts from '@/store/modules/aircrafts';

describe('aircrafts - getters', () => {

  it(':currentPage', () => {
    const state = {
      paginationParams: { offset: 5 },
    };

    expect(aircrafts.getters.currentPage(state)).toEqual(5);
  });
});

describe('aircrafts - actions', () => {

  it(':getAircrafts', () => {
    const fetchContent = jasmine.createSpy('fetchContent');
    const state = 'state';
    const page = 'page';
    const methodName = 'getAircrafts';

    aircrafts.__Rewire__('fetchContent', fetchContent);
    aircrafts.actions.getAircrafts(state, page);

    const { args } = fetchContent.calls.first();

    expect(fetchContent).toHaveBeenCalled();
    expect(args[0]).toEqual(state);
    expect(args[1]).toEqual(page);
    expect(args[2]).toEqual(methodName);
  });
});
