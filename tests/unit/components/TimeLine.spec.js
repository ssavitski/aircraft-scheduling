import Vuex from 'vuex';
import { shallowMount, createLocalVue } from '@vue/test-utils';

import TimeLine from '@/components/TimeLine';
import rotationList from '~/mocks/rotation-list';
import timelineOutputCells from '~/mocks/timeline-output-cells';
import { aircraft } from '~/mocks/aircrafts';

const localVue = createLocalVue();
localVue.use(Vuex);

describe('TimeLine.vue', () => {
  let modules;
  let state;
  let getters;
  let store;
  const setUtilization = jasmine.createSpy('aircrafts/setUtilization');

  beforeEach(() => {
    getters = {
      activeAircraft: state => state.activeAircraft,
    };
    state = {
      activeAircraft: aircraft,
    };
    modules = {
      aircrafts: {
        namespaced: true,
        actions: {
          setUtilization,
        },
      },
    };

    store = new Vuex.Store({ modules, state, getters });
  });

  describe(':props', () => {

    it(':rotationList - should transform passed-in rotation list data into timeline', () => {
      const wrapper = shallowMount(TimeLine, { store, localVue });

      expect(wrapper.vm.cells.length).toEqual(0);

      wrapper.setProps({ rotationList });

      expect(wrapper.vm.cells).toEqual(jasmine.objectContaining(timelineOutputCells));
    });
  });
 
  it('should set utilization for selected aircraft based on cells', () => {
    const wrapper = shallowMount(TimeLine, { store, localVue });
    const aircraftData = { ident: 'GABCD', utilization: 39 };

    expect(wrapper.vm.cells.length).toEqual(0);

    wrapper.setProps({ rotationList });

    expect(setUtilization).toHaveBeenCalled();
    expect(setUtilization.calls.first().args[1]).toEqual(jasmine.objectContaining(aircraftData));
  });
});
