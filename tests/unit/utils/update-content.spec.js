import updateContent from '@/utils/update-content';
import flights, { flight } from '~/mocks/flights';

describe('utils', () => {

  it(':update-content - should add new content in the current state', () => {
    const state = {
      content: [ flight ],
    };

    updateContent(state, flights);

    expect(state.content).toContain(flight);
    expect(state.content).toContain(flights[1]);
  });
});