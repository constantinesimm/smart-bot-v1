<template>
    <div class="el-card user-profile__container">
        <div class="el-card__header user-profile__header">
            <el-page-header @back="goBack" title="На главную" content="Аккаунт"></el-page-header>
        </div>
        <div class="el-card__body user-profile__body">
            <transition name="el-zoom-in-center">
                <div class="el-card user-profile__form is-always-shadow">
                <div class="el-card__header user-profile__form-header">
                    <span><i class="fas fa-id-card-alt fa-lg"></i> Персональные данные</span>

                    <el-tooltip v-if="!this.isFormEdit" content="Изменить персональную информацию" placement="top">
                        <el-button @click="isFormEdit = !isFormEdit" class="user-profile__edit" type="text" icon="far fa-edit fa-lg">
                            Изменить
                        </el-button>
                    </el-tooltip>
                    <div v-else>
                        <el-tooltip content="Отменить изменение" placement="top">
                            <el-button @click="cancelFormEdit" class="user-profile__cancel" type="text" icon="fas fa-ban fa-lg">
                                Отмена
                            </el-button>
                        </el-tooltip>

                        <el-tooltip content="Сохранить изменение" placement="top">
                            <el-button @click="submitForm('userAccountForm')" :loading="isSubmitLoading" class="user-profile__submit" type="text" icon="far fa-save fa-lg">
                                Сохранить
                            </el-button>
                        </el-tooltip>
                    </div>

                </div>
                <div class="el-card__body user-profile__form-body">
                    <el-form v-show="!this.isFormLoading" :model="userAccountForm" :rules="rules" :loading="this.isFormLoading" ref="userAccountForm" size="small">
                        <el-row style="flex-direction: row">
                            <span class="row-label__app">
                                <i class="fas fa-rocket"></i> Сервис
                            </span>
                            <el-col :span="4">
                                <span class="input-label">
                                    <i class="fas fa-sort-numeric-down"></i> user ID
                                </span>
                                <el-form-item>
                                    <el-input v-model="this.$store.getters['auth/currentUser'].userId" size="mini" disabled readonly />
                                </el-form-item>
                            </el-col>
                            <el-col :span="7">
                                <span class="input-label">
                                    <i class="far fa-calendar-alt"></i> Дата регистрации
                                </span>
                                <el-form-item>
                                    <el-input v-model="userRegisterDate" disabled readonly size="mini"/>
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <span class="input-label">
                                    <i class="fas fa-user-tag"></i> Уровень прав
                                </span>
                                <el-form-item>
                                    <el-input v-model="this.$store.getters['auth/currentUser'].role === 'super' ? 'Супер админ' : this.$store.getters['auth/currentUser'].role === 'admin' ? 'Администратор' : 'Менеджер'" size="mini" disabled readonly />
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <span class="row-label__info">
                                <i class="fas fa-user-tie"></i>
                                Пользователь
                            </span>
                            <el-col :span="21">
                                <span class="input-label"> <i class="fas fa-at"></i> Email</span>
                                <el-form-item>
                                    <el-input v-model="this.$store.getters['auth/currentUser'].email" size="mini" disabled readonly />
                                </el-form-item>
                            </el-col>
                            <el-col :span="21" >
                                <span class="input-label">
                                    <i class="fas fa-id-card"></i> Имя
                                </span>
                                <el-form-item prop="firstName" @keypress.enter.native="submitForm">

                                    <el-input v-model="userAccountForm.firstName" :disabled="!this.isFormEdit" maxlength="20" show-word-limit placeholder="Пример: Василий" size="mini"/>

                                </el-form-item>
                            </el-col>
                            <el-col :span="21">
                                <span class="input-label">
                                    <i class="fas fa-id-card"></i>
                                    Фамилия
                                </span>
                                <el-form-item prop="lastName" @keypress.enter.native="submitForm">

                                    <el-input v-model="userAccountForm.lastName" :disabled="!this.isFormEdit" maxlength="20" show-word-limit placeholder="Пример: Васильев"  size="mini"/>

                                </el-form-item>
                            </el-col>
                            <el-col :span="21">
                                <span class="input-label">
                                    <i class="fas fa-mobile"></i>
                                    Номер телефона
                                </span>
                                <el-form-item prop="phoneNumber" @keypress.enter.native="submitForm">
                                    <el-input v-model="userAccountForm.phoneNumber" :disabled="!this.isFormEdit" v-mask="'+99 (999) 999 99 99'" placeholder="Пример: 380671112233" size="mini"/>
                                </el-form-item>
                            </el-col>
                            <el-col :span="21">
                                <span class="input-label">
                                    <i class="far fa-calendar-alt"></i>
                                    Дата рождения
                                </span>
                                <el-form-item prop="birthday" @keypress.enter.native="submitForm" style="width: 100%">
                                    <el-date-picker v-model="userAccountForm.birthday" :picker-options="calendarOptions" :disabled="!this.isFormEdit"
                                                    :default-value="`${new Date().getFullYear()-18}-${new Date().getMonth()+1}-${new Date().getDate()+1}`"
                                                    type="date" format="dd.MM.yyyy" placeholder="Выберите дату" size="mini" style="width: 100%">
                                    </el-date-picker>
                                </el-form-item>
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

                calendarOptions: {
		        	firstDayOfWeek: 1
                },
                userRegisterDate: new Date( parseInt( this.$store.getters['auth/currentUser']._id.substring(0,8), 16 ) * 1000 ).toLocaleDateString(),
                userAccountForm: {
	                firstName: this.$store.getters['auth/currentUser'].firstName,
	                lastName: this.$store.getters['auth/currentUser'].lastName,
	                phoneNumber: contentFormat.phone(this.$store.getters['auth/currentUser'].phoneNumber),
                    birthday: this.$store.getters['auth/currentUser'].birthday || ''
                },
		        isSubmitLoading: false,
		        isFormLoading: false,
		        isFormEdit: false,
            }
        },
	    methods: {
            cancelFormEdit() {
	            this.isFormEdit = !this.isFormEdit;

	            this.$refs['userAccountForm'].resetFields();
            },
            submitForm(form) {
	            this.$refs[form].validate(valid => {
	            	if (valid) {
			            this.isSubmitLoading = true;
			            this.userAccountForm.birthday = new Date(this.userAccountForm.birthday).toISOString();

			            usersClient.employeeEdit(this.$store.getters['auth/currentUser']._id, this.userAccountForm)
				            .then(response => {
					            this.isSubmitLoading = false
					            this.$notify.success(response.message)

					            this.$store.dispatch('auth/update_user', response);

					            let formattedPhone = contentFormat.phone(response.user.phoneNumber);

					            this.userAccountForm = {
						            firstName: response.user.firstName,
						            lastName: response.user.lastName,
						            phoneNumber: formattedPhone,
                                    birthday: response.user.birthday
					            }

					            return this.cancelFormEdit();
				            })
				            .catch(error => {
					            this.isSubmitLoading = false
					            this.$notify.error(error.message)
				            })
                    } else return false;
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
                min-width: 450px;
                width: 50%;

                .user-profile__form-header {
                    display: flex;
                    justify-content: space-between;
                    width: 100%;
                    padding: 10px 20px;

                    span {
                        align-self: center;
                    }

                    div {
                        .user-profile__cancel {
                            color: #F56C6C;
                            &:hover {
                                opacity: .7;
                            }
                        }

                        .user-profile__submit {
                            color: #67C23A;
                            &:hover {
                                opacity: .7;
                            }
                        }
                    }
                }

                .user-profile__form-body {
                    padding: 35px 15px 25px 15px;

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
        flex-direction: column;
        align-items: center;
        justify-content: space-around;
        padding: 10px 0;

        .row-label__app {
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

        .row-label__info {
            position: absolute;
            right: 25px;
            top: -15px;
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