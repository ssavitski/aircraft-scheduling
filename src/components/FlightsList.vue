<template>
  <div>
    <b-card-group deck>
      <b-card
        header="Flight: AS1001"
        header-tag="header">
        <b-row>
          <b-col cols="3" class="d-inline-block">
            <b-card-text>LDN<br>14:45</b-card-text>
          </b-col>
          <b-col cols="6" class="d-inline-block">
            <b-button href="#" variant="info">Go somewhere</b-button>
          </b-col>
          <b-col cols="3" class="d-inline-block">
            <b-card-text>CDG<br>14:45</b-card-text>
          </b-col>
        </b-row>
      </b-card>
    </b-card-group>

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
