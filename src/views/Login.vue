<template class="" >
  <div class="login bg-dark" style="height:800px;"  @keyup.enter="logincadastro()">
    <!--bg-dark-->
    <div class="container py-5">
      <div class="row">
        <div class="col-md-12">
          <h2 class="text-center text-white mb-4">Meu dinheiro.com</h2>
          <div class="row">
            <div class="col-md-6 mx-auto">
              <!-- form card login -->
              <div class="card rounded-0">
                <div class="card-header">
                  <h3 class="mb-0">Login</h3>
                </div>
                <div class="card-body">
                  <div
                    class="form"
                    role="form"
                    autocomplete="off"
                    id="formLogin"
                    novalidate
                    method="POST"
                  >
                    <div class="form-group" v-if="isCadastro">
                      <label for="nome">Nome</label>
                      <input
                        type="text"
                        class="form-control rounded-0"
                        id="nome"
                        v-model="pessoa.nome"
                        required
                      />
                    </div>

                    <div class="form-group">
                      <label for="email">Email</label>
                      <input
                        type="text"
                        class="form-control rounded-0"
                        name="email"
                        id="email"
                        v-model="pessoa.email"
                        required
                      />
                      <div class="invalid-feedback">Oops, you missed this one.</div>
                    </div>

                    <div class="form-group">
                      <label>Senha</label>
                      <input
                        type="password"
                        class="form-control rounded-0"
                        id="pwd1"
                        required
                        v-model="pessoa.senha"
                        autocomplete="new-password"
                      />
                      <div class="invalid-feedback">Senha</div>
                    </div>

                    <div class="form-group" v-if="isCadastro">
                      <label>Confirimar Senha</label>
                      <input
                        type="password"
                        class="form-control rounded-0"
                        id="confirmarsenha"
                        required
                        v-model="pessoa.confirmarsenha"
                        autocomplete="new-password"
                      />
                    </div>

                    <div v-if="!isCadastro">
                      <label
                        class="custom-control custom-checkbox"
                        style="padding-left:0px;margin-left:0px;"
                      >
                        <input type="checkbox" v-model="manterConectado" />
                        <span class="custom-control-indicator"></span>
                        <span
                          class="custom-control-description small text-dark"
                          style="margin-left:10px;"
                        >Manter Conectado ?</span>
                      </label>
                    </div>

                    <div v-if="!isCadastro">
                      <button
                        type="submit"
                        class="btn btn-success float-right"
                        id="btnLogin"
                        v-on:click="logincadastro()"
                      >Login</button>
                    </div>

                    <div class="col-12" style="padding:0px" v-if="isCadastro">
                      <button
                        type="submit"
                        class="btn btn-success"
                        id="btnLogin"
                        style="width:100%"
                        v-on:click="logincadastro()"
                      >Cadastrar</button>
                    </div>
                  </div>
                </div>
                <!--/card-block-->
                <div class="col-12 card-header" v-on:click="cadastrar()">
                  <label>{{isCadastro ? 'Voltar para login':'Ainda não tem uma conta ? Cadastre-se já !'}}</label>
                </div>
              </div>
              <!-- /form card login -->
            </div>
          </div>
          <!--/row-->
        </div>
        <!--/col-->
      </div>
      <!--/row-->
    </div>
    <!--/container-->
  </div>
</template>

<script lang="ts">
//require("@/assets/css/main.css");
//require("@/assets/css/util.css");

import { Usuario } from "../classes/Usuario";
import { Component, Vue } from "vue-property-decorator";
import firebase from "../Firebase";

@Component
export default class Login extends Vue {
  isCadastro: boolean = false;
  ref = firebase.firestore().collection("usuarios");
  pessoa: any = { nome: "", email: "", senha: "", confirmarsenha: "" };
  manterConectado: boolean = false;

  cadastrar() {
    this.isCadastro = !this.isCadastro;
  }

  isValid(Texto: string, tipo: string) {
    var resultado: boolean = false;
    Texto = Texto.trim();

    if (Texto != "" && Texto != null && Texto != "undefined") {
      switch (tipo) {
        case "email":
          if (Texto.includes("@")) resultado = true;
          break;
        default:
          resultado = true;
          break;
      }
    }

    return resultado;
  }

  async valida() {
    var erro: string = "";

    if (!this.isValid(this.pessoa.email, "email"))
      erro += "Informe um e-mail valido.\n";

    if (!this.isValid(this.pessoa.senha, "")) erro += "Informe uma senha.\n";

    if (this.isCadastro) {
      if (!this.isValid(this.pessoa.nome, ""))
        erro += "Informe um nome valido.\n";

      if (this.pessoa.senha != this.pessoa.confirmarsenha)
        erro += "As senhas não estão iguais.\n";
      else {
        // Verificar se o usuario já foi cadastrado.

        console.log(this.verificaEmail());

        await this.verificaEmail().then((resultado: any) => {
          if (resultado) erro += "Esse email já está cadastrado";
        });
      }
    }

    return erro;
  }

  verificaEmail() {
    var encontrou: boolean = false;
    return this.ref
      .where("email", "==", this.pessoa.email)
      .get()
      .then((snap: any) => {
        snap.forEach((c: any) => {
          if (c.exists) {
            encontrou = true;
          }
        });

        return encontrou;
      });
  }

  salvarSessao(id: string, nome: string) {
    localStorage.id = id;
    localStorage.nome = nome;
    localStorage.manterConectado = this.manterConectado;
  }

  async logincadastro() {
    
    
   

    var errors: any = await this.valida();

    if (errors == "") {
      if (this.isCadastro) {
        this.pessoa.dataalteracao = new Date().toLocaleString();
        this.pessoa.datacriacao = new Date().toLocaleString();

        this.ref
          .add(this.pessoa)
          .then((docRef: any) => {
            alert("Cadastro realizado com sucesso");
            this.isCadastro = false;
          })
          .catch((error: any) => {
            alert("Error adding document: " + error);
          });
      } else {
        var login = {};

        this.ref
          .where("email", "==", this.pessoa.email)
          .where("senha", "==", this.pessoa.senha)
          .get()
          .then((snap: any) => {
            var pessoas = [];

            Usuario.id = "-1";

            snap.forEach((c: any) => {
              if (c.exists) {
                Usuario.id = c.id;
                Usuario.nome = c.data().nome;
                Usuario.email = c.data().email;
                Usuario.dataalteracao = c.data().alteracao;
                Usuario.datacriacao = c.data().criacao;
                Usuario.ultimologin = c.data().ultimologin;

                //Vue.prototype.$idUsuario = c.id;
                //localStorage.id = c.id;
              }
            });

            if (Usuario.id == "-1") alert("Usuário não encontrado :/");
            else {
              this.salvarSessao(Usuario.id, Usuario.nome);
              this.$router.push({ name: "home" });
            }
          });
      }
    } else {
      alert(errors);
    }
  }
}
</script>

<style>
</style>