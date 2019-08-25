<template>
  <div class="cadastrarConta">
    <NavBase :navBase="navBase" />
    <Titulo titulo="Contas" url="novaconta" tituloBotao="Nova Conta" />
    <hr />
    <Pesquisar @inputPesquisar="setSearch" />

    <Tabela
      :search="search"
      :tabelaColunas="tabelaColunas"
      :tabelaLinhas="contas"
      :carregando="carregando"
    />

    <Modal
      v-if="showModal"
      @close="showModal = false"
      title="Deseja realmente excluir essa Conta?"
      mensagem="Após excluir essa conta não será possivel recuperar ela novamente"
      opcao="[{id:1, titulo:'Sim'},{id:2, titulo:'Não'}]"
      :id="conta.id"
      @opcaoSelecionada="recuperaOpcaoModal"
    />

  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Modal from "@/components/Modal.vue";
import Tabela from "@/components/Tabela.vue";
import NavBase from "@/components/NavBase.vue";
import Titulo from "@/components/Titulo.vue";
import Pesquisar from "@/components/Pesquisar.vue";

import firebase from "../../Firebase";

@Component({
  components: {
    Modal,
    Tabela,
    NavBase,
    Titulo,
    Pesquisar
  }
})

export default class PesquisarContas extends Vue {
  ref = firebase.firestore().collection("contas");
  contas = new Array();
  carregando: boolean = true;
  showModal: boolean = false;
  conta = {};
  search: string = "";

  tabelaColunas = [
    { id: "id", titulo: "Código", tipo: "id" },
    { id: "descricao", titulo: "Descrição", tipo: "" },
    { id: "valor", titulo: "Valor", tipo: "money" },
    { id: "datavencimento", titulo: "Data de Vencimento", tipo: "" },
    { id: "datalancamento", titulo: "Data de Lançamento", tipo: "" },
    {
      id: "situacao",
      tipo: "boolean",
      titulo: "Situação",
      tituloTrue: "Pago",
      tituloFalse: "A Pagar"
    },
    { id: "acao", titulo: "Ação", tipo: "buttons" }
  ];

  navBase = [
    { descricao: "Inicio", url: "home", situacao: true },
    { descricao: "Contas", url: "", situacao: false }
  ];

  constructor() {
    super();
    this.get();
  }

  recuperaOpcaoModal(resultado: any) {
    if (resultado.tipo == 1) {
      this.excluir(resultado.id);
    }
    this.showModal = false;
  }

  setSearch(resultado: any) {
    this.search = resultado;
  }

  excluir(id: string) {
    this.ref
      .doc(id)
      .delete()
      .then(() => {
        this.get();
      })
      .catch((error: any) => {
        alert("Error removing document: " + error);
      });
  }

  get() {
    this.carregando = true;

    this.$nextTick(() => {
      this.ref
        .where("usuario", "==", localStorage.id)
        .get()
        .then((snap: any) => {
          this.contas = [];

          snap.forEach((c: any) => {
            this.contas.push({
              id: c.id,
              categoria: c.data().categoria,
              datalancamento: c.data().datalancamento,
              datapagamento: c.data().datapagamento,
              datavencimento: c.data().datavencimento,
              descricao: c.data().descricao,
              empresa: c.data().empresa,
              situacao: c.data().situacao,
              tipo: c.data().tipo,
              usuario: c.data().usuario,
              valor: c.data().valor
            });
          });

          this.carregando = false;
        });
    });
  }
}
</script>