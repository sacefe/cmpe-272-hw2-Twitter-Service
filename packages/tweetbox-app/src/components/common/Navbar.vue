<template>
    <b-navbar toggleable="md" :variant="variant" type="dark">
        <b-navbar-brand to="/">
            <fa :icon="['fab','twitter']" /> TweetBox
        </b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse v-if="isLoggedIn" id="nav-collapse" is-nav>
            <b-navbar-nav class="ml-auto">
                <b-nav-item to="/dashboard">dashboard</b-nav-item>
            </b-navbar-nav>
        </b-collapse>
    </b-navbar>
</template>

<script>
// import {AUTH_ACTIONS} from '@/store/modules/auth/auth.actions';
export default {
    computed: {
        variant(){
            if(this.$route.name != 'home') return 'dark';
            return 'transparent';
        },
        isLoggedIn() {
            console.log(this.$store.getters['auth/isLoggedIn']);
            return this.$store.getters['auth/isLoggedIn'];
        }
    },
    mounted() {
        const isLoggedIn = this.getCookie('LOGGED-IN');
        this.$store.dispatch('auth/setLoggedIn', isLoggedIn === 'true');
    },
    methods: {
        getCookie(name) {
             return document.cookie.split('; ').reduce((r, v) => {
              const parts = v.split('=')
              return parts[0] === name ? decodeURIComponent(parts[1]) : r
            }, '');
        },
    }
}
</script>

<style lang="scss">
</style>