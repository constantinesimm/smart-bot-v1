<template>
    <header class="app-header">
        <div class="app-header__navigation">
            <el-link :underline="false" href="/">
                <el-avatar shape="circle" fit="scale-down" src="/img/logo/app_logo.png"></el-avatar>
            </el-link>
            <transition name="el-zoom-in-center">
                <el-button @click="handleCollapsedNav" class="toggle-menu hidden-sm-and-up" type="text" size="mini">
                    <i v-if="!this.navMenuVisible" class="fas fa-bars fa-2x"></i>
                    <i v-else class="fas fa-times fa-2x"></i>
                </el-button>
            </transition>
            <transition name="el-zoom-in-center">
                <div :class="['collapsed__nav hidden-sm-and-up', { 'is-active': this.navMenuVisible }]">
                    <router-link class="el-link el-link--default" to="/dashboard">
                        <i class="fas fa-chart-area fa-lg"></i> <span> Статистика</span>
                    </router-link>
                    <router-link disabled="disabled" class="el-link el-link--default" to="/products">
                        <i class="fas fa-book-open fa-lg"></i> <span>Меню</span>
                    </router-link>
                    <router-link disabled="disabled" class="el-link el-link--default" to="/orders">
                        <i class="far fa-list-alt fa-lg"></i> <span>Заказы</span>
                    </router-link>
                    <router-link class="el-link el-link--default" to="/users/staff">
                        <i class="fas fa-user-friends fa-lg"></i> <span>Сотрудники</span>
                    </router-link>
                    <router-link class="el-link el-link--default" to="/users/clients">
                        <i class="fas fa-users fa-lg"></i> <span>Клиенты</span>
                    </router-link>
                </div>
            </transition>
            <transition name="el-zoom-in-center">
                <div class="header__nav hidden-xs-only">
                    <router-link class="el-link el-link--default" to="/dashboard">
                        <i class="fas fa-chart-area fa-lg"></i> <span class="hidden-xs-only"> Статистика</span>
                    </router-link>
                    <router-link disabled="disabled" class="el-link el-link--default" to="/products">
                        <i class="fas fa-book-open fa-lg"></i> <span class="hidden-xs-only">Меню</span>
                    </router-link>
                    <router-link disabled="disabled" class="el-link el-link--default" to="/orders">
                        <i class="far fa-list-alt fa-lg"></i> <span class="hidden-xs-only">Заказы</span>
                    </router-link>
                    <router-link class="el-link el-link--default" to="/users/staff">
                        <i class="fas fa-user-friends fa-lg"></i> <span class="hidden-xs-only">Сотрудники</span>
                    </router-link>
                    <router-link class="el-link el-link--default" to="/users/clients">
                        <i class="fas fa-users fa-lg"></i> <span class="hidden-xs-only">Клиенты</span>
                    </router-link>

            </div>
            </transition>
        </div>

        <div class="app-header__options">
            <div class="toggle-user-menu" @click="handleUserMenu">
                <el-avatar shape="circle" fit="scale-down" src="/img/logo/app_logo.png">CS</el-avatar>
                <i :class="[ !this.userMenuVisible ? 'fas fa-angle-down fa-lg' : 'fas fa-angle-up fa-lg']"></i>
            </div>

            <div :class="['user-details-menu', { 'is-active' : this.userMenuVisible }]">
                <div class="user-auth-detail">
                    <span>Авторизован как:</span><br>
                    <span><< Константин Песчанов >></span>
                </div>
                <router-link class="el-link el-link--default" to="/users/profile" @click="handleUserMenu">
                    <i class="fas fa-user-circle fa-lg"></i> <span>Настройки профиля</span>
                </router-link>
                <el-button @click="click" class="btn-logout" size="mini" icon="fas fa-power-off fa-lg" plain>
                    <span> Выход</span>
                </el-button>
            </div>
        </div>
    </header>
</template>

<script>
	export default {
		data() {
			return {
				navMenuVisible: false,
                userMenuVisible: false
            }
        },
        methods: {
			handleCollapsedNav() {
				if (!!this.userMenuVisible) this.handleUserMenu();

				this.navMenuVisible = !this.navMenuVisible;
            },
            handleUserMenu() {
				if (!!this.navMenuVisible) this.handleCollapsedNav();

			    this.userMenuVisible = !this.userMenuVisible;
            },
			click() {
				this.$parent.$emit('logout', 'message')
            }
        }
	}
</script>

