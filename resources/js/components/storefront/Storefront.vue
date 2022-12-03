<template>
    <main>
        <router-view></router-view>
    </main>
</template>

<script>
import storefront from '@/store/storefront'
export default {
    created() {
        Object.keys(storefront).forEach(moduleName => {
            this.$store.registerModule(moduleName, storefront[moduleName])
        })
    }, 
    beforeUnmount() {
        Object.keys(storefront).forEach(moduleName => {
            this.$store.unregisterModule(moduleName)
        })
    }
}
</script>