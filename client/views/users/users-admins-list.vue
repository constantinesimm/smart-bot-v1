<template>
    <el-card>
        <div slot="header">
            <el-page-header @back="goBack" title="На главную" content="Сотрудники"></el-page-header>
            <el-form :model="userInviteForm" :rules="rules" ref="userInviteForm" size="small">
                <el-form-item prop="role">
                    <el-select  v-model="userInviteForm.role" size="mini"
                                v-on:visible-change="validateFieldOnInput('userInviteForm', 'formFieldsValid', 'role')"
                                placeholder="Выберите роль" style="width:135px">
                        <el-option label="Менеджер" value="manager"/>
                        <el-option label="Администратор" value="admin"/>
                    </el-select>
                </el-form-item>
                <el-form-item prop="email">
                    <el-input placeholder="Введите email" v-model="userInviteForm.email"
                              v-on:input="validateFieldOnInput('userInviteForm', 'formFieldsValid', 'email')"
                              class="input-with-select" size="mini">
                    </el-input>
                </el-form-item>
                <el-form-item>
                    <el-button @click="submitForm" icon="fas fa-user-plus" size="mini" :loading="isLoading"> Пригласить</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div slot="default">
            <el-table :data="[]">
                <template slot="empty"><div>Нет данных</div></template>
                <el-table-column fixed="right" label="ID"></el-table-column>
                <el-table-column fixed="right" label="Имя и фамилия"></el-table-column>
                <el-table-column fixed="right" label="Email"></el-table-column>
                <el-table-column fixed="right" label="Телефон"></el-table-column>
                <el-table-column fixed="right" label="Уровень прав"></el-table-column>
                <el-table-column fixed="right" label="Активирован"></el-table-column>
                <el-table-column fixed="right" label="Действия">
                    <template slot-scope="scope">
                        <el-button type="text" size="small">Detail</el-button>
                        <el-button type="text" size="small">Edit</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </el-card>
</template>

<script>
	import validateRules from '@/plugins/validator/rules';
	import usersClient from '@/plugins/http-clients/users';

    export default {
        name: "users-admins-list",
	    data() {
        	return {
		        rules: {
			        email: validateRules.email,
			        role: { required: true, message: 'Выберите роль пользователя' }
		        },
		        userInviteForm: {
			        role: '',
			        email: ''
		        },
		        formFieldsValid: {
			        role: false,
			        email: false
                },
                isLoading: false
            }
        },
        computed: {
	        checkFormFields: function () {
		        return Object.keys(this.formFieldsValid).every(key => !!this.formFieldsValid[key])
	        }
        },
        methods: {
        	goBack() {
        		return this.$router.push('/dashboard');
            },
        	validateFieldOnInput(refKey, field, prop) {
        		return this.$refs[refKey].validateField(prop, errorMessage => this[field][prop] = !errorMessage.length)
            },
            submitForm() {
	            if (!this.checkFormFields) return this.$refs.userInviteForm.validate(valid => valid);
                this.isLoading = true;
	            usersClient.registerInvite(this.userInviteForm)
                    .then(response => console.log(response))
                    .catch(error => console.log(error.message))
                    .finally(() => this.isLoading = false)
        	}
        }
    }
</script>

<style lang="scss" scoped>
    .el-page-header {
        margin-bottom: 10px;
    }
    .el-form {
        display: flex;
        justify-content: flex-end;
        padding-top: 20px;
        border-top: 1px solid #EBEEF5;

        .el-form-item:nth-child(2) {
            width: 350px;
        }
        .el-form-item:nth-child(3) {

        }
    }
</style>