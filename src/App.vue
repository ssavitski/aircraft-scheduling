<template>
  <b-container fluid id="app" class="mt-5">
    <b-row class="justify-content-center mb-4">
      <b-col cols="10" sm="3">
        <date-picker 
          v-model="date" 
          :config="options">
        </date-picker>
      </b-col>
    </b-row>

    <b-row>
      <b-col md="3" cols="12" class="d-inline-block">
        <header class="mb-3">Aircrafts</header>
        <aircrafts-list></aircrafts-list>
      </b-col>
      <b-col md="5" cols="12" class="d-inline-block">
        <header class="mb-3">
          Rotation <strong>{{ activeAircraft.ident }}</strong>
        </header>
        <flights-list></flights-list>
      </b-col>
      <b-col md="4" cols="12" class="d-inline-block">
        <header class="mb-3">Flights</header>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import datePicker from 'vue-bootstrap-datetimepicker';
import { mapGetters } from 'vuex';

import aircraftsList from '@/components/AircraftsList';
import FlightsList from '@/components/FlightsList';

// Create current date
const currentDate = new Date();
currentDate.setDate(currentDate.getDate() + 1);

export default {
  name: 'aircraft-scheduling',

  components: {
    datePicker,
    aircraftsList,
    FlightsList,
  },

  data() {
    return {
      date: currentDate,
      options: {
        format: 'Do MMMM YYYY',
        minDate: currentDate,
        maxDate: currentDate,
      },     
    };
  },

  created()  {
    this.$store.dispatch('flights/getFlights');
  },

  computed: {
    ...mapGetters([ 
      'activeAircraft',
    ]),
  },
};
</script>

<style lang="scss" scoped>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  max-width: $screen-desktop;
}
</style>
