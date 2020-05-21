<template>
    <el-container :class="pageClass">
        <el-main>
            <slot/>
        </el-main>
    </el-container>
</template>

<script>
    export default {
        name: "default-layout",
        data() {
            const pageClass = (document.location.pathname.indexOf('/users/login') !== -1) ? 'users-login-page' : 'default-page'
            return {
                pageClass: pageClass
            }
        }
    }
</script>

<style lang="scss" scoped>
    .el-container {
        height: 100%;

        .el-main {
            height: 100%;
        }
    }
</style>