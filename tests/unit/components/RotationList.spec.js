import { shallowMount } from '@vue/test-utils';

import RotationList from '@/components/RotationList.vue';
import { flight } from '~/mocks/flights';

describe('RotationList.vue', () => {
  const stubs = [
    'draggable',
    'font-awesome-icon',
  ];
  
  it('should remove flight from the list', () => {
    const rotationList = [ flight ];
    const removeElement = jasmine.createSpy('removeElement');
    const wrapper = shallowMount(RotationList, { stubs });

    RotationList.__Rewire__('removeElement', removeElement);

    wrapper.setData({ rotationList });

    wrapper.vm.removeFlight(flight);

    expect(removeElement).toHaveBeenCalled();
    expect(removeElement.calls.first().args[0]).toEqual(rotationList);
    expect(removeElement.calls.first().args[1]).toEqual(flight);
  });
});
