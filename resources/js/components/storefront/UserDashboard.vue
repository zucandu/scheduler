<template>
    <section class="container">
        <div class="d-flex justify-content-between align-items-center">
            <h5>Welcome to Zucandu Schedules</h5>
        </div>
        <div class="row justify-content-center">
            <div class="col-12">
                <div class="card card-body">
                    <h5>Welcome to Zucandu Scheduler.</h5>
                </div>
            </div>
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