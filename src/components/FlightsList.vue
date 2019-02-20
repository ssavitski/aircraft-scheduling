<template>
  <section class="flights-list">
    <div class="flights-list__wrapper" ref="flightsListWrapper">
      <b-card-group 
        class="flight-card mb-3"
        deck
        v-for="(flight, index) in content"
        :key="index">
        <b-card
          :header="`Flight: ${flight.id}`"
          header-tag="header"
          class="flight-card__item">
          <b-row>
            <b-col cols="4" class="d-inline-block">
              <b-card-text>
                {{ flight.origin }}<br>{{ flight.readable_departure }}
              </b-card-text>
            </b-col>
            <b-col cols="4" class="d-inline-block">
              <div class="flight-card__add-btn">
                <font-awesome-icon icon="plane" />
              </div>
            </b-col>
            <b-col cols="4" class="d-inline-block">
              <b-card-text>
                {{ flight.destination }}<br>{{ flight.readable_arrival }}
              </b-card-text>
            </b-col>
          </b-row>
        </b-card>
      </b-card-group>
    </div>

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

export default {
  data() {
    return {
      // current page with default value
      currentPage: 1,
    };
  },

  mounted() {
    const { flightsListWrapper } = this.$refs;

    if (flightsListWrapper) {
      const pagination = this.$el.querySelector('.flights-list__pagination');

      flightsListWrapper.style.height = `calc(100% - ${pagination.clientHeight}px)`;
    }
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
  margin-left: 0;
  margin-right: 0;
  cursor: move;

  @include element("item") {
    margin-left: 0;
    margin-right: 0;
  }

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

@include block("flights-list") {

  @include element("wrapper") {
    overflow: auto;
  }

  @include element("pagination") {
    margin: 0;
  }
}
</style>
