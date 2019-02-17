/**
 * Update current app state with new pagination params
 * @param {*} state - current state of application
 * @param {*} paginationParams - new pagination params: offset, limit, total
 */

export default function(state, paginationParams) {
  state.paginationParams = paginationParams;
}