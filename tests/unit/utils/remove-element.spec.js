import removeElement from '@/utils/remove-element';

describe('utils', () => {

  it(':remove-element - should remove specific element from array', () => {
    const array = [
      1,
      'string',
      [ 4, 7 ],
      7,
      45,
    ];

    removeElement(array, 1);
    expect(array.includes(1)).toBeFalsy();

    removeElement(array, 7, 'string');

    expect(array.includes(7)).toBeFalsy();
    expect(array.includes('string')).toBeFalsy();
  });
});