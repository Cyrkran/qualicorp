import Vue from 'vue';
import VueResource from 'vue-resource'
import { COMMONS } from "./commons";

Vue.use(VueResource);

const QUALICORP_BASE_URL = 'https://apisimulador.qualicorp.com.br';

export const ApiQualicorp = {

    /**
     * 
     * @param {Object} { estado: string, cidade: string } 
     */
    getProfissao({estado, cidade}) {
        return Vue.http.get(`${QUALICORP_BASE_URL}/profissao/${estado}/${cidade}?api-key=${COMMONS.profissaoApiKey}`);
    },

    /**
     * 
     * @param {string} profissao 
     * @param {Object} { estado: string, cidade: string } 
     */
    getEntidade(profissao, {estado, cidade}) {
        return Vue.http.get(`${QUALICORP_BASE_URL}/entidade/${profissao}/${estado}/${cidade}?api-key=${COMMONS.entidadeApiKey}`);
    },

    /**
     * 
     * @param {*} requestBody 
     */
    listPlans(requestBody = {entidade, uf, cidade, datanascimento}){
        return Vue.http.post(`${QUALICORP_BASE_URL}/plano?api-key=${COMMONS.planosApiKey}`, requestBody);
    }
}

