<template>
    <footer class="app-footer">
        <span>Copyright <i class="far fa-copyright"></i> {{ new Date().getFullYear() }}</span>
        <el-tooltip content="Написать email" placement="top">
            <el-link href="mailto:constantine.peschanov@gmail.com" :underline="false">Konstantin Peschanov.</el-link>
        </el-tooltip>
        <span>All rights reserved.</span>
    </footer>
</template>

<style lang="scss">
    .el-footer {
        padding: 0;
        background-color: #ffffff;
        border-top: solid 1px #e6e6e6;

        .el-row {
            .el-col {
                display: flex;
                align-items: center;

                span {
                    color: #606266;
                }

                .el-link {
                    margin: 0 5px;
                }
            }
        }
    }
</style>