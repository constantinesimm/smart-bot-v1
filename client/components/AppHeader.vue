<template>
    <el-header>
        <el-row class="el-navbar">
            <el-col :class="{ active: isActive }" :span="12">
                <el-menu @select="handleSelect" :router="true" mode="horizontal" class="el-navbar__menu">

                    <el-menu-item class="el-navbar__brand" index="/" :route="{ path: '/'}">
                        <el-image class="brand-image" src="/img/logo/rice_logo.png" fit="fill" />
                    </el-menu-item>

                    <el-menu-item index="/dashboard" :route="{ path: '/dashboard'}">
                        <i class="fas fa-chart-line"></i>
                        <span>Дашборд</span>
                    </el-menu-item>

                    <el-menu-item  index="/orders" :route="{ path: '/orders' }">
                        <i class="far fa-list-alt"></i>
                        <span>Заказы</span>
                    </el-menu-item>

                    <el-menu-item :index="'/products'">
                        <i class="fas fa-book-open"></i>
                        <span>Категории и Позиции</span>
                    </el-menu-item>

                    <el-submenu index="/users">
                        <template slot="title">
                            <i class="fas fa-users"></i>
                            <span>Пользователи</span>
                        </template>
                        <el-menu-item index="/users/clients" :route="{ path: '/users/clients' }">Клиенты</el-menu-item>
                        <el-menu-item index="/users/staff" :route="{ path: '/users/staff' }">Сотрудники</el-menu-item>
                    </el-submenu>
                </el-menu>
            </el-col>
            <el-col :span="6">
                <div id="toggle" @click="select()">
                    <div class="span" id="top" :class="{ active: isActive }"></div>
                    <div class="span" id="middle" :class="{ active: isActive }"></div>
                    <div class="span" id="bottom" :class="{ active: isActive }"></div>
                </div>
                <el-link :underline="false" href="/users/profile">
                    <i class="fas fa-user-cog"></i> Профиль
                </el-link>
                <el-tooltip content="Выход">
                    <el-button type="primary" size="mini" plain>
                        <i class="fas fa-sign-out-alt"></i> Выход
                    </el-button>
                </el-tooltip>
            </el-col>
        </el-row>
    </el-header>
</template>

<script>
	export default {
		name: 'AppHeader',
		data() {
			return {
				activeIndex: '1',
				activeIndex2: '1',
                isActive: false
			};
		},
		methods: {
			handleSelect(key, keyPath) {
				console.log(key, keyPath);
			},
            select() {
				this.isActive = !this.isActive;
            }
		}
	}
</script>

<style lang="scss" scoped>
    .el-header {
        padding: 0;

        .el-navbar {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
    }
    $nav-toggle-color: #0E5FC2;
    $primary-color: #21CF5F;

    /* BreakPoints */

    // Mobile devices
    $screen-xs-min: 360px;

    // Small tablets and large smartphones (landscape view)
    $screen-sm-min: 576px;

    // Small tablets (portrait view)
    $screen-md-min: 768px;

    // Tablets and small desktops
    $screen-lg-min: 992px;

    // Large tablets and desktops
    $screen-xl-min: 1200px;

    .el-menu-item {
        padding: 5px 35px;
    }

    @mixin sm-menu {
        .el-menu--horizontal .el-menu-item {
            text-align: center;
            float: none;
            display: block;
            height: 100%;
            width: 100%;
            border-top: 1px solid #EAEAEB;
            font-size: 18px;
        }
    }

    .logo-header {
        padding-left: 15px;
        padding-right: 50px;
        z-index: 100;
    }

    .navWrapper {
        width: 100%;
        position: fixed;
        top: 0;
    }

    #logo.el-menu-item.is-active {
        border-bottom-color: transparent;
    }

    #toggle {
        position: absolute;
        right: 20px;
        top: 14px;
        z-index: 999;
        width: 40px;
        height: 40px;
        cursor: pointer;
        float: right;
        transition: all .3s ease-out;
        visibility: hidden;
        opacity: 0;
    }

    #toggle .span {
        border-radius: 10px;
        background: $nav-toggle-color;
        transition: all 0.3s ease-out;
        backface-visibility: hidden;
    }

    #top.span.active {
        transform: rotate(45deg) translateX(3px) translateY(5px);
    }

    #middle.span.active {
        opacity: 0;
    }

    #bottom.span.active {
        transform: rotate(-45deg) translateX(8px) translateY(-10px);
    }

    @media only screen and (max-width: $screen-md-min) {

        .logo-header {
            padding: 0;
        }

        #toggle {
            visibility: visible;
            opacity: 1;
            margin-top: 6px;
        }

        #toggle .span {
            height: 4px;
            margin: 5px 0;
            transition: all .3s ease-out;
            backface-visibility: visible;
            visibility: visible;
            opacity: 1;
        }

        #menu .el-menu-item {
            display: none;
        }

        #menu.active {
            margin: 70px 0;
            visibility: visible;
            opacity: 0.98;
            transition: all .5s ease-out;

            @include sm-menu;
        }
    }
</style>

<!--
    <el-col class="el-navbar__brand" :span="2" >
    <el-link :underline="false" href="/">
        <el-image class="el-navbar__brand-image" src="/img/logo/rice_logo.png" fit="fill" />
    </el-link>
</el-col>
    <el-menu default-active="1" class="el-navbar__menu" mode="horizontal" @select="handleSelect">
    <el-menu-item index="1">Processing Center</el-menu-item>
    <el-submenu index="2">
        <template slot="title">Workspace</template>
        <el-menu-item index="/">item one</el-menu-item>
    </el-submenu>
    <el-menu-item index="3">Orders</el-menu-item>
</el-menu>
-->