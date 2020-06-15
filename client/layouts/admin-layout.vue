<template>
    <div class="app-container">
        <app-header />

        <slot/>

        <app-footer />
    </div>
</template>

<script>
    import AppHeader from '../components/AppHeader';
    import AppFooter from '../components/AppFooter';

    export default {
    	name: 'admin-layout',
        components: {
    		AppHeader, AppFooter
        }
    }
</script>