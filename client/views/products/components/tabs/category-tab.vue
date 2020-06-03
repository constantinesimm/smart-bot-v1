<template>
    <el-row>
        <el-col :span="8">
            <el-card class="box-card">
                <div slot="header" class="category-card__header">
                    <span>Категории меню</span>
                    <el-input @keyup.enter.native="handleInputConfirm" @blur="handleInputConfirm" prefix-icon="fas fa-edit"
                              v-if="inputVisible" v-model="inputValue" ref="saveTagInput" class="input-new-tag" size="mini" >
                    </el-input>
                    <el-button v-else @click="showInput" class="button-new-tag" icon="fas fa-tag" size="small" > Добавить</el-button>
                </div>
                <div slot="default">
                    <el-tag :key="tag" v-for="tag in dynamicTags" :disable-transitions="false" @close="handleClose(tag)" closable>
                        {{tag}}
                    </el-tag>
                </div>
            </el-card>
        </el-col>
    </el-row>
</template>

<script>
	export default {
		name: "category-tab",
        data() {
			return {
				dynamicTags: ['Tag 1', 'Tag 2', 'Tag 3'],
				inputVisible: false,
				inputValue: ''
            }
        },
		methods: {
			handleClose(tag) {
				this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
			},

			showInput() {
				this.inputVisible = true;
				this.$nextTick(_ => {
					this.$refs.saveTagInput.$refs.input.focus();
				});
			},

			handleInputConfirm() {
				let inputValue = this.inputValue;
				if (inputValue) {
					this.dynamicTags.push(inputValue);
				}
				this.inputVisible = false;
				this.inputValue = '';
			}
		}
	}
</script>

<style lang="scss" scoped>
    .el-tag + .el-tag {
        margin-left: 10px;
    }
    .button-new-tag {
        margin-left: 10px;
        height: 32px;
        line-height: 30px;
        padding-top: 0;
        padding-bottom: 0;
    }
    .input-new-tag {
        width: 125px;
        margin-left: 10px;
        vertical-align: bottom;
    }

    .category-card__header {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
    }
</style>