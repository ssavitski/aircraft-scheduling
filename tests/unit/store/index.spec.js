import { options } from '@/store';
import { aircraft } from '~/mocks/aircrafts';

describe('getters', () => {

  it(':activeAircraft', () => {
    const state = {
      activeAircraft: aircraft,
    };

    expect(options.getters.activeAircraft(state)).toEqual(jasmine.objectContaining(aircraft));
  });
});

describe('actions', () => {

  it(':setActiveAircraft', () => {
    const context = {
      commit: jasmine.createSpy('commit'),
    };
    
    options.actions.setActiveAircraft(context, aircraft);

    const { args } = context.commit.calls.first();

    expect(context.commit).toHaveBeenCalled();
    expect(args[0]).toEqual('setActiveAircraft');
    expect(args[1]).toEqual(jasmine.objectContaining(aircraft));
  });
});

describe('mutations', () => {

  it(':setActiveAircraft', () => {
    const state = {
      activeAircraft: {},
    };

    options.mutations.setActiveAircraft(state, aircraft);

    expect(state.activeAircraft).toEqual(jasmine.objectContaining(aircraft));
  });
});
