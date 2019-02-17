import Vue from 'vue';

import fetchContent from '@/utils/fetch-content';
import pagination from '~/mocks/pagination';
import { flight } from '~/mocks/flights';

describe('utils', () => {

  it(':fetch-content - should return content with pagination params from server', done => {
    const commit = jasmine.createSpy('commit');
    const resp = {
      data: [ flight ],
      pagination,
    };
    const airService = {
      getFlights() {
        return new Promise(resolve =>
          resolve(resp)
        );
      },
    };

    fetchContent.__Rewire__('airService', airService);

    fetchContent(commit, 25, 'getFlights');

    Vue.nextTick(() => {
      const commits = commit.calls.all();

      expect(commit).toHaveBeenCalledTimes(2);
      expect(commits[0].args[0]).toEqual('addContent');
      expect(commits[0].args[1]).toEqual(jasmine.objectContaining(resp.data));
      expect(commits[1].args[0]).toEqual('setPaginationParams');
      expect(commits[1].args[1]).toEqual(jasmine.objectContaining(resp.pagination));

      done();
    });
  });
});