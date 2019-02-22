<template>
  <b-card-group class="flight-card" deck>
    <b-card
      :header="header"
      header-tag="header"
      class="flight-card__item">
      <b-row>
        <b-col :cols="cols[0]" v-if="cols[0]" class="d-inline-block flight-card__col">
          <b-card-text class="flight-card__origin">
            {{ flight.origin }}<br>{{ flight.readable_departure }}
          </b-card-text>
        </b-col>
        <b-col :cols="cols[1]" v-if="cols[1]" class="d-inline-block flight-card__col">
          <div class="flight-card__plane" v-if="mode === 'rotation'">
            <font-awesome-icon icon="plane" />
          </div>
        </b-col>
        <b-col :cols="cols[2]" v-if="cols[2]" class="d-inline-block flight-card__col">
          <b-card-text class="flight-card__destination">
            {{ flight.destination }}<br>{{ flight.readable_arrival }}
          </b-card-text>
        </b-col>
      </b-row>
    </b-card>
  </b-card-group>  
</template>

<script>
export default {
  props: {
    flight: {
      type: Object,
      default() {
        return {};
      },
    }, // flight object
    mode: {
      type: String,
      default: 'default',
    }, // mode: "default" or "rotation"
  },

  computed: {
    // header of flight
    header() {
      const prefix = this.mode === 'rotation' ? 'Flight: ' : '';

      return `${prefix}${this.flight.id}`;
    },
    // cols dimensions based on different modes
    cols() {
      let cols = [ 6, 0, 6 ];

      if (this.mode === 'rotation') {
        cols = [ 4, 4, 4 ];
      }

      return cols;
    },
  },
};
</script>

<style lang="scss" scoped>
@include block("flight-card") {
  margin-left: 0;
  margin-right: 0;
  cursor: move;
  transition: 0.25s;

  &:hover,
  &:focus {
    filter: brightness(95%);
  }

  @include element("item") {
    margin-left: 0;
    margin-right: 0;
    word-wrap: normal;
  }

  @include element("plane") {
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
