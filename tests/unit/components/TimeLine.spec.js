import { shallowMount } from '@vue/test-utils';

import TimeLine from '@/components/TimeLine';
import rotationList from '~/mocks/rotation-list';
import timelineOutputCells from '~/mocks/timeline-output-cells';

describe('TimeLine.vue', () => {

  describe(':props', () => {

    it(':rotationList - should transform passed-in rotation list data into timeline', () => {
      const wrapper = shallowMount(TimeLine);

      expect(wrapper.vm.cells.length).toEqual(0);

      wrapper.setProps({ rotationList });

      expect(wrapper.vm.cells).toEqual(jasmine.objectContaining(timelineOutputCells));
    });
  });
});
