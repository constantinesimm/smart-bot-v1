<template>
    <el-header>
        <el-col class="header-logo-container">
            <el-link :underline="false" class="header-logo-link" href="/dashboard">
                <!--
                <img class="header-logo-img" src="/img/logo/rice_logo.png"/>
                -->
                <img class="header-logo-img" src="/img/logo/background-logotype.png"/>
            </el-link>
        </el-col>
        <el-col>
            <el-link :underline="false" href="/users/profile">
                <i class="fas fa-user-circle"></i> Профиль
            </el-link>
            <el-button type="text" @click="signOut">
                <i class="fas fa-power-off"></i> Выход
            </el-button>
        </el-col>
    </el-header>
</template>

<script>
	export default {
		name: 'main-header',
		methods: {
			signOut() {
				this.$store.dispatch('auth/logout', { userId: this.$store.getters['auth/currentUser']._id})
					.then(response => {
						this.$message.success(response);
						this.$router.push('/users/login');
					})
					.catch(error => console.log(error.message));
			}
		}
	}
</script>

<style lang="scss" scoped>
    .el-header {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        height: 55px!important;
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
                text-decoration: none!important;
                padding: 5px;
                border-radius: 5px;

                &:hover {
                    background: #e6e6e680;
                }

                .header-logo-img {
                    height: 55px;
                    width: 250px!important;

                    &:hover {
                        opacity: .8;
                    }
                }
            }
        }
        .el-col:nth-child(2) {
            display: flex;
            justify-content: flex-end;
            align-items: center;
            padding: 0 15px;

            .el-button {
                font-size: 14px;
                margin: 0 5px
            }
        }
    }

    .el-dropdown-link {
        cursor: pointer;
    }
</style>