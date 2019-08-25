<template>
  <div class="cadastrarConta">
    <ul class="nav">
      <li class="nav-item">
        <router-link to="/home">
          <a class="nav-link active" href="#">Inicio</a>
        </router-link>
      </li>
      <li class="nav-item">
        <router-link to="/contas">
          <a class="nav-link" href="#">Contas</a>
        </router-link>
      </li>
      <li class="nav-item">
        <a class="nav-link disabled" href="#">Conta</a>
      </li>
    </ul>

    <h1>Conta</h1>

    <form>
      <div class="form-row">
        <div class="form-group col-md-6">
          <label for="inputEmail1">Descrição</label>
          <input
            type="text"
            class="form-control"
            v-model="conta.descricao"
            id="inputEmail1"
            placeholder="Descrição"
          />
        </div>

        <div class="form-group col-md-6">
          <label for="inputState">Categoria</label>
          <select id="inputState" class="form-control" v-model="conta.categoria">
            <option value="-1" selected>Escolha a Categoria</option>

            <option value="1">Conta de Água</option>
            <option value="2">Conta de Luz</option>
            <option value="3">Aluguel</option>
            <option value="4">Parcela do Carro</option>
            <option value="5">Celular</option>
            <option value="6">Alimentação</option>
            <option value="7">Cinema</option>
            <option value="8">Balada</option>
            <option value="9">Bar</option>
            <option value="10">Crédito Pré Pago</option>
            <option value="11">Outros</option>
          </select>
        </div>
      </div>

      <div class="form-row">
        <div class="form-group col-md-6">
          <label for="inputEmail6">Valor</label>
          <input
            type="text"
            class="form-control"
            id="inputEmail6"
            v-model="conta.valor"
            placeholder="Valor"
          />
        </div>

        <div class="form-group col-md-6">
          <label for="inputPassword4">Data de Vencimento</label>
          <input
            type="text"
            v-model="conta.datavencimento"
            class="form-control"
            id="inputPassword4"
            placeholder="Data de Vencimento"
          />
        </div>
      </div>

      <div class="form-group">
        <div class="form-check">
          <input class="form-check-input" type="checkbox" id="gridCheck" v-model="conta.situacao" />
          <label class="form-check-label" for="gridCheck">Conta já foi quitada ?</label>
        </div>
      </div>

      <hr class="my-4" />
      <div class="col-lg-3 col-sm-12" style="margin-bottom:15px;padding:0px;">
        <button type="submit" style="width:100%" class="btn btn-primary" v-on:click="salvar">Salvar</button>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import firebase from "../../Firebase";

@Component
export default class CadastrarConta extends Vue {
  ref = firebase.firestore().collection("contas");
  conta: any;
  constructor() {
    super();
    this.conta = {};
    this.conta.situacao = false;
    this.conta.categoria = -1;

    this.conta.datavencimento = new Date().toLocaleDateString();
    //this.conta.categoria = this.getRandomCategoria();
    //this.conta.valor = "R$ " + this.getRandomValor();

    this.getParam();
   
    //this.gerarContas();
  }

  getParam() {
    this.$nextTick(() => {
      if (
        this.$route.params.id == null ||
        this.$route.params.id == "undefined" ||
        this.$route.params.id == ""
      )
        this.conta.id = "";
      else {
        this.getConta(this.$route.params.id);
      }
    });
  }

  getConta(id: string) {
    this.ref
      .doc(id)
      .get()
      .then((doc: any) => {
        if (doc.exists) {
          this.conta = doc.data();
          this.conta.id = doc.id;

          console.log(this.conta);
        } else {
          alert("No such document!");
        }
      });
  }

  getRandomCategoria() {
    return Math.floor(Math.random() * (11 - 0 + 1)) + 0;
  }

  getRandomValor() {
    return (Math.floor(Math.random() * (20000 - 1 + 1)) + 1) / 100;
  }

  gerarContas() {
    this.$nextTick(() => {
      for (var i = 0; i < 50; i++) {
        this.conta.descricao = "Conta #" + (i + 1);
        this.conta.categoria = "1";
        this.conta.datalancamento = new Date().toLocaleString();
        this.conta.datapagamento = "1";
        this.conta.empresa = "1";
        this.conta.tipo = "P";
        this.conta.usuario = localStorage.id;
        this.conta.valor = this.getRandomValor();
        this.conta.cadastrarConta = this.getRandomCategoria();
        console.log(this.conta.descricao);
        this.ref
          .add(this.conta)
          .then((docRef: any) => {
            this.inicializa();
          })
          .catch((error: any) => {
            alert("Error adding document: " + error);
          });
      }
    });
  }

  salvar() {
    this.conta.categoria = "1";
    this.conta.datalancamento = new Date().toLocaleString();
    this.conta.datapagamento = "1";
    this.conta.empresa = "1";
    this.conta.tipo = "P";
    this.conta.usuario = localStorage.id;

    console.log(this.conta);

    if (this.conta.id == "") {
      this.ref
        .add(this.conta)
        .then((docRef: any) => {
          this.inicializa();
        })
        .catch((error: any) => {
          alert("Error adding document: " + error);
        });
    } else {
      this.ref
        .doc(this.$route.params.id)
        .set(this.conta)
        .then((docRef: any) => {
          this.$router.push({ name: "contas" });
        })
        .catch((error: any) => {
          alert("Error adding document: " + error);
        });
    }
  }

  inicializa() {
    this.conta = {};
    this.conta.id = "";
    this.conta.categoria = -1;
  }
}
</script>
