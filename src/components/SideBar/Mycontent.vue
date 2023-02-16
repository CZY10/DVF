<template>
    <div>
        <router-view/>
    </div>
</template>

<script>
export default {
    name: "Mycontent"
}
</script>

<style lang="less" scoped>
.header{
    height: 40px;
    border-bottom: 1px solid #cccccc;
    display: flex;
    align-items: center;
    padding: 0 20px;
}
</style>
