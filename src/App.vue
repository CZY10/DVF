<template>
    <div id="app">
        <router-view/>
    </div>
</template>

<script>

export default {
    name: 'app',
    components: {},
    data(){
        return{
        }
    },
    created() {
        // console.log(this.$router.path)
    },
    methods:{
    }
}
</script>

<style>

</style>
