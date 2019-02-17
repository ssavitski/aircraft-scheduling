/**
 * Get content for specific page
 * @param {*} state - current state of application
 */

export default function(state) {
  const { offset, limit } = state.paginationParams;

  return state.content.slice(offset, offset + limit);
}