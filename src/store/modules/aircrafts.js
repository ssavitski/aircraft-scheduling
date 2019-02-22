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
    // set utilization in percentage for specific aircraft
    setUtilization({ commit }, aircraftData) {
      commit('setUtilization', aircraftData);
    },
  },
  mutations: {
    // set utilization in percentage for specific aircraft
    setUtilization(state, { ident, utilization }) {
      const selected = state.content.filter(aircraft => 
        aircraft.ident === ident
      );

      if (selected.length) {
        selected[0].utilization = utilization;
      }
      // required for refreshing the component where aircrafts list is used
      state.content = state.content.slice();
    },
    // add new aircrafts to the content array
    addContent(state, content) {
      const data = state.content.concat(content);

      state.content = removeDuplicates(data, 'ident');
    },
    // update pagination params with values fetched from server
    setPaginationParams: updatePaginationParams,
  },
};