import airService from '@/api/air.service';

/**
 * Fetch content
 * @param {*} state - current state of application
 * @param {*} page - page number for which content should be fetched
 */

export default function(state, page, methodName) {
  const { commit } = state;

  airService[methodName](page).then(resp => {
    commit('addContent', resp.data);
    commit('setPaginationParams', resp.pagination);
  });
}