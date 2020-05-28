<template>
    <el-aside :class="this.isCollapsed ? 'menu-collapse' : 'menu-active'">
        <el-menu class="el-menu-vertical" :collapse="isCollapsed" :router="true" :default-active="activeLink">
            <el-menu-item :index="'/dashboard'">
                <i class="fas fa-chart-line"></i>
                <span>Дашборд</span>
            </el-menu-item>

            <el-menu-item  :index="'/orders'">
                <i class="far fa-list-alt"></i>
                <span>Заказы</span>
            </el-menu-item>

            <el-submenu :index="'/users'">
                <template slot="title">
                    <i class="fas fa-users"></i>
                    <span>Пользователи</span>
                </template>
                <el-menu-item :index="'/users/client/list'">Клиенты</el-menu-item>
                <el-menu-item :index="'/users/admins/list'">Сотрудники</el-menu-item>
            </el-submenu>

            <el-submenu index="4">
                <template slot="title">
                    <i class="fas fa-robot"></i>
                    <span>Боты</span>
                </template>
                <el-menu-item-group title="Telegram">
                    <el-menu-item index="1-1">Рассылки</el-menu-item>
                    <el-menu-item index="1-2">Настройки</el-menu-item>
                </el-menu-item-group>
            </el-submenu>

        </el-menu>
        <el-tooltip :content="isCollapsed ? 'Развернуть меню навигации' : 'Свернуть меню навигации'" placement="right" effect="light">
            <el-button type="text" class="el-menu-collapse-btn" @click="isCollapsed = !isCollapsed">
                <span class="btn-active" v-if="!isCollapsed">
                    <i class="fas fa-angle-double-left fa-lg"></i>
                </span>
                <span class="btn-collapsed" v-else>
                    <i class="fas fa-angle-double-right fa-lg"></i>
                </span>
            </el-button>
        </el-tooltip>
    </el-aside>
</template>

<script>
	export default {
		name: "main-aside",
        data() {
			return {
				activeLink: null,
				isCollapsed: window.innerWidth < 768
			}
        },
        watch: {
		    $route(to, from) {
			    this.activeLink = to.path;
            }
        },
        mounted() {
			this.activeLink = this.$route.path;
        }
	}
</script>

<style lang="scss" scoped>
    .el-aside {
        height: 100%;

        &.menu-collapse {
            width: 65px!important;
        }
        &.menu-active {
            width: 250px!important;
        }

        .el-menu.el-menu-vertical {
            height: calc(100% - 40px);
        }

        .el-menu-item i, .el-submenu i {
            width: 24px;
            margin-right: 5px;
            text-align: center;
            font-size: 18px;
            vertical-align: middle;
        }
        .el-menu-collapse-btn {
            width: 100%;
            background: #fff;
            border-right: solid 1px #e6e6e6;
            border-top: solid 1px #e6e6e6;
        }
    }
</style>