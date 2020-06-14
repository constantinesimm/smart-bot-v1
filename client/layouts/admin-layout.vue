<template>
    <div class="app-container">
        <slot name="header">
            <app-header />
        </slot>

        <slot/>


        <slot name="footer">
            <app-footer />
        </slot>
    </div>
</template>

<script>
    import AppHeader from './src/header';
    import AppFooter from './src/footer';

    export default {
    	name: 'admin-layout',
        components: {
    		AppHeader, AppFooter
        },
	    created() {
		    this.$on('logout', () => {
			    this.$store.dispatch('auth/logout')
                    .then(response => {
                        this.$message.success(response.message);
                        window.location.replace('/auth/login');
                    })
                    .catch(error => this.$message.error(error.message))
		    })
	    }
    }
</script>