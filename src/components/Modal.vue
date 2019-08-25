<template>
  <div>
    <div name="modal">
      <div class="modal-mask">
        <div class="modal-wrapper" style="padding-left:10%;padding-right:10%">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">{{title}}</h5>
              <button type="button" class="close" @click="$emit('close')">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>

            <div class="modal-body">
              <slot name="body">{{mensagem}}</slot>
            </div>

            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" @click="clickOpcao(0)">Não</button>
              <button type="button" class="btn btn-primary" @click="clickOpcao(1)">Sim</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class Modal extends Vue {
  @Prop() private title!: string;
  @Prop() private mensagem!: string;
  @Prop() private tipo!: any;
  @Prop() private id!: any;

  clickOpcao(tipo: number) {
      console.log(this.id);
    this.$emit("opcaoSelecionada", { tipo, id: this.id });
  }
}
</script>

<style>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 100px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 20px 0;
}

.modal-default-button {
  float: right;
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>