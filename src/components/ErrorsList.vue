<template>
  <div @click="toggleErrorList">
    <b-alert 
      :show="show"
      variant="danger"
      class="errors">
      <label :class="errorsTitleClasses">
        Please fix next errors:
      </label>
      <ul :class="errorsListClasses">
        <li
          v-for="(error, index) in errors"
          :key="index"
          :class="{ hide: !error.show }">
            {{ error.msg }}
        </li>
      </ul>
    </b-alert>
  </div>  
</template>

<script>
export default {
  props: {
    errors: {
      type: Array,
      default() {
        return [];
      },
    }, // errors list
    show: {
      type: Boolean,
      default: true,
    },
  },

  data() {
    return {
      errorsIsExpanded: false,
    };
  },

  methods: {
    // toggle error list
    toggleErrorList() {
      this.errorsIsExpanded = !this.errorsIsExpanded;
    },
  },

  computed: {
    // dynamic classes for error list
    errorsListClasses() {
      const defaultClass = 'errors__list';

      return [
        defaultClass,
        this.errorsIsExpanded ? `${defaultClass}--is-expanded` : '',
      ];
    },
    // dynamic classes for error title
    errorsTitleClasses() {
      const defaultClass = 'errors__title';

      return [
        defaultClass,
        this.errorsIsExpanded ? `${defaultClass}--is-expanded` : '',
      ];
    },
  },
};
</script>

<style lang="scss" scoped>
@include block("errors") {
  text-align: left;
  font-size: 14px;
  padding: 10px;
  cursor: pointer;

  @include element("title") {
    margin-bottom: 0;
    font-weight: bold;
    display: block;
    position: relative;
    cursor: pointer;

    &::after {
      border-bottom: 2px solid #90a1b5;
      border-right: 2px solid #90a1b5;
      content: '';
      display: block;
      height: 10px;
      margin-top: -8px;
      pointer-events: none;
      position: absolute;
      right: 12px;
      top: 50%;
      transform-origin: 66% 66%;
      transform: rotate(45deg);
      transition: all 0.15s ease-in-out;
      width: 10px;
    }

    @include modifier("is-expanded") {

      &::after {
        transform: rotate(-135deg);
      }
    }
  }

  @include element("list") {
    height: auto;
    max-height: 0;
    margin: 0;
    overflow: hidden;

    @include modifier("is-expanded") {
      max-height: 500px;
    }
  }
}
</style>
