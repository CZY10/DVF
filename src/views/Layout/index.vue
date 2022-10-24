<template>
    <el-row>
        <el-col :span="24">
            <Navmenu/>
            <Mycontent/>
        </el-col>
    </el-row>
</template>

<script>
import Mycontent from "@/components/SideBar/Mycontent";
import Navmenu from "@/components/SideBar/Navmenu";
export default {
    name: "home",
    components:{
        Mycontent,
        Navmenu
    }
}
</script>

<style scoped>

</style>