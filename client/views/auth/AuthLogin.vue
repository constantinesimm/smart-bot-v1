<template>
    <transition name="el-zoom-in-center">
        <div class="auth-form__container">
            <div class="card">
                <div class="card__header">
                    <div class="card__header-logo">
                        <el-avatar shape="circle" fit="fill" src="/img/logo/app_logo.png" />
                    </div>
                    <div class="card__header-title">
                        Авторизация
                    </div>
                </div>
                <div class="card__body">
                    <el-form :model="loginForm" :rules="rules" ref="loginForm" size="mini">
                        <el-form-item  @keypress.enter.native="submitForm" label="Эл. почта" prop="email">
                            <el-input v-model="loginForm.email" size="mini" placeholder="Введите ваш email" />
                        </el-form-item>

                        <el-form-item  @keypress.enter.native="submitForm" label="Пароль" prop="secret">
                            <el-input v-model="loginForm.secret" show-password size="mini" placeholder="Введите ваш пароль" />
                        </el-form-item>

                        <el-form-item>
                            <el-button @click="submitForm" :loading="this.isSubmitLoading" type="primary" size="mini" round plain>
                                Авторизация
                            </el-button>
                        </el-form-item>
                    </el-form>
                </div>
                <el-divider></el-divider>
                <div class="card__footer">
                    <div class="card__footer-item">
                        <el-button @click="resetPasswordModal" type="text" size="mini" icon="far fa-life-ring">
                            Забыли пароль?
                        </el-button>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
    import validateRules from '../../plugins/validator/rules';
    import { MessageBox } from 'element-ui';
	export default {
		name: "AuthLogin",
        data() {
			return {
                rules: {
                	email: validateRules.email,
                    secret: validateRules.secret
                },
				loginForm: {
					email: '',
                    secret: ''
                },
                isSubmitLoading: false
            }
        },
        methods: {
	        submitForm() {
		        this.$refs.loginForm.validate(valid => {
			        if (valid) {
				        this.isSubmitLoading = true;
				        this.$store.dispatch('auth/login', this.loginForm)
					        .then(response => {
						        this.$message.success(`Приветствую, ${ response.user.firstName }!`);
						        this.$router.push('/dashboard');
					        })
					        .catch(error => this.$message.error(error.response.data.message))
					        .finally(() => this.isSubmitLoading = false);
			        } else return false;
		        });
	        },
            resetPasswordModal() {
	        	this.$prompt('Укажите свой Email и мы пришлем вам новый пароль', 'Форма восстановления пароля', {
	        		confirmButtonText: 'Отправить',
                    cancelButtonText: 'Отмена',
                    inputPattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
			        inputErrorMessage: 'Некорректный формат электронной почты'
                })
                .then(({ value }) => this.$store.dispatch('auth/password_restore', { 'email': value }))
                .then(response => this.$notify.success(response.message))
                .catch(error => {
                	this.$notify.error(error.message);
                	setTimeout(() => this.resetPasswordModal(), 2000)
                });
            }
        }
	}
</script>

<style lang="scss" scoped>
    .auth-form__container {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        height: 100%;

        & .card {
            min-width: 300px;
            max-width: 350px;
            border-radius: 10px;
            background: #ffffff;
            box-shadow: 0 0.46875rem 4rem 2px rgba(90, 97, 105, 0.22), 0 0.9375rem 2rem 0px rgba(90, 97, 105, 0.25), 0 0.25rem 0.53125rem 4px rgba(90, 97, 105, 0.28), 0 0.125rem 0.1875rem 1px rgba(90, 97, 105, 0.18);

            &__header {
                display: flex;
                flex-direction: column;
                align-content: center;
                padding: 25px 0 10px 0;
                border-top-right-radius: 11px;
                border-top-left-radius: 11px;
                border-bottom: unset;
                box-shadow: inset 0 4px 0 0 #007bff;

                &-logo {
                    display: flex;
                    flex-direction: row;
                    justify-content: center;
                    padding-bottom: 10px;

                    & .el-avatar {
                        background: transparent;
                    }
                }

                &-title {
                    display: flex;
                    flex-direction: row;
                    justify-content: center;
                    font-size: 20px;
                    font-weight: 500;
                }
            }

            &__body {
                display: flex;
                flex-direction: column;
                align-content: center;
                padding: 15px 25px 15px;

                & .el-form {
                    margin-top: 5px;

                    .el-form-item:last-child {
                        display: flex;
                        flex-direction: row;
                        justify-content: center;
                        padding: 25px 0 10px;
                        margin-bottom: 0;
                    }
                }
            }

            & .el-divider {
                margin: 0;
            }

            &__footer {
                padding: 15px 0;
                border-bottom-right-radius: 10px;
                border-bottom-left-radius: 10px;

                &-item {
                    display: flex;
                    flex-direction: row;
                    justify-content: center;
                }
            }
        }
    }
</style>