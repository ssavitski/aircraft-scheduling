import Vuex from 'vuex';
import { shallowMount, createLocalVue } from '@vue/test-utils';

import AircraftsList from '@/components/AircraftsList.vue';
import aircrafts from '~/mocks/aircrafts';

const localVue = createLocalVue();
localVue.use(Vuex);

describe('AircraftsList.vue', () => {
  let modules;
  let state;
  let getters;
  let actions;
  let store;
  const getAircrafts = jasmine.createSpy('aircrafts/getAircrafts');
  const setActiveAircraft = jasmine.createSpy('setActiveAircraft');
  const stubs = [
    'b-list-group',
    'b-list-group-item',
    'b-badge',
    'b-pagination',
  ];

  beforeEach(() => {
    getters = {
      activeAircraft: state => state.activeAircraft,
    };
    state = {
      activeAircraft: {},
    };
    actions = {
      setActiveAircraft,
    };
    modules = {
      aircrafts: {
        namespaced: true,
        state: {
          content: aircrafts,
          totalRows: 1,
          perPage: 25,
        },
        getters: {
          content: state => state.content,
          totalRows: state => state.totalRows,
          perPage: state => state.perPage,
        },
        actions: {
          getAircrafts,
        },
      },
    };

    store = new Vuex.Store({ modules, state, getters, actions });
  });
  
  it('should set first aircraft from the list as active item if there is no active aircraft', () => {
    const setActive = jasmine.createSpy('setActive');
    const wrapper = shallowMount(AircraftsList, { store, localVue, stubs });

    wrapper.setMethods({ setActive });

    modules.aircrafts.state.content = [];

    expect(setActive).not.toHaveBeenCalled();

    modules.aircrafts.state.content = aircrafts;

    expect(setActive).toHaveBeenCalled();
    expect(setActive.calls.first().args[0]).toEqual(jasmine.objectContaining(aircrafts[0]));
  });

  it('should dispatch "getAircrafts" action on component initialization and current page change', () => {
    const wrapper = shallowMount(AircraftsList, { store, localVue, stubs });
    
    expect(getAircrafts).toHaveBeenCalled();
    expect(getAircrafts.calls.first().args[1]).toEqual(0);

    getAircrafts.calls.reset();

    wrapper.setData({ currentPage: 5 });

    expect(getAircrafts).toHaveBeenCalled();
    expect(getAircrafts.calls.first().args[1]).toEqual(4);
  });

  it('should dispatch "setActiveAircraft" action by clicking on aircraft', () => {
    const wrapper = shallowMount(AircraftsList, { store, localVue, stubs });

    wrapper.vm.setActive(aircrafts[0]);

    expect(setActiveAircraft).toHaveBeenCalled();
    expect(setActiveAircraft.calls.first().args[1]).toEqual(jasmine.objectContaining(aircrafts[0]));
  });
});
