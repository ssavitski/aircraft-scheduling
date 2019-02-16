<template>
  <div>
    <b-list-group class="aircrafts-list">
      <b-list-group-item 
        href="#"
        :active="true"
        class="d-flex justify-content-between align-items-center aircrafts-list__item">
        Cras justo odio
        <b-badge variant="primary" pill>58%</b-badge>
      </b-list-group-item>
      <b-list-group-item>Dapibus ac facilisis in</b-list-group-item>
      <b-list-group-item>Morbi leo risus</b-list-group-item>
      <b-list-group-item>Porta ac consectetur ac</b-list-group-item>
      <b-list-group-item>Vestibulum at eros</b-list-group-item>
    </b-list-group>

    <b-pagination 
      size="sm" 
      :total-rows="100" 
      v-model="currentPage"
      align="center"
      :per-page="10"
      class="mt-3" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentPage: 3,
    };
  },
};
</script>

<style lang="scss" scoped>

</style>
