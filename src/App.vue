<template>
  <div id="app">
    <nav class="navbar navbar-expand-lg navbar-light bg-light" v-if="showMenu()">
      <router-link to="/home">
        <a class="navbar-brand" href="#">Meu Dinheiro</a>
      </router-link>

      <button
        v-on:click="abreOpcao()"
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarText"
        aria-controls="navbarText"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="navbar-collapse" v-bind:class="{ collapse: visibilidadeOpcao }" id="navbarText">
        <!---->
        <ul class="navbar-nav mr-auto">
          <!--
        <li class="nav-item active">
          <router-link to="/about"><a class="nav-link" href="#"> Minhas contas <span class="sr-only">(current)</span></a></router-link>
        </li>
          -->
          <li class="nav-item">
            <router-link to="/contas">
              <a class="nav-link" href="#">Inicio</a>
            </router-link>
          </li>

          <li class="nav-item">
            <router-link to="/contas">
              <a class="nav-link" href="#">Contas a Pagar</a>
            </router-link>
          </li>

          <li class="nav-item">
            <router-link to="/contas">
              <a class="nav-link" href="#">Contas a Receber</a>
            </router-link>
          </li>

          <li class="nav-item">
            <router-link to="/contas">
              <a class="nav-link" href="#">Cartoes</a>
            </router-link>
          </li>

          <li class="nav-item">
            <router-link to="/contas">
              <a class="nav-link" href="#">Categorias</a>
            </router-link>
          </li>

        </ul>
        

        <a class="nav-link" href="#" v-on:click="Logout()">Logout</a>
      </div>
    </nav>

    <div v-bind:class="{ container: showMenu() }">
      <!-- class="container" -->
      <router-view />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Usuario } from "./classes/Usuario";

@Component({})
export default class App extends Vue {
  visibilidadeOpcao: boolean = true;

  constructor() {
    super();
    //alert(Usuario.id);
  }

  Logout() {
    localStorage.removeItem("id");
    localStorage.removeItem("nome");
    localStorage.removeItem("manterConectado");
    this.$router.push({ name: "login" });
  }

  showMenu() {
    return this.$route.name !== "login" && this.$route.name !== "register";
  }

  abreOpcao() {
    this.visibilidadeOpcao = !this.visibilidadeOpcao;
  }
}
</script>


<style lang="scss">
/*#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
*/
</style>
