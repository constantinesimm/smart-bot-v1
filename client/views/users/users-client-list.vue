<template>
    <el-card>
        <div slot="header">
            <el-page-header @back="goBack" title="На главную" content="Клиенты"></el-page-header>
        </div>
        <div slot="default">
            <el-table :data="[]" style="width: 100%">
                <template slot="empty"><div>Нет данных</div></template>
                <el-table-column fixed="right" label="Operations"></el-table-column>
                <el-table-column fixed="right" label="Operations"></el-table-column>
                <el-table-column fixed="right" label="Operations"></el-table-column>
                <el-table-column fixed="right" label="Operations"></el-table-column>
                <el-table-column fixed="right" label="Operations">
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
	export default {
		name: "users-client-list",
        methods: {
	        goBack() {
		        return this.$router.push('/dashboard');
	        }
        }
	}
</script>

<style scoped>

</style>