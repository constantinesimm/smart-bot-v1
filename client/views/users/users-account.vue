<template>
    <div class="el-card user-profile__container">
        <div class="el-card__header user-profile__header">
            <el-page-header @back="goBack" title="На главную" content="Аккаунт"></el-page-header>
        </div>
        <div class="el-card__body user-profile__body">
            <transition name="el-zoom-in-center">
                <div class="el-card user-profile__form is-always-shadow">
                <div class="el-card__header user-profile__form-header">
                    <span>Информация пользователя</span>

                    <el-button v-if="!this.isFormEdit" @click="formEdit" class="user-profile__edit" type="primary" size="mini" icon="far fa-edit fa-lg" plain>
                        Изменить
                    </el-button>
                    <div v-else>
                        <el-button @click="cancelFormEdit" class="user-profile__edit" type="danger" size="mini" icon="fas fa-ban fa-lg" plain>
                            Отменить
                        </el-button>
                        <el-button @click="submitForm" :loading="isSubmitLoading" class="user-profile__submit" type="success" size="mini" icon="far fa-save fa-lg" plain>
                            Сохранить
                        </el-button>
                    </div>

                </div>
                <div class="el-card__body user-profile__form-body">
                    <el-form v-show="!this.isFormLoading" :model="userAccountForm" :rules="rules" :loading="this.isFormLoading" ref="userAccountForm" size="small">
                        <el-row>
                            <span class="row-label">Приложение</span>
                            <el-col :span="7">
                                <span class="input-label">user ID</span>
                                <el-form-item>
                                    <el-input v-model="this.$store.getters['auth/currentUser'].userId" disabled readonly />
                                </el-form-item>
                            </el-col>
                            <el-col :span="7">
                                <span class="input-label">Дата регистрации</span>
                                <el-form-item>
                                    <el-input v-model="userRegisterDate" disabled readonly />
                                </el-form-item>
                            </el-col>
                            <el-col :span="7">
                                <span class="input-label">Уровень прав</span>
                                <el-form-item>
                                    <el-input v-model="this.$store.getters['auth/currentUser'].role === 'super' ? 'Супер админ' : this.$store.getters['auth/currentUser'].role === 'admin' ? 'Администратор' : 'Менеджер'" disabled readonly />
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <span class="row-label">Информация</span>
                            <el-col :span="11" >
                                <span class="input-label">Имя</span>
                                <el-form-item v-if="this.isFormEdit" prop="firstName" @keypress.enter.native="submitForm">

                                    <el-input v-model="userAccountForm.firstName" maxlength="20" show-word-limit placeholder="Пример: Василий"
                                              v-on:input="validateFieldOnInput('userAccountForm', 'formFieldsValid', 'firstName')"/>

                                </el-form-item>
                                <el-tag v-else type="info">
                                    {{ this.userForm.firstName }}
                                </el-tag>
                            </el-col>
                            <el-col :span="11">
                                <span class="input-label">Фамилия</span>
                                <el-form-item v-if="this.isFormEdit" prop="lastName" @keypress.enter.native="submitForm">

                                    <el-input v-model="userAccountForm.lastName" maxlength="20" show-word-limit placeholder="Пример: Васильев"
                                              v-on:input="validateFieldOnInput('userAccountForm', 'formFieldsValid', 'lastName')" />

                                </el-form-item>
                                <el-tag v-else type="info">
                                    {{ this.userForm.lastName }}
                                </el-tag>
                            </el-col>
                        </el-row>
                        <el-row>
                            <span class="row-label">Контакты</span>
                            <el-col :span="11">
                                <span class="input-label">Email</span>
                                <el-form-item>
                                    <el-input v-model="this.$store.getters['auth/currentUser'].email" disabled readonly />
                                </el-form-item>
                            </el-col>
                            <el-col :span="11">
                                <span class="input-label">Номер телефона</span>
                                <el-form-item v-if="this.isFormEdit" prop="phoneNumber" @keypress.enter.native="submitForm">
                                    <el-input v-model="userAccountForm.phoneNumber" v-mask="'+99 (999) 999 99 99'" placeholder="Пример: 380671112233"
                                              v-on:input="validateFieldOnInput('userAccountForm', 'formFieldsValid', 'phoneNumber')"/>
                                </el-form-item>
                                <el-tag v-else type="info">
                                    {{ this.userForm.phoneNumber }}
                                </el-tag>
                            </el-col>
                        </el-row>

                    </el-form>
                </div>
            </div>
            </transition>
        </div>
    </div>
