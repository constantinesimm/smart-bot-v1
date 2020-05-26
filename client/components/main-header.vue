<template>
    <el-header>
        <el-col class="header-logo-container">
            <el-link :underline="false" class="header-logo-link" href="/dashboard">
                <img class="header-logo-img" src="/img/logo/rice_logo.png"/>
                <span class="header-logo-text">Rice food</span>
            </el-link>
        </el-col>
        <el-col>
            <el-link :underline="false" href="/users/account">
                <el-button type="primary" size="mini" icon="fas fa-user-circle" plain>Аккаут</el-button>
            </el-link>
            <el-button @click="signOut" type="primary" size="mini" icon="fas fa-power-off" plain>Выход</el-button>
        </el-col>
    </el-header>
</template>

<script>
	export default {
		name: 'main-header',
		methods: {
			signOut() {
				this.$store.dispatch('auth/logout')
					.then(response => this.$message.success(response))
					.catch(error => console.log(error))
                    .finally(() => this.$router.push('/users/login'));
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