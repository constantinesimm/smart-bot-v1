<template>
    <el-main>
        <el-row type="flex" justify="center" align="middle">
            <el-col :span="24">
                <slot/>
            </el-col>
        </el-row>
    </el-main>
</template>

<script>
	export default {
		name: "AppContent"
	}
</script>

<style lang="scss" scoped>

</style>