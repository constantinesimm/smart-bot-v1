<template>
    <el-main>
        <el-row>
            <el-col :span="24">
                <slot/>
            </el-col>
        </el-row>
    </el-main>
</template>

<script>
	export default {
		name: "main-content",
        data() {
			return {}
        }
	}
</script>

<style scoped>

</style>