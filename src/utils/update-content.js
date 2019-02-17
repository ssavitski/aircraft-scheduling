/**
 * Update current app state with new content
 * @param {*} state - current state of application
 * @param {*} content - new content
 */

export default function(state, content) {
  state.content = state.content.concat(content);
}