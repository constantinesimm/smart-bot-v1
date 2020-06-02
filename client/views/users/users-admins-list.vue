<template>
    <el-card>
        <div slot="header">
            <el-page-header @back="goBack" title="На главную" content="Сотрудники"></el-page-header>
            <div class="card-header__options">
                <el-form v-if="this.$store.getters['auth/currentUser'].role !== 'manager'" :model="userInviteForm" :rules="rules" ref="userInviteForm" size="small">

                    <el-form-item prop="role">
                        <el-select  v-model="userInviteForm.role" size="mini" placeholder="Выберите роль" style="width:135px">
                            <el-option label="Менеджер" value="manager"/>
                            <el-option label="Администратор" value="admin"/>
                        </el-select>
                    </el-form-item>

                    <el-form-item prop="email" style="margin: auto 5px">
                        <el-input placeholder="Введите email" v-model="userInviteForm.email" class="input-with-select" size="mini" />
                    </el-form-item>

                    <el-form-item>
                        <el-button @click="submitUserInviteForm" :loading="isSubmitLoading" icon="fas fa-user-plus" type="primary" size="mini" plain>
                            Пригласить
                        </el-button>
                    </el-form-item>
                </el-form>
                <div class="table-search">
                    <el-input v-model="usersListSearch" size="mini" placeholder="Поиск по имени, email или телефону"/>
                </div>
            </div>
        </div>
        <div slot="default">
            <el-table v-loading="isTableLoading" :data="adminUsersList.filter(data => !usersListSearch || data.email.toLowerCase().includes(usersListSearch.toLowerCase()) || data.fullName.toLowerCase().includes(usersListSearch.toLowerCase()) || data.phoneNumber.toLowerCase().includes(usersListSearch.toLowerCase()))">
                <template slot="empty"><div>Нет данных</div></template>

                <!-- userId table column -->
                <el-table-column prop="userId" label="ID" align="center" width="50px"/>

                <!-- isVerified table column -->
                <el-table-column prop="isVerified" sortable label="Статус" align="center" width="175px">
                    <template slot-scope="scope">
                        <el-tag :type="scope.row.isVerified ? 'success' : 'danger'">
                            <!-- isVerified true tooltip -->
                            <el-tooltip v-if="scope.row.isVerified" placement="top">
                                <div slot="content">

                                    <span>Дата регистрации: </span><span style="color: #67c23a;font-weight: bold">{{ new Date( parseInt( scope.row.docId.substring(0,8), 16 ) * 1000 ).toLocaleDateString() }}</span><br>
                                    <span>Статус: </span><span style="color: #67c23a;font-weight: bold">Регистрация завершена</span>
                                </div>
                                <span><i class="fas fa-user-check"></i> Активный</span>
                            </el-tooltip>

                            <!-- isVerified false tooltip -->
                            <el-tooltip v-else placement="top">
                                <div slot="content">
                                    <span>Дата регистрации: </span><span style="color: #f56c6c;font-weight: bold">{{ new Date( parseInt( scope.row.docId.substring(0,8), 16 ) * 1000 ).toLocaleDateString() }}</span><br>
                                    <span>Статус: </span><span style="color: #f56c6c;font-weight: bold">Email не подтверждён</span>
                                </div>
                                <span><i class="fas fa-user-times"></i> Не активный</span>
                            </el-tooltip>
                        </el-tag>
                    </template>
                </el-table-column>

                <!-- fullName table column -->
                <el-table-column label="Имя и фамилия" align="center" width="300px">
                    <template slot-scope="scope">
                        <el-button v-if="scope.row.fullName !== 'н/д'"  @click="handleCopy(scope.row.fullName, $event)" class="copy-btn" type="text">
                            <el-tooltip placement="top" content="Кликните, чтобы скопировать">
                                <span>{{ scope.row.fullName }}</span>
                            </el-tooltip>
                        </el-button>
                        <el-tag v-else type="danger">
                            <el-tooltip placement="top">
                                <div slot="content"><span style="color: #f56c6c;font-weight: bold">Email не подтверждён</span></div>
                                <i class="fas fa-user-times"></i>
                            </el-tooltip>
                        </el-tag>
                    </template>
                </el-table-column>

                <!-- email table column -->
                <el-table-column prop="email" sortable label="Email" align="center" min-width="300px">
                    <template slot-scope="scope">
                        <el-link :underline="false" :href="`mailto:${ scope.row.email }`">
                            <el-tooltip placement="top" content="Написать email">
                                <span><i class="fas fa-at"></i> {{ scope.row.email }}</span>
                            </el-tooltip>
                            <el-button class="copy-btn" type="text" @click="handleCopy(scope.row.email, $event)">
                                <el-tooltip placement="top" content="Скопировать">
                                    <i class="far fa-copy"></i>
                                </el-tooltip>
                            </el-button>
                        </el-link>
                    </template>
                </el-table-column>

                <!-- phoneNumber table column -->
                <el-table-column label="Телефон" align="center" width="225px">
                    <template slot-scope="scope">
                        <div v-if="scope.row.phoneNumber !== 'н/д'">
                            <el-link :href="`tel:${ scope.row.phoneNumber}`" :underline="false">
                                <el-tooltip placement="top" content="Позвонить">
                                    <span><i class="fas fa-mobile-alt"></i> {{ scope.row.phoneNumber }}</span>
                                </el-tooltip>
                            </el-link>
                            <el-button class="copy-btn" type="text" @click="handleCopy(scope.row.phoneNumber, $event)">
                                <el-tooltip placement="top" content="Скопировать">
                                    <i class="far fa-copy"></i>
                                </el-tooltip>
                            </el-button>
                        </div>
                        <el-tag v-else type="danger">
                            <el-tooltip placement="top">
                                <div slot="content"><span style="color: #f56c6c;font-weight: bold">Email не подтверждён</span></div>
                                <i class="fas fa-user-times"></i>
                            </el-tooltip>
                        </el-tag>
                    </template>
                </el-table-column>

                <!-- birthday table column -->
                <el-table-column label="Дата рождения" align="center" width="135px">
                    <template slot-scope="scope">
                        <el-tag :type="scope.row.birthday === 'н/д' ? 'danger' : 'info'">
                            {{ scope.row.birthday === 'н/д' ? 'н/д' : `${ new Date(scope.row.birthday).getDate()}.${new Date(scope.row.birthday).getMonth()+1}.${new Date(scope.row.birthday).getFullYear()}` }}
                        </el-tag>
                    </template>
                </el-table-column>

                <!-- role table column -->
                <el-table-column v-if="this.$store.getters['auth/currentUser'].role !== 'manager'" label="Уровень прав" align="center" width="150px">
                    <template slot-scope="scope">
                        <template v-if="scope.row.edit">
                            <el-select v-model="scope.row.role" size="mini" placeholder="Выберите роль" style="width:135px">
                                <el-option label="Менеджер" value="manager"/>
                                <el-option label="Администратор" value="admin"/>
                            </el-select>
                        </template>
                        <el-tag v-else :type="scope.row.role === 'manager' ? 'info' : scope.row.role === 'admin' ? 'success' : ''">
                            {{ scope.row.role === 'manager' ? 'Менеджер' : scope.row.role === 'admin' ? 'Администратор' : 'Супер админ' }}
                        </el-tag>
                    </template>
                </el-table-column>

                <!-- users actions table column -->
                <el-table-column v-if="this.$store.getters['auth/currentUser'].role !== 'manager'" label="Действия" align="center" width="200px">
                    <template slot-scope="scope">
                        <el-tooltip v-if="!scope.row.edit" placement="top" content="Редактировать пользователя">
                            <el-button @click="scope.row.edit = !scope.row.edit" icon="fas fa-user-edit" size="mini" type="primary" plain style="padding: 7px 12px 7px 15px" />
                        </el-tooltip>
                        <el-tooltip v-if="scope.row.edit" placement="top" content="Сохранить изменение">
                            <el-button @click="editEmployer(scope.$index, adminUsersList, scope.row.docId)"
                                       size="mini" type="success" icon="far fa-save" plain style="padding: 7px 12px 7px 15px" />
                        </el-tooltip>
                        <el-tooltip placement="top" content="Удалить пользователя">
                            <el-button @click.native.prevent="removeEmployer(scope.$index, adminUsersList, scope.row.docId)"
                                       icon="fas fa-trash-alt" type="danger" size="mini" plain />
                        </el-tooltip>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </el-card>
