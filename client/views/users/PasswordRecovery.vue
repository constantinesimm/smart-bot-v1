<template>
    <transition name="el-zoom-in-center">
        <div class="pass-recovery__container">
            <div class="card">
                <div class="card__header">
                    <div class="card__header-logo">
                        <el-avatar shape="circle" fit="fill" src="/img/logo/app_logo.png" />
                    </div>
                    <div class="card__header-title">
                        Создать новый пароль
                    </div>
                </div>
                <div class="card__body">
                    <el-form :model="passwordRecoveryForm" :rules="rules" ref="passwordRecoveryForm" size="mini">
                        <el-form-item label="Пользователь" prop="email">
                            <el-input v-model="passwordRecoveryForm.email" size="mini" disabled readonly />
                        </el-form-item>

                        <el-form-item  @keypress.enter.native="submitForm" label="Новый пароль" prop="secret">
                            <el-input v-model="passwordRecoveryForm.secret" show-password size="mini" placeholder="Введите новый пароль" auto-complete="off"/>
                        </el-form-item>

                        <el-form-item  @keypress.enter.native="submitForm" label="Подтвердить пароль" prop="secretConfirm">
                            <el-input v-model="passwordRecoveryForm.secretConfirm" show-password size="mini" placeholder="Подтвердите пароль" auto-complete="off"/>
                        </el-form-item>

                        <el-form-item>
                            <el-button @click="submitForm" :loading="this.isSubmitLoading" type="success" size="mini" round plain>
                                Обновить пароль
                            </el-button>
                        </el-form-item>
                    </el-form>
                </div>
                <el-divider></el-divider>
                <div class="card__footer">
                    <div class="card__footer-item">
                        <router-link to="/auth/login" class="el-link el-link--default">Страница авторизации</router-link>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
    import authClient from '../../plugins/http-client/auth';
    import usersClient from '../../plugins/http-client/users';
    import validateRules from '../../plugins/validator/rules';

	export default {
		name: 'PasswordRecovery',
		data() {
			const comparePasswordsRule = (rule, value, callback) => {
				return value === this.passwordRecoveryForm.secret ? callback() : callback('Пароли не совпадают')
			};

			return {
				rules: {
					secret: validateRules.secret,
					secretConfirm: [
						{ required: true, message: 'Введите подтверждение пароля' },
						{ validator: comparePasswordsRule }
					],
				},
				passwordRecoveryForm: {
					email: '',
					secret: '',
					secretConfirm: ''
				},
				isSubmitLoading: false,
				isFormLoading: true,
			}
		},
        created() {
            authClient.checkToken('service', { token: this.$route.params.serviceToken })
                .then(response => {
                    this.passwordRecoveryForm.email = response.user.email;
                    this.isFormLoading = false;
                })
                .catch(error => {
                    this.$notify.error(error.message);
                    this.$router.push('/auth/login');
                })
        },
		methods: {
			submitForm() {
				this.$refs.passwordRecoveryForm.validate(valid => {
					if (valid) {
						this.isSubmitLoading = true;

						usersClient.passwordRecoveryComplete(this.passwordRecoveryForm)
                            .then(response => {
                                this.$message.success(response.message);

                                this.$router.push('/auth/login');
                            })
                            .catch(error => this.$message.error(error.message))
                            .finally(() => this.isSubmitLoading = false)
					} else return false;
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
    .pass-recovery__container {
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

                    .el-form-item:first-child {
                        margin-bottom: 10px;
                    }

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