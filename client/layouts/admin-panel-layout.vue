<template>
    <el-container>
        <el-row>
            <main-header/>
        </el-row>
        <el-row>
            <main-aside :width="menuWidth"/>
            <main-content :width="mainContentWidth">
                <slot/>
            </main-content>
        </el-row>
        <el-row>
            <main-footer/>
        </el-row>
    </el-container>
</template>

<script>
    import MainHeader from "../components/main-header";
    import MainAside from "../components/main-aside";
    import MainContent from "../components/main-content";
    import MainFooter from "../components/main-footer";

    export default {
        name: "admin-panel-layout",
	    components: {
        	MainFooter, MainContent, MainAside, MainHeader
        },
        data() {
        	return {
        		menuWidth: window.innerWidth < 768 ? '64px!important' : '250px',
		        mainContentWidth: window.innerWidth < 768 ? 'calc(100% - 64px)' : 'calc(100% - 250px)'
            }
        }
    }
</script>

<style lang="scss" scoped>
    .el-container {
        flex-direction: column;
        height: 100%;
        background-color: #f5f6f6;

        .el-row:nth-child(1) {
            display: flex;
            align-content: center;
            width: 100%;
            z-index: 1000;
        }
        .el-row:nth-child(2) {
            display: flex;
            flex-direction: row;
            width: 100%;
            height: calc(100% - 100px);
        }
        .el-row:nth-child(3) {
            width: 100%;
            line-height: 50px;

        }
    }
</style>