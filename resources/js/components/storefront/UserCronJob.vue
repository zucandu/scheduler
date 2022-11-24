<template>
    <section class="container">
        <div class="row justify-content-center">
            <div class="col-12 d-flex justify-content-between align-items-center mb-3">
                <h5 class="mb-3">Cron jobs</h5>
                <button class="btn btn-primary">Add new cron job</button>
            </div>
            <div class="col-12">
                <div class="card card-body">
                    dfsdf
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
export default {
    data: () => ({
        formdata: {
        }
    }),
    created() {

    },
    methods: {
        
    },
    computed: {
        ...mapGetters(['urlGetAllParams', 'urlParamValueFromName']),
        ...mapState({
            profile: state => state.user.profile,
        })
    },
}
</script>