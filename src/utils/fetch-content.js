import airService from '@/api/air.service';

/**
 * Fetch content
 * @param {*} commit - commit mutations
 * @param {*} offset - number of rows at the beginning which have to be omit
 * @param {*} methodName - name of AIR service method
 */

export default function(commit, offset, methodName) {
  airService[methodName](offset).then(resp => {
    commit('addContent', resp.data);
    commit('setPaginationParams', resp.pagination);
  });
}