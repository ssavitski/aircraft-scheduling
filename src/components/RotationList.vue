<template>
  <section class="rotation-list">
    <errors-list 
      :errors="errors" 
      :show="isInvalid" />

    <draggable 
      v-model="rotationList" 
      :options="draggableOptions" 
      @start="drag=true" 
      @end="drag=false"
      class="rotation-list__draggable">
        <div 
          class="rotation-list__item mb-3"
          v-for="(flight, index) in rotationList"
          :key="index">
          <font-awesome-icon 
            icon="times-circle" 
            class="rotation-list__remove-item"
            @click="removeFlight(flight)" />
          <flight-card
            :flight="flight"
            mode="rotation" />
        </div>
    </draggable>

    <div v-if="!rotationList.length" class="rotation-list__drag-msg">
      Drop flights from the right to create rotation for selected date and Aircraft
    </div>

    <time-line :rotation-list="rotationList" />
  </section>
</template>

<script>
import draggable from 'vuedraggable';

import removeElement from '@/utils/remove-element';
import FlightCard from '@/components/FlightCard';
import ErrorsList from '@/components/ErrorsList';
import TimeLine from '@/components/TimeLine';
import errors from '@/data/errors-list';

export default {
  components: {
    draggable,
    FlightCard,
    ErrorsList,
    TimeLine,
  },

  data() {
    return {
      // options for drag'n'drop ability
      draggableOptions: {
        group:'flights',
      },
      rotationList: [],
    };
  },

  mounted() {
    this.adjustHeight();
  },

  methods: {
    // remove flight from the rotation
    removeFlight(flight) {
      removeElement(this.rotationList, flight);
    },
    // adjust height of rotation list to fit whole screen height
    adjustHeight() {
      const { clientHeight:timeLineHeight } = this.$el.querySelector('.timeline');
      const { clientHeight:errorsHeight } = this.$el.querySelector('.errors-wrapper');
      const listHeight = `calc(100% - ${timeLineHeight}px - ${errorsHeight}px)`;

      this.$el.querySelector('.rotation-list__draggable').style.height = listHeight;
    },
  },

  computed: {
    // check if rotation list is invalid
    isInvalid() {
      return this.errors.some(error => error.show) && this.rotationList.length > 1;
    },
    // show errors if rotation list does not fit requirements
    errors() {
      const turnaroundTime = 2400; // seconds
      // list of requirements for rotation flights order
      errors.forEach(error => error.show = false);
      const { length:flightsLength } = this.rotationList;

      if (flightsLength <= 1) {
        return errors;
      }

      this.rotationList.forEach((flight, index) => {
        let { readable_arrival, readable_departure } = flight;
        readable_arrival = parseInt(readable_arrival.split(':')[0]);
        readable_departure = parseInt(readable_departure.split(':')[0]);

        if (readable_departure > readable_arrival) {
          errors[2].show = true;
        }

        if (index + 1 === flightsLength) {
          return false;
        }

        const {
          origin,
          departuretime,
        } = this.rotationList[index + 1];
        const { destination, arrivaltime } = flight;

        if (destination !== origin) {
          errors[0].show = true;
        }

        if (departuretime < arrivaltime) {
          errors[3].show = true;
        } else if ((departuretime - arrivaltime) < turnaroundTime) {
          errors[1].show = true;
        }
      });

      return errors;
    },
  },

  watch: {
    isInvalid() {
      this.$nextTick(() => this.adjustHeight());
    },
  },
};
</script>

<style lang="scss" scoped>
$min-height:  150px;
$block:       "rotation-list";

@include block($block) {
  height: calc(100% - #{$content-header-height});
  position: relative;

  @include element("draggable") {
    min-height: $min-height;
    position: relative;
    overflow: auto;
    padding: 0 15px;

    @include to(3) {
      min-height: $min-height + 30;
    }

    @include to(1) {
      min-height: $min-height + 70;
    }
  }

  @include element("drag-msg") {
    border: 2px dashed #0087F7;
    border-radius: 5px;
    background: white;
    min-height: $min-height;
    padding: 54px 54px;
    position: absolute;
    top: 0;
    width: 100%;
  }

  @include element("item") {
    position: relative;

    &:hover {

      .#{$block}__remove-item {
        display: block;
      }
    }
  }

  @include element("remove-item") {
    display: none;
    position: absolute;
    right: -7px;
    top: -7px;
    z-index: 111;
    color: #dc3545;
    cursor: pointer;
  }
}
</style>
