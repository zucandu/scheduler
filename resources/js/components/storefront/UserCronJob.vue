<template>
    <section class="container">
        <div class="row justify-content-center">
            <h5 class="mb-3">Cron jobs</h5>
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