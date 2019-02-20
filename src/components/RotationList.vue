<template>
  <section class="rotation-list">
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
      Drop flights from the right to create rotation for selected Aircraft
    </div>
  </section>
</template>

<script>
import draggable from 'vuedraggable';

import removeElement from '@/utils/remove-element';
import FlightCard from '@/components/FlightCard';

export default {
  components: {
    draggable,
    FlightCard,
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

  methods: {
    // remove flight from the rotation
    removeFlight(flight) {
      removeElement(this.rotationList, flight);
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
  }

  @include element("drag-msg") {
    border: 2px dashed #0087F7;
    border-radius: 5px;
    background: white;
    min-height: $min-height;
    padding: 54px 54px;
    position: absolute;
    top: 0;
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
