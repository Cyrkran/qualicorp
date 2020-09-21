import Vue from 'vue';
import VueResource from 'vue-resource'

Vue.use(VueResource);

const ESTADO_BASE_URL = 'https://servicodados.ibge.gov.br/api/v1/localidades/estados'

export const ApiLocalidades = {

    /**
     * 
     * @returns { Promise } 
     *  {id: number, nome: string, sigla: string, regiao: { id: number, nome: string, sigla: string } }
     */
    getAllEstados() {
        return Vue.http.get(ESTADO_BASE_URL);
    },

    /**
     * 
     * @param { string } uf Unidade Federal
     * @returns { Promise } 
     *  {[{id: number, nome: string, microrregiao: {id: number, nome: string, mesoregiao: {} }}]}
     */
    getAllCitiesByEstado(uf) {
        return Vue.http.get(`${ESTADO_BASE_URL}/${uf}/municipios`)
    }
}

