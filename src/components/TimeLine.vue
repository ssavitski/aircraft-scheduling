<template>
  <div class="timeline">
    <div class="timeline__dimensions">
      <div 
        class="timeline__hours"
        :style="{ width: `${cell.width}%` }"
        v-for="(cell, index) in dimensionCells"
        :key="index">
          <span>{{ cell.label }}</span>
        </div>
    </div>

    <div class="timeline__row">
      <div 
        :class="[ 'timeline__cell', `timeline__cell--${cell.color}` ]"
        :style="{ width: `${cell.width}%` }"
        v-for="(cell, index) in cells"
        :key="index"></div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

import dimensionCells from '@/data/dimension-cells';

export default {
  props: {
    rotationList: {
      type: Array,
      default() {
        return [];
      },
    }, // rotation list
  },

  data() {
    return {
      dimensionCells,
    };
  },

  computed: {
    ...mapGetters([ 
      'activeAircraft',
    ]),
    // timeline cells
    cells() {
      const cells = [];
      const { length } = this.rotationList;
      const daySeconds = 86400; // 24h

      if (!this.rotationList.length) {
        return cells;
      }

      this.rotationList.forEach((flight, index) => {
        const { departuretime:start, arrivaltime:end } = flight;

        cells.push({ start, end, color: 'green' });

        if ((index + 1) !== length) {
          const { departuretime } = this.rotationList[index + 1];

          cells.push({
            start: end,
            end: departuretime,
            color: 'purple',
          });
        }
      });

      cells.unshift({
        start: 0,
        end: cells[0].start,
        color: 'grey',
      });

      cells.forEach(cell => {
        cell.width = Math.round((cell.end - cell.start) * 100 / daySeconds); // in %
      });

      return cells;
    },
  },

  watch: {
    cells() {
      const greenCells = this.cells.filter(cell => 
        cell.color === 'green'
      );
      const { ident } = this.activeAircraft;
      let utilization = 0;

      greenCells.forEach(({ width }) => utilization += width);

      this.$store.dispatch('aircrafts/setUtilization', { ident, utilization });
    },
  },
};
</script>

<style lang="scss" scoped>
@include block("timeline") {
  width: 100%;
  display: flex;
  padding: 20px 15px 5px;
  flex-direction: column;

  @include element("dimensions") {
    width: 100%;
    height: 4px;
    display: flex;
    flex-direction: row;
    font-size: 12px;
    text-align: right;
    border-bottom: 1px solid black;
    margin-bottom: 5px;
  }

  @include element("hours") {
    margin-bottom: -4px;
    border-right: 1px solid black;

    span {
      transform: translateX(50%) translateY(-100%);
      display: inline-block;       
    }

    &:first-child {

      span {
        transform: translateX(-50%) translateY(-100%);
      }
    }
  }

  @include element("row") {
    height: 35px;
    display: flex;
    flex-direction: row;
    width: 100%;
    background-color: #BAC1B8;
  }

  @include element("cell") {
    height: 100%;

    @include modifier("green") {
      background-color: #79B473;
    }

    @include modifier("grey") {
      background-color: #BAC1B8;
    }

    @include modifier("purple") {
      background-color: #553555;
    }
  }
}
</style>
