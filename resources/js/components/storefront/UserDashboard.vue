<template>
    <section class="container">
        <div class="row justify-content-center">
            
        </div>
    </section>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
export default {
    data: () => ({
    }),
    created() {
        
    },
    methods: {
        
        
    },
    
    computed: {
        ...mapGetters(['urlGetAllParams', 'urlParamValueFromName']),
        ...mapState({
            profile: state => state.user.profile
        })
    },
}
</script>