</template>

<script>
	import validateRules from '../../plugins/validator/rules';
	import usersClient from '../../plugins/http-client/users';
	import authClient from '../../plugins/http-client/auth';
	import contentFormat from "../../utils/content-format";
    import copy from '../../utils/clipboard';

    export default {
        name: "users-admins-list",
	    data() {
        	return {
		        rules: {
			        email: validateRules.email,
			        role: { required: true, message: 'Выберите роль пользователя' }
		        },
		        adminUsersList: [],
		        usersListSearch: '',
		        userInviteForm: {
			        role: '',
			        email: ''
		        },
		        isSubmitLoading: false,
		        isTableLoading: true
            }
        },
        methods: {
        	goBack() {
        		return this.$router.push('/dashboard');
            },
            handleCopy(text, event) {
        		copy(text, event)
            },
            submitUserInviteForm() {
	            this.$refs.userInviteForm.validate(valid => {
	            	if (valid) {
			            this.isSubmitLoading = true;

			            authClient.registerInvite(this.userInviteForm)
				            .then(response => {
					            this.adminUsersList.push({
						            docId: response.user._id,
						            userId: response.user.userId,
						            email: response.user.email,
						            phoneNumber: 'н/д',
						            fullName: 'н/д',
						            gender: 'н/д',
						            birthday: 'н/д',
						            role: response.user.role,
						            isVerified: response.user.isVerified,
						            edit: false
					            });

					            this.$message.success(response.message);
				            })
				            .catch(error => this.$message.error(error.message))
				            .finally(() => this.isSubmitLoading = false)
                    } else return false;
                });
        	},
            removeEmployer(index, rows, docId) {
        		if (docId === this.$store.getters['auth/currentUser']._id) this.$notify.error('Вы не можете удалить сами себя');
        		else {
			        usersClient.employeeRemove(docId, { email: rows[index].email })
				        .then(response => {
					        this.$notify.success(response.message);
					        rows.splice(index, 1);
				        })
                        .catch(error => this.$notify.error(error.message));
                }
            },
            editEmployer(index, rows, docId) {
	            rows[index].edit = !rows[index].edit;

	            const data = { role: rows[index].role };

	            usersClient.employeeEdit(docId, data)
                    .then(response => {
	                    this.$notify.success(response.message);
	                    this.$store.dispatch('auth/update_user', response);
                    })
                    .catch(error => this.$notify.error(error.message))
            }
        },
        created() {
        	usersClient.getAll('admins')
                .then(response => {
	                this.isTableLoading = false;

	                this.adminUsersList = response.slice().map(user => {

	                	return {
	                		docId: user._id,
			                userId: user.userId,
                            email: user.email,
                            phoneNumber: user.phoneNumber ? contentFormat.phone(user.phoneNumber) : 'н/д',
                            fullName: user.firstName && user.lastName ? `${ user.firstName } ${ user.lastName }` : 'н/д',
                            gender: user.gender ? user.gender : 'н/д',
                            birthday: user.birthday ? user.birthday : 'н/д',
                            role: user.role,
                            isVerified: user.isVerified,
                            edit: false
                        }
                    });
                })
                .catch(error => this.$message.error(error.message));
        }
    }
</script>

<style lang="scss" scoped>
    .el-page-header {
        padding-bottom: 10px;
        border-bottom: 1px solid #EBEEF5;
    }

    .card-header__options {
        display: flex;
        flex-direction: row;
        justify-content: space-between;

        .el-form {
            display: flex;
            padding-top: 18px;
            .el-form-item {
                margin-bottom: 0;
            }
            .el-form-item:nth-child(2) {
                width: 350px;
            }
        }

        .table-search {
            width: 25%;
            padding-top: 22px;
        }
    }
    .copy-btn {
        margin-left: 5px;
        color: #606266;

        &:hover {
            color: #409EFF;
        }
    }
</style>