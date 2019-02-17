/**
 * Get content for specific page
 * @param {*} state - current state of application
 */

export default function(state) {
  const { offset, limit } = state.paginationParams;
  const start = offset * limit;
  const end = start + limit;

  return state.content.slice(start, end);
}