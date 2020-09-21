
<template>
    <div id="QualiForm" data-app>
        <v-form v-model="isFormValid">
            <v-select
                v-model="sigla"
                :items="estados"
                :item-text="'nome'"
                :item-value="'sigla'"
                label="Estado"
                :loading="loading"
                lazy-loading
                :rules="requiredRules"
                required
            ></v-select>

            <v-select
                v-if="cidades.length > 0"
                v-model="selectedCidade"
                :items="cidades"
                :item-text="'nome'"
                :rules="requiredRules"
                :item-value="'nome'"
                :loading="loading"
                lazy-loading
                label="Cidade"
                required
            ></v-select>
           
            <v-select
                v-if="profissoes.length > 0"
                v-model="selectedProfissao"
                :items="profissoes"
                :item-text="'profissao'"
                :item-value="'profissao'"
                :rules="requiredRules"
                label="Profissão"
                :loading="loading"
                lazy-loading
                required
            ></v-select>

            <div v-if="entidades.length > 0" class="chips">
                <Chips v-for="entidade in entidades" 
                    :key="entidade.RazaoSocial" 
                    :entity="entidade" 
                    :isSelected="selectedEntidade == entidade" 
                    v-on:ChipClicked="selectedEntidade = entidade"
                />
            </div>

            <v-date-picker v-if="selectedEntidade" 
                v-model="dataNascimento" 
                required 
                color="green lighten-1" 
                header-color="primary" 
                :locale="'pt-br'" 
                :max="today" 
                :landscape="true" 
                :loading="loading"
                lazy-loading
                full-width
            />
            <v-text-field style="display: none" v-model="dataNascimento" 
                :rules="requiredRules" required  />

            <v-btn
                class="ma-2"
                :loading="loading"
                color="secondary"
                :disabled="!isFormValid"
                @click="listarPlanos">
                Enviar
                <template v-slot:loader>
                    <span>Loading...</span>
                </template>
            </v-btn>
        </v-form>
    </div>
</template>

<script>
import { ApiLocalidades } from '../api/localidades';
import { ApiQualicorp } from "../api/qualicorp";

import Chips from "./Chips";

export default {
    name: 'QualiForm',
    components: { Chips },
    data () {
        return {
            isFormValid: false,
            loader: null,
            loading: false,
            estados: [],
            cidades: [],
            profissoes: [],
            entidades: [],
            planos: [],
            sigla: "",
            selectedCidade: "",
            selectedProfissao: "",
            selectedEntidade: "",
            dataNascimento: "",
            today: new Date().toISOString(),
            requiredRules: [
                v => !!v || 'Data is required'
            ]
        }
    },
    created() {
        ApiLocalidades.getAllEstados()
        .then( (data) => {
            console.log(data.body[0])
            this.estados = data.body.sort(this.sortTextByProp('nome'));
        })
        .catch(err => {
            //TODO ADD ERROR MESSAGE
        })
    },
    watch: {
        sigla(){

            this.loading = true;
            this.selectedCidade = ""; 
            this.selectedProfissao = "";
            this.selectedEntidade = "";
            this.entidades = [];
            this.profissoes = [];

            ApiLocalidades.getAllCitiesByEstado(this.sigla)
            .then( data => {
                this.cidades = data.body.sort(this.sortTextByProp('nome'))
            })
            .catch(err => {
                //TODO ADD ERROR MESSAGE
            })
            .finally( () => {
                this.loading = false
            })
        },
        selectedCidade(){
            if(this.selectedCidade){

                this.loading = true;

                this.selectedProfissao = "";
                this.selectedEntidade = "";
                this.entidades = [];
                this.profissoes = []

                ApiQualicorp.getProfissao({estado: this.sigla, cidade: this.selectedCidade})
                .then(data => {
                    this.profissoes = data.body.sort(this.sortTextByProp('profissao'))
                })
                .catch(err => {
                    console.log(err)
                })
                .finally( () => {
                    this.loading = false
                })
            }
        },
        selectedProfissao(){
            if(this.selectedProfissao){

                this.selectedEntidade = "";
                this.entidades = [];
                this.loading = true;


                ApiQualicorp.getEntidade(this.selectedProfissao, {estado: this.sigla, cidade: this.selectedCidade})
                .then(data => {
                    this.entidades = data.body.sort(this.sortTextByProp('NomeFantasia'))
                })
                .catch(err => {
                    console.log(err)
                })
                .finally( () => {
                    this.loading = false
                })
            }
        }
    },
    methods: {
        sortTextByProp(prop = 'nome'){
            return (a, b) => {
                if(a[prop] < b[prop]) return -1
                if(a[prop] > b[prop]) return 1

                return 0
            }
        },
        listarPlanos(){
            this.loading = true;
            ApiQualicorp.listPlans({
                entidade: this.selectedEntidade.NomeFantasia,
                uf: this.sigla,
                cidade: this.selectedCidade,
                datanascimento: [this.dataNascimento]
            })
            .then((data) => {
                this.entidades = data.body;
            })
            .catch(err => {
                console.log(err);
            })
            .finally( () => {
                this.loading = false
                this.$emit('onFormSubmitted', {planos: this.entidades, formSubmitted: true});
            })
        }
    }
}
</script>

