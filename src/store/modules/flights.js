import getCurrentPageContent from '@/utils/get-current-page-content';
import removeDuplicates from '@/utils/remove-duplicates';
import updatePaginationParams from '@/utils/update-pagination-params';
import fetchContent from '@/utils/fetch-content';

export default {
  namespaced: true,
  state: {
    content: [],
    paginationParams: {
      offset: 0,
      limit: 25,
      total: 0,
    },
  },
  getters: {
    // get pagination params
    currentOffset: state => state.paginationParams.offset,
    perPage: state => state.paginationParams.limit,
    totalRows: state => state.paginationParams.total,
    // get content for current page
    content: getCurrentPageContent,
  },
  actions: {
    // fetch flights for specific page
    getFlights(state, page) {
      fetchContent(state, page, 'getFlights');
    },
  },
  mutations: {
    // add new flights to the content array
    addContent(state, content) {
      const data = state.content.concat(content);

      state.content = removeDuplicates(data, 'id');
    },
    // update pagination params with values fetched from server
    setPaginationParams: updatePaginationParams,
  },
};