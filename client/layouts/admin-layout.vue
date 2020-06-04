<template>
    <div class="app-container">
        <slot name="header">
            <app-header />
        </slot>

        <app-content />

        <slot name="footer">
            <app-footer />
        </slot>
    </div>
</template>

<script>
    import AppHeader from './src/header';
    import AppContent from './src/content';
    import AppFooter from './src/footer';

    export default {
    	name: 'admin-layout',
        components: {
    		AppHeader, AppContent, AppFooter
        },
	    created() {
		    this.$on('logout', (text) => {
			    alert(text);
		    })
	    }
    }
</script>