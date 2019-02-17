<template>
  <div>
    <b-list-group class="aircrafts-list">
      <b-list-group-item 
        v-for="(aircraft, index) in content"
        :key="index"
        href="#"
        @click="setActive(aircraft)"
        :active="aircraft.ident === activeAircraft.ident"
        class="d-flex justify-content-between align-items-center aircrafts-list__item">
        {{ aircraft.ident }}
        <b-badge variant="primary" pill>58%</b-badge>
      </b-list-group-item>
    </b-list-group>

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
    ...mapGetters('aircrafts', [ 
      'content',
      'totalRows',
      'perPage',
    ]),
    ...mapGetters([ 
      'activeAircraft',
    ]),
  },

  methods: {
    // set active aircraft
    setActive(aircraft) {
      this.$store.dispatch('setActiveAircraft', aircraft);
    },
  },

  watch: {
    // if there is no active aircraft then 
    // set the first one item from aircraft content as active
    content() {
      if (Object.keys(this.activeAircraft).length || !this.content.length) {
        return false;
      }

      this.setActive(this.content[0]);
    },
    // fetch content for new page
    currentPage: {
      immediate: true,

      handler() {
        const page = this.currentPage - 1;

        this.$store.dispatch('aircrafts/getAircrafts', page);
      },
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
