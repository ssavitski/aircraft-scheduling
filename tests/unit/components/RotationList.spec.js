import Vuex from 'vuex';
import { shallowMount, createLocalVue } from '@vue/test-utils';

import RotationList from '@/components/RotationList';
import TimeLine from '@/components/TimeLine';
import ErrorsList from '@/components/ErrorsList';
import flights, { flight } from '~/mocks/flights';
import { aircraft } from '~/mocks/aircrafts';

const localVue = createLocalVue();
localVue.use(Vuex);

describe('RotationList.vue', () => {
  const stubs = {
    'draggable': true,
    'font-awesome-icon': true,
    'time-line': TimeLine,
    'errors-list': ErrorsList,
    'b-alert': true,
  };
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
  
  it('should remove flight from the list', () => {
    const rotationList = [ flight ];
    const removeElement = jasmine.createSpy('removeElement');
    const wrapper = shallowMount(RotationList, { stubs, store, localVue });

    RotationList.__Rewire__('removeElement', removeElement);

    wrapper.setData({ rotationList });

    wrapper.vm.removeFlight(flight);

    expect(removeElement).toHaveBeenCalled();
    expect(removeElement.calls.first().args[0]).toEqual(rotationList);
    expect(removeElement.calls.first().args[1]).toEqual(flight);
  });

  it('should show drag\'n\'drop message if list is empty', () => {
    const rotationList = [ flight ];
    const wrapper = shallowMount(RotationList, { stubs, store, localVue });
    const getMsg = () => wrapper.find('.rotation-list__drag-msg').exists();

    expect(getMsg()).toBeTruthy();

    wrapper.setData({ rotationList });

    expect(getMsg()).toBeFalsy();
  });

  it('should toggle errors list', () => {
    const {
      readable_departure,
      readable_arrival,
    } = flight;
    const rotationList = flights.concat(flight);
    const wrapper = shallowMount(RotationList, { stubs, store, localVue });
    const isVisible = () => wrapper.find('.errors-wrapper').isVisible();

    expect(isVisible()).toBeFalsy();

    flight.readable_departure = '06:30';
    flight.readable_arrival = '04:15';

    wrapper.setData({ rotationList });

    expect(isVisible()).toBeTruthy();

    flight.readable_departure = readable_departure;
    flight.readable_arrival = readable_arrival;
  });

  it('adjustHeight method should be called on component mount and errors toggle', done => {
    const rotationList = flights.concat(flight);
    const methods = {
      adjustHeight: jasmine.createSpy('adjustHeight'),
    };
    const wrapper = shallowMount(RotationList, { stubs, methods, store, localVue });

    expect(methods.adjustHeight).toHaveBeenCalled();

    methods.adjustHeight.calls.reset();

    wrapper.setData({ rotationList });

    wrapper.vm.$nextTick(() => {
      expect(methods.adjustHeight).toHaveBeenCalled();

      done();
    });
  });

  it('height of rotation list should be adjusted', done => {
    const rotationList = flights.concat(flight);
    const wrapper = shallowMount(RotationList, { stubs, store, localVue });
    const listHeight = 'calc((100% - 0px) - 0px)';

    wrapper.setData({ rotationList });

    wrapper.vm.$nextTick(() => {
      expect(wrapper.find('.rotation-list__draggable').element.style.height).toEqual(listHeight);

      done();
    });
  });

  describe('requirements to rotation list', () => {

    it('should be on the ground at midnight', () => {
      const {
        readable_departure,
        readable_arrival,
      } = flight;
      flight.readable_departure = '06:30';
      flight.readable_arrival = '04:15';

      const rotationList = [ flights[0] ].concat(flight);
      const wrapper = shallowMount(RotationList, { stubs, store, localVue });

      wrapper.setData({ rotationList });

      expect(wrapper.vm.errors[2].show).toBeTruthy();

      flight.readable_departure = readable_departure;
      flight.readable_arrival = readable_arrival;
    });

    it('hours of arrival time of previous flight should be less than hours of departure time of next flight', () => {
      const rotationList = [ flights[0] ].concat(flight);
      const wrapper = shallowMount(RotationList, { stubs, store, localVue });

      wrapper.setData({ rotationList });

      expect(wrapper.vm.errors[3].show).toBeTruthy();
    });

    it('turnaround time should be not less then 40 min', () => {
      const rotationList = [ flight ].concat(flights[0]);
      const wrapper = shallowMount(RotationList, { stubs, store, localVue });

      wrapper.setData({ rotationList });

      expect(wrapper.vm.errors[1].show).toBeTruthy();
    });

    it('destination airport of previous flight should fit to the origin airport of the next flight', () => {
      const {
        readable_arrival,
        destination,
      } = flight;
      flight.readable_arrival = '08:20';
      flight.destination = 'RQPO';
      const rotationList = [ flight ].concat(flights[0]);
      const wrapper = shallowMount(RotationList, { stubs, store, localVue });

      wrapper.setData({ rotationList });
      expect(wrapper.vm.errors[0].show).toBeTruthy();

      flight.readable_arrival = readable_arrival;
      flight.destination = destination;
    });
  });
});