<style lang="scss" scoped>
    $screen-sm-min: 576px;
    $screen-md-min: 768px;

    .app-header {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        height: 60px;
        border-bottom: 1px solid #9093997a;
        box-shadow: 0 4px 5px #27272759;

        &__navigation {
            display: flex;
            flex-direction: row;
            align-items: center;

            .el-link, a[href] {
                padding: 10px 5px 5px 5px;
                font-size: 12px;

                &[disabled] {
                    opacity: .5;
                    cursor: no-drop;

                    &:hover {
                        color: #606266;
                    }
                }

                .el-avatar {
                    width: 55px;
                    height: 55px;
                    margin: 0 10px 0 5px;
                    background: transparent;
                    border: 1px solid #9093997a;
                    box-shadow: 0px 0px 11px 3px rgba(39, 39, 39, 0.35), 0px 5px 9px 6px rgba(255, 255, 255, 0.5);
                }

                & > span {
                    margin-left: 5px;
                }

                &:not(:last-child) {
                    padding: 5px;
                }

                &.isActive {
                    color: #409EFF;
                    border-bottom: 2px solid #409EFF;
                }

                &:not(.isActive) {
                    padding: 5px;
                }
            }

            @media only screen and (max-width: $screen-md-min) {
                .toggle-menu {
                    font-size: 10px;
                    padding: 0;
                    color: #606266;
                }

                .collapsed__nav {
                    display: none;
                    position: absolute;
                    top: 65px;
                    left: 10px;
                    right: 10px;
                    width: auto;
                    padding: 5px 0;
                    background: #ffffff;
                    border: 1px solid #9093997a;
                    border-radius: 10px;
                    box-shadow: 0px 0px 11px 3px rgba(39, 39, 39, 0.35), 0px 5px 9px 6px rgba(255, 255, 255, 0.5);

                    &.is-active {
                        display: flex;
                        flex-direction: row;
                        justify-content: space-around;
                        align-items: center;

                        a[href] {
                            display: flex;
                            flex-direction: column;
                            font-size: 12px;

                            & i {
                                margin-left: 5px;
                            }

                            & span {
                                margin-top: 5px;
                            }

                            @media only screen and (max-width: $screen-sm-min) {

                                & i {
                                    margin-left: 0;
                                }

                                & span {
                                    display: none;
                                }
                            }


                        }
                    }
                }
            }
        }

        &__options {
            display: flex;
            flex-direction: row;
            align-items: center;

            a[href] {
                padding: 10px 5px 5px 5px;
                font-size: 12px;

                &.isActive {
                    color: #409EFF;
                    border-bottom: 2px solid #409EFF;
                }

                & span {
                    margin-left: 5px;
                }
            }

            .toggle-user-menu {
                display: flex;
                flex-direction: row;
                justify-content: center;
                align-items: center;
                padding-right: 10px;
                cursor: pointer;

                @media only screen and (max-width: $screen-sm-min) {
                    & .el-avatar {
                        width: 30px;
                        height: 30px;
                        background: transparent;
                    }
                }

                @media only screen and (min-width: $screen-sm-min) {
                    & .el-avatar {
                        width: 40px;
                        height: 40px;
                        background: transparent;
                    }
                }

                & i {
                    margin-left: 5px;
                    color: #606266;
                }
            }

            .user-details-menu {
                display: none;
                position: absolute;
                top: 65px;
                right: 10px;
                width: 200px;
                padding: 10px 15px;
                background: #ffffff;
                border: 1px solid #9093997a;
                border-radius: 10px;
                box-shadow: 0px 0px 11px 3px rgba(39, 39, 39, 0.35), 0px 5px 9px 6px rgba(255, 255, 255, 0.5);

                &.is-active {
                    display: flex;
                    flex-direction: column;
                }

                .user-auth-detail {
                    font-size: 12px;
                    padding-bottom: 10px;
                    border-bottom: 1px solid #9093997a;

                    & span:first-child {
                        text-align: left;
                    }

                    & span:last-child {
                        display: block;
                        margin-top: 5px;
                        text-align: center;
                        font-weight: 500;
                    }
                }

                & > a[href] {
                    padding-top: 10px;
                    padding-bottom: 10px;
                    border-bottom: 1px solid #9093997a;
                    font-size: 12px;

                    &.isActive {
                        color: #409EFF;
                    }

                    & > span {
                        margin-left: 5px;
                    }
                }

                .btn-logout {
                    margin-top: 5px;
                    margin-left: 5px;
                    font-size: 12px;
                    font-weight: 600;
                    color: #F56C6C;
                    border: unset!important;
                    border: 1px solid rgba(96, 98, 102, 0.98);

                    &:hover {
                        color: #ffffff;
                        border: unset;
                        background: #F56C6C;
                    }

                    &.el-button--mini {
                        padding: 5px 7px;
                    }
                }
            }
        }
    }
</style>