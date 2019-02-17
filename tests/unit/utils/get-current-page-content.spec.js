import getCurrentPageContent from '@/utils/get-current-page-content';
import flights from '~/mocks/flights';

describe('utils', () => {

  it(':update-current-page-content - should return part of content based on pagination params', () => {
    const state = {
      paginationParams: {
        limit: 3,
        offset: 2,
        total: flights.length,
      },
      content: flights,
    };
    const contentPart = getCurrentPageContent(state);
    const result = state.content.slice(2, 5);

    expect(contentPart).toEqual(jasmine.objectContaining(result));
  });
});