<style>
#QualiForm{
    height: 70vh;
    width: 60%;
    margin-right: auto;
    margin-left: auto;
    margin-top: 25px;
}

.chips{
    padding: 15px;
}

/* select starting stylings ------------------------------*/
.select {
  font-family:
    'Roboto','Helvetica','Arial',sans-serif;
	position: relative;
	width: 350px;
    margin-right: auto;
    margin-left: auto;
    padding: 15px;
}

.select-text {
	position: relative;
	font-family: inherit;
	background-color: transparent;
	width: 350px;
	padding: 10px 10px 10px 0;
	font-size: 18px;
	border-radius: 0;
	border: none;
	border-bottom: 1px solid rgba(0,0,0, 0.12);
}

/* Remove focus */
.select-text:focus {
	outline: none;
	border-bottom: 1px solid rgba(0,0,0, 0);
}

	/* Use custom arrow */
.select .select-text {
	appearance: none;
	-webkit-appearance:none
}

.select:after {
	position: absolute;
	top: 18px;
	right: 10px;
	/* Styling the down arrow */
	width: 0;
	height: 0;
	padding: 0;
	content: '';
	border-left: 6px solid transparent;
	border-right: 6px solid transparent;
	border-top: 6px solid rgba(0, 0, 0, 0.12);
	pointer-events: none;
}


/* LABEL ======================================= */
.select-label {
	color: rgba(0,0,0, 0.26);
	font-size: 18px;
	font-weight: normal;
	position: absolute;
	pointer-events: none;
	left: 0;
	top: 10px;
	transition: 0.2s ease all;
}

/* active state */
.select-text:focus ~ .select-label, .select-text:valid ~ .select-label {
	color: #2F80ED;
	top: -20px;
	transition: 0.2s ease all;
	font-size: 14px;
}

/* BOTTOM BARS ================================= */
.select-bar {
	position: relative;
	display: block;
	width: 350px;
}

.select-bar:before, .select-bar:after {
	content: '';
	height: 2px;
	width: 0;
	bottom: 1px;
	position: absolute;
	background: #2F80ED;
	transition: 0.2s ease all;
}

.select-bar:before {
	left: 50%;
}

.select-bar:after {
	right: 50%;
}

/* active state */
.select-text:focus ~ .select-bar:before, .select-text:focus ~ .select-bar:after {
	width: 50%;
}

/* HIGHLIGHTER ================================== */
.select-highlight {
	position: absolute;
	height: 60%;
	width: 100px;
	top: 25%;
	left: 0;
	pointer-events: none;
	opacity: 0.5;
}
</style>
