<template>
  <div>
    <ul class="nav">
      <li class="nav-item" v-for="b in navBase" v-bind:key="b.descricao">
        <a v-if="b.url==''" class="nav-link active" v-bind:class="{ disabled: !b.situacao }" href="#">{{b.descricao}}</a>

        <router-link v-if="b.url!=''" :to="{ name: b.url  }">
          <a
            class="nav-link active"
            v-bind:class="{ disabled: !b.situacao }"
            href="#"
          >{{b.descricao}}</a>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class NavBase extends Vue {
  @Prop() private navBase!: [];
}
</script>
