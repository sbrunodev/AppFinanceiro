<template>
  <div>
    <Carregando titulo="Um momento, já estamos carregando suas contas!" :situacao="carregando" />

    <!-- Tabela -->
    <div class="table-responsive" v-if="!carregando">
      <table class="table table-hover table-sm">
        <thead>
          <tr>
            <th scope="col" v-for="c in tabelaColunas" v-bind:key="c.id">{{c.titulo}}</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="(objLinha,index) in tabelaLinhasFiltrada" v-bind:key="objLinha.id">
            <td v-for="objColuna in tabelaColunas" v-bind:key="objColuna.id">
              {{
              getTexto(index, objColuna, objLinha[objColuna.id])
              }}
              <div v-if="objColuna.tipo=='buttons'">
                <button
                  class="btn btn-sm btn-primary"
                  style="margin-right:10px;"
                  v-on:click="editar(objLinha.id)"
                >Editar</button>

                <button class="btn btn-sm btn-danger" @click="showModal = true; conta = c">Excluir</button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Fim Tabela -->
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { functions } from "firebase";
import Carregando from "@/components/Carregando.vue";

@Component({ components: { Carregando } })
export default class Tabela extends Vue {
  @Prop() private carregando!: boolean;
  @Prop() private search: any;
  @Prop() private tabelaColunas!: [];
  @Prop() private tabelaLinhas!: [];

  private tabelaLinhasFiltrada: any = [];

  constructor() {
    super();

    this.$root.$on("changeValuePesquisar", (texto: string) => {
      //...
      this.pesquisarTabelaFiltradas();
    });

    this.pesquisarTabelaFiltradas();
  }

  editar(id: string) {
    //console.log(this.search);
    this.pesquisarTabelaFiltradas();
    //this.$router.push({ name: "novaconta", params: { id: id } });
  }

  pesquisarTabelaFiltradas() {
    this.$nextTick(() => {
      var search = this.search.toLowerCase();

      if (this.textoValido(search)) {
     

        this.tabelaLinhasFiltrada = this.tabelaLinhas.filter(function(row) {
          //console.log(row["descricao"]);
          //console.log(String(row["descricao"]).toLowerCase());
          return Object.keys(row).some(function(key) {
            return (
              String(row[key])
                .toLowerCase()
                .indexOf(search) > -1
            );
          });
        });
      } else this.tabelaLinhasFiltrada = this.tabelaLinhas;
    });
  }

  getTexto(index: number, objColuna: any, valorLinha: any) {
    switch (objColuna.tipo) {
      case "id":
        valorLinha = index + 1;
        break;

      case "boolean":
        if (valorLinha) valorLinha = objColuna.tituloTrue;
        else valorLinha = objColuna.tituloFalse;
        break;

      case "money":
        valorLinha = "R$ " + valorLinha.toLocaleString("pt-BR");
        break;

      default:
        break;
    }

    return valorLinha;
  }

  textoValido(texto: string) {
    if (texto == "" || texto == null || texto == "undefined") return false;
    return true;
  }
}
</script>
