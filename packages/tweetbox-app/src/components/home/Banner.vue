<!-- Jyothi -->
<template>
    <section class="banner">
            <header class="viewport-header">
            <div class="image-wrap"></div>
            <div class="banner-overlay"></div>
            <div class="banner-content text-light">
                <div class="text-center">
                    <h2 class="banner-title ">Tweetbox</h2>
                    <h3 class="mt-3 ">
                        One stop solution for all your tweets.
                    </h3>
                    <b-btn size="md" aria-label="Learn More" variant="primary" @click="loginWithTwitter" class="mt-4 rounded-0 shadow-sm">Login with twitter <fa :icon="['fab', 'twitter']"/></b-btn>
                </div>
            </div>
            </header>
        </section>
</template>

<script>
// import {twitLogin} from '@/services';
export default {
    data: ()=>({
    }),
    methods: {
        loginWithTwitter: () => {
            window.location.href = 'http://localhost:3030/api/auth/twitter';
        }
    }
}
</script>

<style lang="scss">
.banner {
    margin-top: 3rem;
}

.viewport-header {
    height: 85vh;
    text-align: center;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-align: center;
    align-items: center;
    color: $dark;
}

.image-wrap {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    overflow: hidden;
    z-index: -99;
    background: url('../../assets/connections.png') no-repeat;
    background-size: cover;
}

.banner-overlay {
    height: 100vh;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: -2;
    background: $dark;
    opacity: .9;
}

    .banner-content{
        display: block;
        position: absolute;
        top: 45%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
    .banner-title{
        font-size: 3em;
    }

    .montserrat {
        font-family: 'Montserrat', sans-serif;
    }
</style>