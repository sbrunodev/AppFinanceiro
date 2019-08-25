<template>
  <div class="form-row">
    <div class="form-group col-md-12">
      <label for="inputEmail6">Pesquisar</label>
      <input
        type="text"
        class="form-control"
        id="search"
        placeholder="Pesquisar ..."
        v-on:input="setValue($event.target.value)"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class Pesquisar extends Vue {
  @Prop() private titulo!: string;
  @Prop() private url!: string;
  @Prop() private tituloBotao!: string;

  setValue(texto: string) {
    this.$emit("inputPesquisar", texto);
    this.$root.$emit("changeValuePesquisar", texto);
  }
}
</script>
