<template>
    <div class="el-card user-profile__container">
        <div class="el-card__header user-profile__header">
            <el-page-header @back="goBack" title="На главную" content="Профиль пользователя"></el-page-header>
        </div>
        <div class="el-card__body user-profile__body">
            <transition name="el-zoom-in-center">
                <div class="el-card user-profile__form-container">
                    <div class="el-card__header user-profile__form-header">
                        <span><i class="far fa-address-card"></i> Персональные данные</span>

                        <el-button v-if="!this.isFormEdit"  @click="isFormEdit = !isFormEdit" type="primary" icon="far fa-edit" size="mini" plain> Изменить</el-button>
                        <el-button-group v-else>
                            <el-button @click="cancelFormEdit"  type="danger" icon="fas fa-ban" size="mini" plain><span class="hidden-sm-and-down"> Отмена</span></el-button>
                            <el-button @click="submitForm('userProfileForm')" :loading="isSubmitLoading"  type="success" icon="far fa-save" size="mini" plain><span class="hidden-sm-and-down"> Сохранить</span></el-button>
                        </el-button-group>
                    </div>
                    <div class="el-card__body user-profile__form-body">
                        <el-form v-show="!this.isFormLoading" :model="userProfileForm" :rules="rules" :loading="this.isFormLoading" ref="userProfileForm" size="small">
                            <el-row type="flex" justify="center" align="middle">
                                <span class="row-label__app">
                                    <i class="fas fa-rocket"></i> Сервис
                                </span>
                                <el-col :span="4" :xs="22">
                                    <span class="input-label">
                                        <i class="fas fa-sort-numeric-down"></i> user ID
                                    </span>
                                    <el-form-item>
                                        <el-input v-model="this.$store.getters['auth/currentUser'].userId" size="mini" disabled readonly />
                                    </el-form-item>
                                </el-col>
                                <el-col :span="7" :xs="22">
                                    <span class="input-label">
                                        <i class="far fa-calendar-alt"></i> Дата регистрации
                                    </span>
                                    <el-form-item>
                                        <el-input v-model="userRegisterDate" disabled readonly size="mini"/>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="8" :xs="22">
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

                                        <el-input v-model="userProfileForm.firstName" :disabled="!this.isFormEdit" maxlength="20" show-word-limit placeholder="Пример: Василий" size="mini"/>

                                    </el-form-item>
                                </el-col>
                                <el-col :span="21">
                                    <span class="input-label">
                                        <i class="fas fa-id-card"></i>
                                        Фамилия
                                    </span>
                                    <el-form-item prop="lastName" @keypress.enter.native="submitForm">

                                        <el-input v-model="userProfileForm.lastName" :disabled="!this.isFormEdit" maxlength="20" show-word-limit placeholder="Пример: Васильев"  size="mini"/>

                                    </el-form-item>
                                </el-col>
                                <el-col :span="21">
                                    <span class="input-label">
                                        <i class="fas fa-mobile"></i>
                                        Номер телефона
                                    </span>
                                    <el-form-item prop="phoneNumber" @keypress.enter.native="submitForm">
                                        <el-input v-model="userProfileForm.phoneNumber" :disabled="!this.isFormEdit" v-mask="'+99 (999) 999 99 99'" placeholder="Пример: 380671112233" size="mini"/>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="21">
                                    <span class="input-label">
                                        <i class="far fa-calendar-alt"></i>
                                        Дата рождения
                                    </span>
                                    <el-form-item @keypress.enter.native="submitForm" style="width: 100%">
                                        <el-date-picker v-model="userProfileForm.birthday" :picker-options="calendarOptions" :disabled="!this.isFormEdit"
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
    import usersClient from '../../plugins/http-client/users';
    import contentFormat from '../../utils/content-format';
    import validateRules from '../../plugins/validator/rules';

	export default {
		name: 'UserProfile',
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
                userRegisterDate: new Date( parseInt( this.$store.getters['auth/currentUser']._id.substring(0,8), 16 ) * 1000 ).toISOString(),
                userProfileForm: {
                    firstName: this.$store.getters['auth/currentUser'].firstName || 'empty',
                    lastName: this.$store.getters['auth/currentUser'].lastName || 'empty',
                    phoneNumber: contentFormat.phone(this.$store.getters['auth/currentUser'].phoneNumber) || '+38 (067) 111 11 11',
                    birthday: this.$store.getters['auth/currentUser'].birthday || ''
                },
                isSubmitLoading: false,
                isFormLoading: false,
                isFormEdit: false,
            }
        },
        methods: {
		    goBack() {
		        return this.$router.push('/')
            },
            submitForm() {
                this.$refs.userProfileForm.validate(valid => {
                    if (valid) {
                        this.isSubmitLoading = true;
                        this.userProfileForm.birthday = new Date(this.userProfileForm.birthday).toISOString();

                        usersClient.employeeEdit(this.$store.getters['auth/currentUser']._id, this.userProfileForm)
                            .then(response => {
                                console.log(response);
                                this.isSubmitLoading = false;
                                this.$notify.success(response.message);

                                console.log('response', response)
                                this.$store.dispatch('auth/update_user', response);

                                this.userProfileForm = {
                                    firstName: response.user.firstName,
                                    lastName: response.user.lastName,
                                    phoneNumber: contentFormat.phone(response.user.phoneNumber),
                                    birthday: response.user.birthday
                                };

                                this.cancelFormEdit();
                            })
                            .catch(error => {
                                this.isSubmitLoading = false;
                                this.$notify.error(error.message);
                            })
                    } else return false;
                })
            },
            cancelFormEdit() {
                this.isFormEdit = !this.isFormEdit;
                this.$refs['userProfileForm'].resetFields();
            },
        }
	}
</script>

<style lang="scss" scoped>
    $screen-sm-min: 576px;

    .user-profile__body {
        background: #eff1ea;
        display: flex;
        justify-content: space-around;

        .user-profile__form-container {
            min-width: 310px;
            width: 75%;

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

                .el-row:first-child {
                    display: flex;
                    flex-direction: row;
                }

                .el-row:last-child {
                    margin: 25px auto;
                }

                @media only screen and (max-width: $screen-sm-min) {
                    .el-row:first-child {
                        display: flex;
                        flex-direction: column;

                        .row-label__app {
                            bottom: 209px;
                        }
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