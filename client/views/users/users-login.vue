<template>
    <transition name="el-zoom-in-center">
        <el-row type="flex" justify="center">
            <el-col :span="24">
                <el-form :model="loginForm" :rules="rules" ref="loginForm" size="small">
                    <el-form-item class="el-form-item__header">
                        <img class="el-form-item__logo" src="/img/logo/rice_logo.png"/>
                    </el-form-item>

                    <el-divider class="el-form-item__top-divider"/>

                    <el-form-item label="E-mail" prop="email" @keypress.enter.native="submitForm">

                        <el-input v-model="loginForm.email" placeholder="Пример: example@gmail.com"/>

                    </el-form-item>

                    <el-form-item label="Пароль" prop="secret" @keypress.enter.native="submitForm">

                        <el-input v-model="loginForm.secret"  placeholder="Пример: Example1" show-password/>

                    </el-form-item>

                    <el-form-item class="el-form-item__submit">
                        <el-button @click="submitForm" :loading="this.isSubmitLoading" icon="fas fa-sign-in-alt" type="primary" size="medium" plain>
                            Авторизация
                        </el-button>
                    </el-form-item>

                    <el-divider class="el-form-item__bottom-divider"/>

                    <el-form-item class="el-form-item__footer">
                        <el-button @click="openPasswordRestore" icon="far fa-life-ring" type="text" size="medium">
                            Забыл пароль?
                        </el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
    </transition>
</template>

<script>
    import validateRules from '../../plugins/validator/rules';
    import authClient from '../../plugins/http-client/auth';

    export default {
        name: "users-login",
        data() {
            return {
                //form fields validate rules
                rules: {
                    email: validateRules.email,
                    secret: validateRules.secret
                },
                //form fields values and action props
                loginForm: {
                    email: '',
                    secret: ''
                },
	            isSubmitLoading: false
            }
        },
        methods: {
            //form submit action by click and enter keypress
            submitForm() {
                this.$refs.loginForm.validate(valid => {
                	if (valid) {
		                this.isSubmitLoading = true;

		                this.$store.dispatch('auth/login', this.loginForm)
			                .then(response => {
				                this.$message.success(`Приветствую, ${ response.user.firstName }!`);
				                this.$router.push('/dashboard');
			                })
			                .catch(error => this.$message.error(error.message))
			                .finally(() => this.isSubmitLoading = false);
                    } else return false;
                });
            },
            openPasswordRestore() {
                this.$prompt('Введите ваш e-mail', 'Забыл пароль?', {
                    confirmButtonText: 'Восстановить',
                    cancelButtonText: 'Отменить',
                    inputPattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    inputErrorMessage: 'Некорректный формат поля "E-mail"'
                })
                    .then(({ value }) => this.$store.dispatch('auth/password_restore', { 'email': value }))
                    .then(response => this.$notify.success(response.message))
                    .catch(error => {
	                    this.$notify.error(error.message);
	                    setTimeout(() => this.openPasswordRestore(), 2000)
                    });
            }
        }
    }
</script>

<style lang="scss" scoped>

    .el-form {
        padding: 15px 25px;
        border-radius: 15px;
        box-shadow: 0 -5px 25px 0 rgba(0, 0, 0, 0.1), 0 5px 25px 0 rgba(0, 0, 0, 0.1);

        .el-form-item__header {
            display: flex;
            justify-content: center;
            margin-bottom: 0;
            padding-top: 10px;
        }

        .el-form-item__submit {
            display: flex;
            justify-content: center;
            margin-top: 35px;

            .el-button {
                min-width: 125px;
            }
        }

        .el-form-item__footer {
            display: flex;
            justify-content: center;
            margin-bottom: 0;
        }

        .el-form-item__top-divider {
            margin: 10px 0 25px 0;
        }
        .el-form-item__bottom-divider {
            margin: 25px 0 5px 0;
        }
    }

    @media screen and (max-width: 500px) {
        .el-col {
            width: 100%!important;
        }
    }

    @media screen and (min-width: 501px) and (max-width: 767px) {
        .el-row {
            height: 100%;

            .el-col {
                width: 75%!important;
                margin: auto;
            }
        }
    }

    @media screen and (min-width: 768px) and (max-width: 991px) {
        .el-row {
            height: 100%;

            .el-col {
                width: 50%!important;
                margin: auto;
            }
        }
    }

    @media screen and (min-width: 992px) and (max-width: 1199px) {
        .el-row {
            height: 100%;

            .el-col {
                width: 33%!important;
                margin: auto;
            }
        }
    }

    @media screen and (min-width: 1200px) {
        .el-row {
            height: 100%;

            .el-col {
                width: 25%!important;
                margin: auto;
            }
        }
    }
</style>