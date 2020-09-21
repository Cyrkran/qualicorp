<template>
  <div id="app">
    <v-app>
      <QualiForm v-if="!formSubmitted" v-on:onFormSubmitted="onFormSubmitted" />

      <Planos v-if="formSubmitted" :planos="planos" v-on:backToForm="backToForm" />
    </v-app>
  </div>
</template>

<script>
import QualiForm from './QualiForm'
import Planos from './Planos'

export default {
  components: { QualiForm, Planos },
  data(){
    return {
      formSubmitted: false,
      planos: []
    }
  },
  methods: {
    onFormSubmitted(ev){
      this.formSubmitted = ev.formSubmitted;
      this.planos = ev.planos.planos;
    },
    backToForm(ev){
      this.formSubmitted = false;
      this.planos = []
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
