<template>
    <el-row>
        <el-col class="header-logo-container" :xs="24" :sm="24">
            <el-link :underline="false" class="header-logo-link" href="/dashboard">
                <img class="header-logo-img" src="/img/logo/rice_logo.png"/>
                <span class="header-logo-text">Rice food</span>
            </el-link>
        </el-col>
        <el-col>
            <el-button @click="pushUserAccountPage" :class="userAccountActiveLink ? 'user-account__active-link' : 'user-account__btn-link'" type="text" size="mini" icon="fas fa-user-cog"> Настройки аккаута</el-button>
            <el-button @click="signOut" type="danger" size="mini" icon="fas fa-power-off" plain> Выход</el-button>
        </el-col>
    </el-row>
</template>

<script>
	export default {
		name: 'main-header',
        data() {
			return {
                userAccountActiveLink: false
            }
        },
        mounted() {
	        this.userAccountActiveLink = this.$route.path === '/users/account';
        },
		methods: {
			pushUserAccountPage() {
				this.$router.push('/users/account');
            },
			signOut() {
				this.$store.dispatch('auth/logout')
					.then(response => this.$message.success(response))
					.catch(error => this.$message.error(error.message))
                    .finally(() => this.$router.push('/users/login'));
			}
		}
	}
</script>

<style lang="scss" scoped>
    .el-row {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        padding: 0;
        background-color: #FAFBF8;
        box-shadow: 0 4px 8px 0 rgba(0,0,0,.12), 0 2px 4px 0 rgba(0,0,0,.08);

        .el-col:nth-child(1) {
            display: flex;
            justify-content: center;
            width: 250px;

            .header-logo-container {
                width: 250px!important;
            }
            .header-logo-link {
                display: flex;
                justify-content: center;
                align-content: center;
                align-items: center;
                padding: 5px;
                width: 250px;
                color: #fc3404;
                font: 500 36px 'Ubuntu', sans-serif;
                text-decoration: none!important;
                border-radius: 5px;

                &:hover {
                    background: #fc34041c;
                }

                .header-logo-img {
                    height: 40px;

                    &:hover {
                        opacity: .8;
                    }
                }

                .header-logo-text {
                    padding-left: 5px;

                }
            }
        }
        .el-col:nth-child(2) {
            display: flex;
            justify-content: flex-end;
            align-items: center;
            padding: 0 15px;

            .user-account__btn-link {
                color: #909399;

                &:hover {
                    color: #409EFF;
                }
            }

            .user-account__active-link {
                color: #409EFF;
            }

            .el-button {
                font-size: 14px;
                margin: 0 5px
            }
        }
    }

    .el-dropdown-link {
        cursor: pointer;
    }

    .el-menu--horizontal > .el-submenu .el-submenu__title {
        height: 45px!important;
    }
</style>