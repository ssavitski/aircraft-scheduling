import { shallowMount } from '@vue/test-utils';

import ErrorsList from '@/components/ErrorsList';
import errorsList from '@/data/errors-list';

describe('ErrorsList.vue', () => {
  const stubs = [ 'b-alert' ];
  const className = 'errors';
  const listClass = `${className}__list`;
  const titleClass = `${className}__title`;

  describe(':props', () => {

    it(':errors - should output passed-in errors list', () => {
      const wrapper = shallowMount(ErrorsList, { stubs });
      const errors = errorsList.slice();
      const getErrorsLength = () => wrapper.findAll(`.${listClass} .hide`).length;

      expect(getErrorsLength()).toEqual(0);

      wrapper.setProps({ errors: errorsList });

      expect(getErrorsLength()).toEqual(errorsList.length);

      errors[0].show = true;

      wrapper.setProps({ errors });

      expect(wrapper.find(`.${className}`).isVisible()).toBeTruthy();
      expect(getErrorsLength()).toEqual(errorsList.length - 1);
    });

    it(':show - should toggle errors list', () => {
      const wrapper = shallowMount(ErrorsList, { stubs });

      expect(wrapper.vm.show).toBeTruthy();
    });
  });

  it('should set specific classes on the elements based on expanded/collapsed mode', () => {
    const propsData = { errors: errorsList };
    const wrapper = shallowMount(ErrorsList, { stubs, propsData });
    const getClasses = selector => wrapper.find(selector).classes();

    expect(getClasses(`.${listClass}`)).not.toContain(`${listClass}--is-expanded`);
    expect(getClasses(`.${titleClass}`)).not.toContain(`${titleClass}--is-expanded`);

    wrapper.trigger('click');

    expect(getClasses(`.${listClass}`)).toContain(`${listClass}--is-expanded`);
    expect(getClasses(`.${titleClass}`)).toContain(`${titleClass}--is-expanded`);
  });
});
