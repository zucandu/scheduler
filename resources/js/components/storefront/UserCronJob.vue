<template>
    <section class="container">
        <div class="row justify-content-center">
            <div class="col-12 d-flex justify-content-between align-items-center mb-3">
                <h5 class="mb-3">Cron jobs</h5>

                <!-- Button trigger modal -->
                <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#cron-modal">Create a new cron</button>

                <!-- Modal -->
                <div class="modal fade" id="cron-modal" tabindex="-1" aria-labelledby="cron-modal-label" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <form @submit.prevent="createCron">
                                <div class="modal-header">
                                    <h1 class="modal-title fs-5" id="cron-modal-label">Cron</h1>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div class="modal-body">
                                    <div class="mb-3">
                                        <label class="form-label">Common settings</label>
                                        <select v-model="formdata.common_setting" class="form-select">
                                            <option :value="0">-- Common settings --</option>
                                            <option v-for="item in commonSettings" :key="item.id" :value="item.id">{{ item.text }}</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                    <button type="submit" class="btn btn-primary">Save changes</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

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
import Modal from 'bootstrap/js/dist/modal';
import { mapGetters, mapState } from 'vuex'
export default {
    data: () => ({
        commonSettings: [
            { id: 1, text: 'Once Per Minute' },
            { id: 2, text: 'Once Per Five Minutes' },
            { id: 3, text: 'Twice Per Hour' },
            { id: 4, text: 'Twice Per Day' },
            { id: 5, text: 'Once Per Week' },
            { id: 6, text: 'Once Per Month' },
            { id: 7, text: 'Once Per Year' },
            { id: 8, text: 'Set a custom schedule' },
        ],
        formdata: {
            name: undefined,
            url: undefined,
            common_setting: 0,
            weekday: undefined,
            month: undefined,
            day: undefined,
            hour: undefined,
            minute: undefined
        }
    }),
    mounted() {
        new Modal(document.getElementById('cron-modal'))
    },
    methods: {
        createCron() {
            alert(1)
        }
    },
    computed: {
        ...mapGetters(['urlGetAllParams', 'urlParamValueFromName']),
        ...mapState({
            profile: state => state.user.profile,
        })
    },
}
</script>