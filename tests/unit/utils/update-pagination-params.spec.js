import updatePaginationParams from '@/utils/update-pagination-params';
import pagination from '~/mocks/pagination';

describe('utils', () => {

  it(':update-pagination-params - should pagination params in the current state', () => {
    const state = { 
      paginationParams:pagination,
    };
    const paginationParams = {
      offset: 2,
      limit: 50,
      total: 300,
    };

    updatePaginationParams(state, paginationParams);

    expect(state.paginationParams).toEqual(jasmine.objectContaining(paginationParams));
  });
});