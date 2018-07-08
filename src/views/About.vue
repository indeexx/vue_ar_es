<template>
  <div class="container">
    {{msg}}
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({
})
export default class About extends Vue {
  private msg: string = 'Hello indeex.'
}
</script>

<style lang="scss">
.container{
  width: 100%;
  height: 100%;
  background-color: #f1f1f1;
}
</style>
