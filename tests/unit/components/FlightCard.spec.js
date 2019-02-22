import { shallowMount } from '@vue/test-utils';

import FlightCard from '@/components/FlightCard';
import { flight } from '~/mocks/flights';

describe('FlightCard.vue', () => {
  const stubs = [
    'b-card-text',
    'b-col',
    'b-row',
    'b-card',
    'b-card-group',
  ];
  
  describe(':props', () => {

    it(':flight - should info of flight pased-in', () => {
      const propsData = { flight };
      const wrapper = shallowMount(FlightCard, { propsData, stubs });

      expect(wrapper.find('.flight-card__origin').text()).toContain(flight.origin);
      expect(wrapper.find('.flight-card__destination').text()).toContain(flight.destination);
    });

    it(':mode - should change header and layout based on passed-in value', () => {
      const propsData = { flight };
      const wrapper = shallowMount(FlightCard, { propsData, stubs });

      expect(wrapper.find('.flight-card__item').attributes('header')).toEqual(flight.id);
      expect(wrapper.vm.cols).toEqual(jasmine.objectContaining([ 6, 0, 6 ]));

      wrapper.setProps({ mode: 'rotation' });

      expect(wrapper.find('.flight-card__item').attributes('header')).toEqual(`Flight: ${flight.id}`);
      expect(wrapper.vm.cols).toEqual(jasmine.objectContaining([ 4, 4, 4 ]));
    });
  });
});
