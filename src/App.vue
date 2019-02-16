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
      <b-col sm="3" cols="12" class="d-inline-block">
        <header>Aircrafts</header>
      </b-col>
      <b-col sm="5" cols="12" class="d-inline-block">
        <header>Rotation</header>
      </b-col>
      <b-col sm="4" cols="12" class="d-inline-block">
        <header>Flights</header>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import datePicker from 'vue-bootstrap-datetimepicker';

// Create current date
const currentDate = new Date();
currentDate.setDate(currentDate.getDate() + 1);

export default {
  name: 'aircraft-scheduling',

  components: {
    datePicker,
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
