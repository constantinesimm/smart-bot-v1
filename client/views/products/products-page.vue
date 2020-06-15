<template>
    <el-card class="box-card">
        <div slot="header">
            <el-page-header @back="goBack" title="На главную" content="Меню: Позиции и категории"></el-page-header>
        </div>
        <div slot="default">
            <el-tabs type="border-card">
                <el-tab-pane>
                    <span slot="label"><i class="fas fa-tags"></i> Категории</span>
                    <category-tab/>
                </el-tab-pane>
                <el-tab-pane>
                    <span slot="label"><i class="fas fa-list-alt"></i> Позиции</span>
                    <position-tab/>
                </el-tab-pane>
            </el-tabs>
        </div>
    </el-card>
</template>

<script>
    import categoryTab from './components/tabs/category-tab';
    import positionTab from './components/tabs/position-tab';

	export default {
		name: 'products-page',
        components: {
			categoryTab, positionTab
        },
		data() {
			return {

			}
		},
		methods: {
			goBack() {
				this.$router.push('/dashboard');
			}
		}
	}
</script>

<style scoped>

</style>