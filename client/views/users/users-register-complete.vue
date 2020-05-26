<template>
    <el-row type="flex" justify="center" class="el-page-row">
        <el-col :span="24">
            <transition name="el-zoom-in-center">
                <el-form v-show="!this.isFormLoading" :model="registerForm" :rules="rules"
                         :loading="this.isFormLoading" ref="registerForm" size="small">
                    <el-form-item class="el-form-item__header">
                        <img class="el-form-item__logo" src="/img/logo/rice_logo.png"/>
                    </el-form-item>

                    <el-divider class="el-form-item__top-divider"/>

                    <div>
                        <el-row class="el-form-group__row">
                            <el-col :span="6">
                                <el-form-item label="User ID" prop="userId">
                                    <el-input v-model="registerForm.userId" v-on:input="submitForm" :disabled="true" readonly/>
                                </el-form-item>
                            </el-col>
                            <el-col :span="16">
                                <el-form-item label="Email" prop="email">
                                    <el-input v-model="registerForm.email" v-on:input="submitForm" :disabled="true" readonly/>
                                </el-form-item>
                            </el-col>
                        </el-row>

                        <el-row class="el-form-group__row">
                            <el-col :span="11">
                                <el-form-item label="Имя" prop="firstName" @keypress.enter.native="submitForm">

                                    <el-input v-model="registerForm.firstName" maxlength="20" show-word-limit placeholder="Пример: Василий"
                                              v-on:input="validateFieldOnInput('registerForm', 'formFieldsValid', 'firstName')"/>

                                </el-form-item>
                            </el-col>
                            <el-col :span="11">
                                <el-form-item label="Фамилия" prop="lastName" @keypress.enter.native="submitForm">

                                    <el-input v-model="registerForm.lastName" maxlength="20" show-word-limit placeholder="Пример: Васильев"
                                              v-on:input="validateFieldOnInput('registerForm', 'formFieldsValid', 'lastName')" />

                                </el-form-item>
                            </el-col>
                        </el-row>

                        <el-row class="el-form-group__row">
                            <el-col :span="8">
                                <el-form-item label="Пол" prop="gender">

                                    <el-select v-model="registerForm.gender" placeholder="Пол"
                                               v-on:visible-change="validateFieldOnInput('registerForm', 'formFieldsValid', 'gender')">
                                        <el-option label="Мужчина" value="male"/>
                                        <el-option label="Женщина" value="female"/>
                                    </el-select>

                                </el-form-item>
                            </el-col>
                            <el-col :span="14">
                                <el-form-item label="Телефон" prop="phoneNumber" @keypress.enter.native="submitForm">
                                    <el-input v-model="registerForm.phoneNumber" v-mask="'+99 (999) 999 99 99'" placeholder="Пример: 380671112233"
                                              v-on:input="validateFieldOnInput('registerForm', 'formFieldsValid', 'phoneNumber')"/>
                                </el-form-item>
                            </el-col>
                        </el-row>

                        <el-row class="el-form-group__row">
                            <el-col :span="11">
                                <el-form-item label="Пароль" prop="secret" @keypress.enter.native="submitForm">

                                    <el-input v-model="registerForm.secret" show-password placeholder="Пример: Example1"
                                              v-on:input="validateFieldOnInput('registerForm', 'formFieldsValid', 'secret')" />

                                </el-form-item>
                            </el-col>
                            <el-col :span="11">
                                <el-form-item label="Подтвердить" prop="secretConfirm" @keypress.enter.native="submitForm">

                                    <el-input v-model="registerForm.secretConfirm" show-password placeholder="Пример: Example1"
                                              v-on:input="validateFieldOnInput('registerForm','formFieldsValid', 'secretConfirm')"/>

                                </el-form-item>
                            </el-col>
                        </el-row>

                        <el-form-item class="el-form-item__submit">
                            <el-button v-on:click="submitForm" :loading="this.isSubmitLoading" :disabled="!this.checkFormFields" type="primary" size="medium" plain>
                                <i class="fas fa-user-check" v-if="!this.isSubmitLoading"></i>
                                Регистрация
                            </el-button>
                        </el-form-item>

                    </div>

                    <el-divider class="el-form-item__bottom-divider"/>

                    <el-form-item class="el-form-item__footer">
                        <el-link href="/users/login" size="medium">
                            <i class="fas fa-sign-in-alt"></i>
                            Страница авторизации
                        </el-link>
                    </el-form-item>
                </el-form>
            </transition>
        </el-col>
    </el-row>
</template>

<script>
    import validateRules from '../../plugins/validator/rules';
    import authClient from '../../plugins/http-client/auth';

    export default {
        name: "users-register-complete",
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
                formFieldsValid: {
                    firstName: false,
                    lastName: false,
                    gender: false,
                    phoneNumber: false,
                    secret: false,
                    secretConfirm: false
                },
                isSubmitLoading: false,
                isFormLoading: true,
                errorMessage: ''
            }
        },
        created() {
            authClient.checkToken('service', { token: this.$route.params.token })
	            .then(response => {
		            this.registerForm.userId = response.user.userId;
		            this.registerForm.email = response.user.email;
		            this.isFormLoading = false;
	            })
	            .catch(error => {
		            this.$message.error(error.message);
		            this.$router.push('/users/login');
	            })
        },
        computed: {
            checkFormFields: function () {
                return Object.keys(this.formFieldsValid).every(key => !!this.formFieldsValid[key])
            }
        },
        methods: {
            validateFieldOnInput(refKey, field, prop) {
                return this.$refs[refKey].validateField(prop, errorMessage => this[field][prop] = !errorMessage.length)
            },
            submitForm() {
                if (!this.checkFormFields) return this.$refs.registerForm.validate(valid => valid);
                else {
                    this.isSubmitLoading = true;

                    authClient.registerComplete(this.registerForm)
                        .then(response => {
	                        console.log(response)
	                        this.$message.success(response);

	                        this.$router.push('/users/login');
                        })
                        .catch(error => {
	                        console.log(error)
	                        this.$message.error(error.message)
                        })
                        .finally(() => this.isSubmitLoading = false)
                }
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

        .el-form-group__row {
            display: flex;
            justify-content: space-between;
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
        .el-page-row {
            & > .el-col {
                width: 100%!important;
            }
        }

    }

    @media screen and (min-width: 501px) and (max-width: 767px) {
        .el-page-row {
            height: 100%;

            & > .el-col {
                width: 75%!important;
                margin: auto;
            }
        }
    }

    @media screen and (min-width: 768px) and (max-width: 991px) {
        .el-page-row {
            height: 100%;

            & > .el-col {
                width: 50%!important;
                margin: auto;
            }
        }
    }

    @media screen and (min-width: 992px) and (max-width: 1199px) {
        .el-page-row {
            height: 100%;

            &>.el-col {
                width: 33%!important;
                margin: auto;
            }
        }
    }

    @media screen and (min-width: 1200px)  and (max-width: 1399px) {
        .el-page-row {
            height: 100%;

            &>.el-col {
                width: 33%!important;
                margin: auto;
            }
        }
    }
    @media screen and (min-width: 1400px) {
        .el-page-row {
            height: 100%;

            &>.el-col {
                width: 25%!important;
                margin: auto;
            }
        }
    }
</style>