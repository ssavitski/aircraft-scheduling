import Vuex from 'vuex';
import { shallowMount, createLocalVue } from '@vue/test-utils';

import FlightsList from '@/components/FlightsList';
import flights from '~/mocks/flights';

const localVue = createLocalVue();
localVue.use(Vuex);

describe('FlightsList.vue', () => {
  let modules;
  let store;
  const getFlights = jasmine.createSpy('flights/getFlights');
  const stubs = [
    'b-card-text',
    'b-card-group',
    'b-card',
    'b-col',
    'b-row',
    'b-pagination',
    'font-awesome-icon',
    'draggable',
  ];

  beforeEach(() => {
    modules = {
      flights: {
        namespaced: true,
        state: {
          content: flights,
          totalRows: 100,
          perPage: 25,
        },
        getters: {
          content: state => state.content,
          totalRows: state => state.totalRows,
          perPage: state => state.perPage,
        },
        actions: {
          getFlights,
        },
      },
    };

    store = new Vuex.Store({ modules });
  });

  it('should dispatch "getFlights" action on component initialization and current page change', () => {
    const wrapper = shallowMount(FlightsList, { store, localVue, stubs });
    
    expect(getFlights).toHaveBeenCalled();
    expect(getFlights.calls.first().args[1]).toEqual(0);

    getFlights.calls.reset();

    wrapper.setData({ currentPage: 5 });

    expect(getFlights).toHaveBeenCalled();
    expect(getFlights.calls.first().args[1]).toEqual(4);
  });

  it('should change flights list outputed in the template if respective list has been changed in store', () => {
    const wrapper = shallowMount(FlightsList, { store, localVue, stubs });
    
    expect(wrapper.vm.flightsList.length).toEqual(modules.flights.state.content.length);

    modules.flights.state.content = [];

    expect(wrapper.vm.flightsList.length).toEqual(0);
  });
});
