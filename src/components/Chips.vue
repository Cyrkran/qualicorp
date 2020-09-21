
<template>
    <div id="Chips" v-on:click="onClickChip">
        <div :class="['chip', {'selected' : isSelected}]">
            {{entity.NomeFantasia}}
        </div>
    </div>
</template>

<script>

export default {
    name: 'Chips',
    props: {
        entity: {},
        isSelected: false
    },
    data () {
        return {
            asd: "bla"
        }
    },
    created() {
        console.log(this.entity)
    },
    watch: {

    },
    methods: {
        onClickChip(event){
            this.$emit('ChipClicked', this.entity)
        }
    }
}
</script>

<style>
#Chips{
    width: max-content;
    padding-right: 10px;
    padding-bottom: 10px;
    display: inline-block;
}

.chip{
    cursor: pointer;
    padding: 8px 10px;
    background-color: rgb(224, 224, 224);
    border-radius: 50px;
    border: 1px solid;
    border-color:  rgb(224, 224, 224); 
}

.chip.selected{
    background-color: #1867c0 !important;
    border-color: #1867c0 !important;
    color: white
}
</style>
