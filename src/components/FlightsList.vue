<template>
  <section class="flights-list">
    <draggable 
      v-model="flightsList" 
      :options="draggableOptions" 
      @start="drag=true" 
      @end="drag=false"
      class="flights-list__wrapper" 
      ref="flightsListWrapper">
      <flight-card
        class="mb-3"
        v-for="(flight, index) in flightsList"
        :key="index"
        :flight="flight" />
    </draggable>

    <b-pagination 
      size="sm" 
      :total-rows="totalRows" 
      v-model="currentPage"
      align="center"
      :per-page="perPage"
      class="pt-3 pb-3 flights-list__pagination" />
  </section>
</template>

<script>
import { mapGetters } from 'vuex';
import draggable from 'vuedraggable';

import FlightCard from '@/components/FlightCard';

export default {
  components: {
    draggable,
    FlightCard,
  },

  data() {
    return {
      // current page with default value
      currentPage: 1,
      // options for drag'n'drop ability
      draggableOptions: {
        group:'flights',
      },
      // list of flights based on identical list from store for current page
      flightsList: [],
    };
  },

  computed: {
    ...mapGetters('flights', [ 
      'content',
      'totalRows',
      'perPage',
    ]),
  },

  watch: {
    // fetch content for new page
    currentPage: {
      immediate: true,

      handler() {
        const page = this.currentPage - 1;

        this.$store.dispatch('flights/getFlights', page);
      },
    },
    // update outputted list 
    // if respective flights list has been changed in store
    content: {
      immediate: true,

      handler() {
        this.flightsList = this.content.slice();
      },
    },
  },
};
</script>

<style lang="scss" scoped>
@include block("flights-list") {
  height: calc(100% - #{$content-header-height});

  @include element("wrapper") {
    overflow: auto;
    height: calc(100% - #{$pagination-height});
  }

  @include element("pagination") {
    margin: 0;
    height: $pagination-height;
  }
}
</style>
