<template>
  <div class="home">

    <div class="jumbotron" style="margin-top:15px;">
      <h1 class="display-4">Bem vindo</h1>
      <p
        class="lead"
      >Já pensou em gerenciar todas suas contas de uma forma fácil e simples? E o melhor de tudo de graça!</p>
      <hr class="my-4" />
      <p>Consiga gerenciar todas suas contas a pagar e receber, além de conseguir enviar um email para seus clientes, tendo total gerenciamento dos seus custos. </p>
      <a class="btn btn-primary btn-lg" href="#" role="button">Leia mais</a>
    </div>

    <!--<img alt="Vue logo" src="../assets/logo.png" />
    <img alt="Vue logo" src="../assets/imagens/bg-01.jpg">-->
    <!--<HelloWorld msg="Welcome to Your Vue.js + TypeScript App" />-->
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import HelloWorld from "@/components/HelloWorld.vue"; // @ is an alias to /src
import { Usuario } from "../classes/Usuario";

@Component({
  components: {
    HelloWorld
  }
})
export default class Home extends Vue {
  constructor() {
    super();

    console.log("Home - " + localStorage.id);
  }
}
</script>
