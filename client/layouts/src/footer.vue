<template>
    <footer class="app-footer hidden-xs-only">
        <span>Copyright <i class="far fa-copyright"></i> {{ new Date().getFullYear() }}</span>
        <el-tooltip content="Написать email" placement="top">
            <el-link href="mailto:constantine.peschanov@gmail.com" :underline="false">Konstantin Peschanov.</el-link>
        </el-tooltip>
        <span>All rights reserved.</span>
    </footer>
</template>

<style lang="scss" scoped>
    .app-footer {
        height: 60px;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        background-color: #ffffff;
        border-top: 1px solid #9093997a;
        box-shadow: 0px -2px 5px #27272759;

        span {
            color: #606266;
        }

        .el-link, span i {
            margin: 0 5px;
        }
    }
</style>