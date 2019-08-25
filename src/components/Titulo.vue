<template>
  <div class="row">
      <div class="col-6">
        <h2 class="display-7">{{titulo}}</h2>
      </div>
      <div class="col-6">
        <router-link :to="{ name: url  }">
          <button class="btn btn-success float-right align-middle">{{tituloBotao}}</button>
        </router-link>
      </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class Titulo extends Vue {
  @Prop() private titulo!:string;
  @Prop() private url!:string;
  @Prop() private tituloBotao!:string;
}
</script>
