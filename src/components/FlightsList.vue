<template>
  <div>
    <b-card-group 
      class="flight-card mb-3"
      deck
      v-for="(flight, index) in content"
      :key="index">
      <b-card
        :header="`Flight: ${flight.id}`"
        header-tag="header">
        <b-row>
          <b-col cols="3" class="d-inline-block">
            <b-card-text>
              {{ flight.origin }}<br>{{ flight.readable_departure }}
            </b-card-text>
          </b-col>
          <b-col cols="6" class="d-inline-block">
            <b-button href="#" variant="info" class="flight-card__add-btn">
              <font-awesome-icon icon="long-arrow-alt-right" />
            </b-button>
          </b-col>
          <b-col cols="3" class="d-inline-block">
            <b-card-text>
              {{ flight.destination }}<br>{{ flight.readable_arrival }}
            </b-card-text>
          </b-col>
        </b-row>
      </b-card>
    </b-card-group>

    <b-pagination 
      size="sm" 
      :total-rows="totalRows" 
      v-model="currentPage"
      align="center"
      :per-page="perPage"
      class="mt-3" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      // current page with default value
      currentPage: 1,
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
  },
};
</script>

<style lang="scss" scoped>
@include block("flight-card") {

  @include element("add-btn") {
    font-size: 50px;
    display: inline;
    padding-top: 0;
    padding-bottom: 0;
    max-height: 45px;
    display: inline-flex;
    align-items: center;
  }
}
</style>
