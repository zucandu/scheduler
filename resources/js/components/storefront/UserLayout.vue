<template>
    <template v-if="loaded && isUserLogged">
        <layout-header></layout-header>
        <div id="user-panel" class="user-panel pb-5">
            <router-view></router-view>
        </div>
        <element-toast></element-toast>
    </template>
</template>

<script>
import LayoutHeader from '@/components/storefront/templates/layout/Header'
import ElementToast from '@/components/storefront/templates/element/Toast'

import { mapGetters } from 'vuex';
export default {
    data: () => ({
        loaded: false
    }),
    components: { LayoutHeader, ElementToast },
    created() {
        this.$store.dispatch('getUserProfile')
            .then(() => this.loaded = true)
            .catch(() => this.$router.push('/login'))
    },
    mounted() {
        const toggleBtn = document.querySelector('.toggle-sidebar-btn')
        if(toggleBtn) {
            toggleBtn.addEventListener('click', () => {
                document.querySelector('body').classList.toggle('toggle-sidebar')
            })
        }
    },
    computed: {
        ...mapGetters(['isUserLogged']),
    }
}
</script>

<style lang="scss">

// https://vcalendar.io/vue-3.html
@import "~v-calendar/dist/style.css";
</style>