<template>
  <b-container fluid id="app">
    <b-row class="justify-content-center pb-4 pt-5" ref="datePickerWrapper">
      <b-col cols="10" sm="3">
        <date-picker 
          v-model="date" 
          :config="options">
        </date-picker>
      </b-col>
    </b-row>

    <b-row class="app-content" ref="appContent">
      <b-col md="3" cols="12" class="d-inline-block app-content__col">
        <header class="pb-3 app-content__header">Aircrafts</header>
        <aircrafts-list />
      </b-col>
      <b-col md="6" cols="12" class="d-inline-block app-content__col">
        <header class="pb-3 app-content__header">
          Rotation <strong>{{ activeAircraft.ident }}</strong>
        </header>
        <rotation-list />
      </b-col>
      <b-col md="3" cols="12" class="d-inline-block app-content__col">
        <header class="pb-3 app-content__header" ref="flightsHeader">Flights</header>
        <flights-list />
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import datePicker from 'vue-bootstrap-datetimepicker';
import { mapGetters } from 'vuex';

import AircraftsList from '@/components/AircraftsList';
import FlightsList from '@/components/FlightsList';
import RotationList from '@/components/RotationList';

// Create current date
const currentDate = new Date();
currentDate.setDate(currentDate.getDate() + 1);

export default {
  name: 'aircraft-scheduling',

  components: {
    datePicker,
    AircraftsList,
    FlightsList,
    RotationList,
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

  mounted() {
    const { 
      datePickerWrapper, 
      appContent,  
    } = this.$refs;

    if (datePickerWrapper && appContent) {
      appContent.style.height = `calc(100% - ${datePickerWrapper.clientHeight}px)`;
    }
  },

  computed: {
    ...mapGetters([ 
      'activeAircraft',
    ]),
  },
};
</script>

<style lang="scss">
html,
body {
  height: 100%;
}

body {
  display: flex;
  flex-direction: column;
}

.hide {
  display: none !important;
}

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  max-width: $screen-desktop;
  height: 100%;
}

@include block("app-content") {

  @include element("col") {
    height: 100%;
    overflow: hidden;

    @include to(3) {
      height: auto;
      max-height: 500px;
      margin-bottom: 40px;
    }
  }

  @include element("header") {
    height: $content-header-height;
  }
}
</style>