</template>

<script>
    import copy from '../../utils/clipboard';
    import validateRules from '../../plugins/validator/rules';
    import usersClient from '../../plugins/http-client/users';
    import contentFormat from '../../utils/content-format';
    export default {
        name: "users-account",
        data() {
        	return {
		        rules: {
			        firstName: validateRules.firstName,
			        lastName: validateRules.lastName,
			        phoneNumber: validateRules.phoneNumber,
		        },
                isFormEdit: false,

                userForm: {},

                userRegisterDate: new Date( parseInt( this.$store.getters['auth/currentUser']._id.substring(0,8), 16 ) * 1000 ).toLocaleDateString(),
                userAccountForm: {
	                firstName: '',
	                lastName: '',
	                phoneNumber: '',

                },
                formFieldsValid: {
                    firstName: false,
                    lastName: false,
                    phoneNumber: false
                },
		        isSubmitLoading: false,
		        isFormLoading: false,
            }
        },
        created() {
	        let formattedPhone = contentFormat.phone(this.$store.getters['auth/currentUser'].phoneNumber);

	        this.userForm = {
		        firstName: this.$store.getters['auth/currentUser'].firstName,
		        lastName: this.$store.getters['auth/currentUser'].lastName,
		        phoneNumber: formattedPhone
            }
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
            cancelFormEdit() {
	            this.isFormEdit = !this.isFormEdit;

	            this.userAccountForm = {
		            firstName: '',
		            lastName: '',
		            phoneNumber: ''
                };
            },
            formEdit() {
	            this.isFormEdit = !this.isFormEdit;

	            let formattedPhone = contentFormat.phone(this.$store.getters['auth/currentUser'].phoneNumber);

	            this.userAccountForm = {
		            firstName: this.userForm.firstName,
		            lastName: this.userForm.lastName,
		            phoneNumber: formattedPhone,
	            };
            },
            submitForm() {
	            this.$refs.userAccountForm.validate(valid => valid);
		    	this.isSubmitLoading = true;

		    	usersClient.employeeEdit(this.$store.getters['auth/currentUser']._id, this.userAccountForm)
                    .then(response => {
	                    this.isSubmitLoading = false
                    	this.$notify.success(response.message)

                        this.$store.dispatch('auth/update_user', response);

	                    let formattedPhone = contentFormat.phone(response.user.phoneNumber);

	                    this.userForm = {
		                    firstName: response.user.firstName,
		                    lastName: response.user.lastName,
		                    phoneNumber: formattedPhone
	                    }

	                    return this.cancelFormEdit();
                    })
				    .catch(error => {
					    this.isSubmitLoading = false
				    	this.$notify.error(error.message)
				    })

            },
		    goBack() {
			    this.$router.push('/dashboard');
		    },
		    handleCopy(text, event) {
			    copy(text, event)
		    }
	    }
    }
</script>

<style lang="scss" scoped>
    .user-profile__container {
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        border: unset;

        .user-profile__header {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            background: #ffffff;
            border: 1px solid #EBEEF5;
            border-radius: 5px;
        }

        .user-profile__body {
            background: #f5f6f6;
            display: flex;
            justify-content: space-around;

            .user-profile__form {
                width: 50%;

                .user-profile__form-header {
                    display: flex;
                    justify-content: space-between;
                    width: 100%;

                    span {
                        align-self: center;
                    }
                }

                .user-profile__form-body {
                    padding: 35px 15px;

                    .el-row {
                        border: 1px solid #EBEEF5;
                        padding-bottom: 15px;
                        border-radius: 5px;
                    }

                    .el-row:nth-child(2) {
                        margin: 25px auto;
                    }
                }
            }
        }
    }

    .el-row {
        display: flex;
        justify-content: space-between;
        padding: 10px 0;

        .row-label {
            position: absolute;
            right: 25px;
            bottom: 79px;
            padding: 5px 15px;
            color: #00000080;
            background: #ffffff;
            border: 1px solid #EBEEF5;
            border-radius: 10px;
            box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
        }

        .el-col {
            display: flex;
            flex-direction: column;
            justify-content: center;
            margin-top: 10px;

            .el-form-item {
                margin-bottom: 10px;
            }
        }
    }
    .input-label {
        color: #00000073;
        font-size: 12px;
    }
</style>