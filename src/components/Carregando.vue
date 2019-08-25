<template>
  <div class="text-center" v-if="situacao">
    <div class="spinner-grow" style="width: 5rem; height: 5rem;" role="status">
      <span class="sr-only">Loading...</span>
    </div>
    <br />
    <span>{{titulo}}</span>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class Titulo extends Vue {
  @Prop() private situacao!: string;
  @Prop() private titulo!: string;
}
</script>
