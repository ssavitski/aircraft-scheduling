import removeDuplicates from '@/utils/remove-duplicates';

import flights from '~/mocks/flights';

describe('utils', () => {

  it(':remove-duplicates - should remove duplicate objects from the list', () => {
    const copiedFlights = flights.slice();
    const concatFlights = copiedFlights.concat(flights);

    expect(removeDuplicates(concatFlights, 'id').length).toEqual(flights.length);
  });
});