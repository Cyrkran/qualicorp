
<template>
    <div id="Planos">
        <v-row>
            <v-expansion-panels
                popout
                inset
                hover
                tile>
                    <v-expansion-panel
                        v-for="plan in paginatedPlanos"
                        :key="plan.id + '_' + plan.idRegraPreco">
                        <v-expansion-panel-header>
                            <v-row no-gutters>
                                <v-col cols="4">{{plan.nome_plano_ans}}</v-col>
                                <v-col
                                    cols="8"
                                    class="text--secondary"
                                >
                                    <v-fade-transition leave-absolute>
                                    <v-row
                                        no-gutters
                                        style="width: 100%"
                                    >
                                        <v-col cols="6">Coparticipação: 
                                            <v-icon :color="'success'" v-if="plan.coparticipacao">check_box</v-icon> 
                                            <v-icon color="error" v-else>indeterminate_check_box</v-icon> 
                                        </v-col>
                                        <v-col cols="6">Reembolso: 
                                            <v-icon color="success" v-if="plan.reembolso">attach_money</v-icon> 
                                            <v-icon color="error" v-else>money_off</v-icon> 
                                            </v-col>
                                    </v-row>
                                    </v-fade-transition>
                                </v-col>
                            </v-row>
                        </v-expansion-panel-header>
                        <v-expansion-panel-content>
                            <v-row style="width: 100%">
                                <v-col cols="4">
                                    <v-img :src="plan.operadoraLogo" aspect-ratio="2"></v-img>
                                </v-col>
                                <v-col cols="8">
                                    <p>
                                        Plano {{plan.segmentacao}} com acomodação {{plan.tipo_acomodacao}} de nível {{plan.nivel}} <span v-if="plan.precos">e valor R${{plan.precos.total}}</span>
                                    </p>
                                    <v-banner single-line width="100%" shaped>
                                        <v-icon
                                            slot="icon"
                                            color="info"
                                        size="36">info</v-icon>
                                        Abrangência do plano: {{plan.abrangencia}}
                                    </v-banner>
                                </v-col>
                            </v-row>
                        </v-expansion-panel-content>
                    </v-expansion-panel>
                </v-expansion-panels>
        </v-row>
        <v-row justify="center" class="pt-5">
            <v-pagination
                v-model="page"
                :length="paginationLength"
            ></v-pagination>
            <v-btn medium @click="backToForm">Voltar ao formulário</v-btn>

        </v-row>
    </div>
</template>

<script>

export default {
    name: 'Planos',
    props: {
        planos: {},
    },
    data () {
        return {
            page: 1
        }
    },
    computed: {
        paginationLength(){
            return Math.ceil(this.planos.length/10)
        },
        paginatedPlanos(){
            const end = (this.page * 10) - 1, start = end - 9;
            return this.planos.slice(start, end);
        }
    },
    methods: {
        backToForm(event){
            this.$emit('backToForm');
        }
    }
}
</script>

<style>

</style>
