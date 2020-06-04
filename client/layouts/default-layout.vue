<template>
    <div class="app-container">
        <main class="app-content" role="main">
            <slot />
        </main>
    </div>
</template>

<script>
    export default {
        name: 'default-layout'
    }
</script>

<style lang="scss" scoped>
    .app-container {
        & > .app-content {
            height: inherit;
            background: #eff1ea59;
        }
    }
</style>