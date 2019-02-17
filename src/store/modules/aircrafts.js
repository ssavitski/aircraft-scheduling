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
    // fetch aircrafts for specific page
    getAircrafts({ state, commit }, page = 0) {
      fetchContent(commit, page * state.paginationParams.limit, 'getAircrafts');
    },
  },
  mutations: {
    // add new aircrafts to the content array
    addContent(state, content) {
      const data = state.content.concat(content);

      state.content = removeDuplicates(data, 'ident');
    },
    // update pagination params with values fetched from server
    setPaginationParams: updatePaginationParams,
  },
};