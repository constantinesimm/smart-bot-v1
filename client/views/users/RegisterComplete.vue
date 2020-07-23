<template>
    <transition name="el-zoom-in-center">
        <div class="user-register__container">
            <div class="card">
                <div class="card__header">
                    <div class="card__header-logo">
                        <el-avatar shape="circle" fit="fill" src="/img/logo/app_logo.png" />
                    </div>
                    <div class="card__header-title">
                        Регистрация
                    </div>
                </div>
                <div class="card__body">
                    <el-form :model="registerForm" :rules="rules" ref="registerForm" size="mini">
                        <el-row>
                            <el-col :span="23">
                                <el-form-item label="Пользователь" prop="email">
                                    <el-input v-model="registerForm.email" size="mini" disabled readonly />
                                </el-form-item>
                            </el-col>
                        </el-row>

                        <el-row>
                            <el-col :span="11" :xs="23">
                                <el-form-item label="Имя" prop="firstName" @keypress.enter.native="submitForm">
                                    <el-input v-model="registerForm.firstName" maxlength="20" show-word-limit placeholder="Пример: Василий" />
                                </el-form-item>
                            </el-col>
                            <el-col :span="11" :xs="23">
                                <el-form-item label="Фамилия" prop="lastName" @keypress.enter.native="submitForm">
                                    <el-input v-model="registerForm.lastName" maxlength="20" show-word-limit placeholder="Пример: Васильев" />
                                </el-form-item>
                            </el-col>
                        </el-row>

                        <el-row>
                            <el-col :span="11" :xs="23">
                                <el-form-item label="Пол" prop="gender">

                                    <el-select v-model="registerForm.gender" placeholder="Пол">
                                        <el-option label="Мужчина" value="male"/>
                                        <el-option label="Женщина" value="female"/>
                                    </el-select>

                                </el-form-item>
                            </el-col>
                            <el-col :span="11" :xs="23">
                                <el-form-item label="Телефон" prop="phoneNumber" @keypress.enter.native="submitForm">
                                    <el-input v-model="registerForm.phoneNumber" v-mask="'+99 (999) 999 99 99'" placeholder="Пример: 380671112233" />
                                </el-form-item>
                            </el-col>
                        </el-row>

                        <el-row>
                            <el-col :span="11" :xs="23">
                                <el-form-item  @keypress.enter.native="submitForm" label="Пароль" prop="secret">
                                    <el-input v-model="registerForm.secret" show-password size="mini" placeholder="Введите новый пароль" auto-complete="off"/>
                                </el-form-item>
                            </el-col>
                            <el-col :span="11" :xs="23">
                                <el-form-item  @keypress.enter.native="submitForm" label="Подтвердить пароль" prop="secretConfirm">
                                    <el-input v-model="registerForm.secretConfirm" show-password size="mini" placeholder="Подтвердите пароль" auto-complete="off"/>
                                </el-form-item>
                            </el-col>
                        </el-row>

                        <el-row type="flex" justify="center" align="middle">
                            <el-col :span="24">
                                <el-form-item>
                                    <el-button @click="submitForm" :loading="this.isSubmitLoading" type="success" size="mini" round plain>
                                        Завершить регистрацию
                                    </el-button>
                                </el-form-item>
                            </el-col>
                        </el-row>
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
		name: 'RegisterComplete',
		data() {
			const comparePasswordsRule = (rule, value, callback) => {
				return value === this.registerForm.secret ? callback() : callback('Пароль и подтверждение пароля не совпадают')
			};
			return {
				rules: {
					firstName: validateRules.firstName,
					lastName: validateRules.lastName,
					gender: validateRules.gender,
					phoneNumber: validateRules.phoneNumber,
					secret: validateRules.secret,
					secretConfirm: [
						{ required: true, message: 'Введите подтверждение пароля' },
						{ validator: comparePasswordsRule }
					],
				},
				registerForm: {
					userId: '',
					email: '',
					firstName: '',
					lastName: '',
					gender: '',
					phoneNumber: '',
					secret: '',
					secretConfirm: ''
				},
				isSubmitLoading: false,
				isFormLoading: true
			}
		},
        created() {
            authClient.checkToken('service', { token: this.$route.params.serviceToken })
                .then(response => {
                    this.registerForm.userId = response.user.userId;
                    this.registerForm.email = response.user.email;
                    this.isFormLoading = false;
                })
                .catch(error => {
                    this.$message.error(error.message);
                    this.$router.push('/auth/login');
                })
        },
		methods: {
			submitForm() {
				this.$refs.registerForm.validate(valid => {
					if (valid) {
						this.isSubmitLoading = true;

                        usersClient.registerComplete(this.registerForm)
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
    $screen-md-min: 768px;

    .user-register__container {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        height: 100%;

        @media only screen and (max-width: $screen-md-min) {
            & .card {
                width: 350px;
            }
        }

        @media only screen and (min-width: $screen-md-min) {
            & .card {
                width: 500px;
            }
        }

        & .card {
            min-width: 300px;
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

                    .el-row:first-child {
                        .el-col {
                            .el-form-item {
                                margin-bottom: 10px;
                            }
                        }
                    }

                    .el-row:last-child {
                        margin-top: 20px;

                        .el-col {
                            .el-form-item {
                                display: flex;
                                flex-direction: row;
                                justify-content: center;
                            }
                        }
                    }

                    @media only screen and (max-width: $screen-md-min) {
                        & .el-row {
                            display: flex;
                            flex-direction: column;
                            justify-content: space-between;
                            align-items: center;
                        }
                    }

                    @media only screen and (min-width: $screen-md-min) {
                        & .el-row {
                            display: flex;
                            flex-direction: row;
                            justify-content: space-between;
                            align-items: center;
                        }
                    }

                    .el-row {
                        .el-col {
                            .el-form-item {
                                .el-select {
                                    width: 100%;
                                }
                            }
                        }
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