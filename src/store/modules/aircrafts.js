import getCurrentPageContent from '@/utils/get-current-page-content';
import updateContent from '@/utils/update-content';
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
    // get current page
    currentPage: state => state.paginationParams.offset,
    // get content for current page
    content: getCurrentPageContent,
  },
  actions: {
    // fetch aircrafts for specific page
    getAircrafts(state, page) {
      fetchContent(state, page, 'getAircrafts');
    },
  },
  mutations: {
    // add new aircrafts to the content array
    addContent: updateContent,
    // update pagination params with values fetched from server
    setPaginationParams: updatePaginationParams,
  },
};