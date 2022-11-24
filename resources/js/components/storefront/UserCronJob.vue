<template>
    <section class="container">
        <div class="row justify-content-center">
            <div class="col-12 d-flex justify-content-between align-items-center mb-3">
                <h5 class="mb-3">Cron jobs</h5>

                <!-- Button trigger modal -->
                <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#cron-modal">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-circle me-2" viewBox="0 0 16 16">
                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                        <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                    </svg>
                    Create a new cron
                </button>

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
                                        <label class="form-label">Name</label>
                                        <input v-model="formdata.name" type="text" class="form-control" placeholder="E.g. Backup store" required>
                                    </div>
                                    <div class="mb-3">
                                        <label class="form-label">Common settings</label>
                                        <select v-model="formdata.common_setting" class="form-select">
                                            <option :value="0">-- Common settings --</option>
                                            <option v-for="item in commonSettings" :key="item.id" :value="item.id">{{ item.text }}</option>
                                        </select>
                                    </div>
                                    <template v-if="+formdata.common_setting === 8">
                                        <div class="row">
                                            <div class="col-lg-6 col-12 mb-3">
                                                <label class="form-label">Minute (0 - 59)</label>
                                                <input v-model="formdata.minute" type="text" class="form-control">
                                            </div>
                                            <div class="col-lg-6 col-12 mb-3">
                                                <label class="form-label">Hour (0 - 23)</label>
                                                <input v-model="formdata.hour" type="text" class="form-control">
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-lg-6 col-12 mb-3">
                                                <label class="form-label">Day</label>
                                                <input v-model="formdata.day" type="text" class="form-control">
                                            </div>
                                            <div class="col-lg-6 col-12 mb-3">
                                                <label class="form-label">Month</label>
                                                <input v-model="formdata.month" type="text" class="form-control">
                                            </div>
                                        </div>
                                        <div class="mb-3">
                                            <label class="form-label">Weekday</label>
                                            <input v-model="formdata.weekday" type="text" class="form-control">
                                        </div>
                                    </template>
                                    <div class="mb-3">
                                        <label class="form-label">URL</label>
                                        <input v-model="formdata.url" type="text" class="form-control" placeholder="E.g. https://example.com/api/...">
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
                    <div v-if="loaded">
                        <table v-if="schedules.length > 0" class="table table-hover">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Common</th>
                                    <th class="text-center">Weekday</th>
                                    <th class="text-center">Month</th>
                                    <th class="text-center">Day</th>
                                    <th class="text-center">Hour</th>
                                    <th class="text-center">Minute</th>
                                    <th class="text-end"></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="schedule in schedules" :key="schedule.id">
                                    <td>{{ schedule.id }}</td>
                                    <td>{{ schedule.name }}</td>
                                    <td>{{ commonSettings.find(item => +item.id === +schedule.common_setting).text }}</td>
                                    <td class="text-center">
                                        <span v-if="schedule.weekday">{{ schedule.weekday }}</span>
                                        <span class="text-secondary">N/A</span>
                                    </td>
                                    <td class="text-center">
                                        <span v-if="schedule.month">{{ schedule.month }}</span>
                                        <span class="text-secondary">N/A</span>
                                    </td>
                                    <td class="text-center">
                                        <span v-if="schedule.day">{{ schedule.day }}</span>
                                        <span class="text-secondary">N/A</span>
                                    </td>
                                    <td class="text-center">
                                        <span v-if="schedule.hour">{{ schedule.hour }}</span>
                                        <span class="text-secondary">N/A</span>
                                    </td>
                                    <td class="text-center">
                                        <span v-if="schedule.minute">{{ schedule.minute }}</span>
                                        <span class="text-secondary">N/A</span>
                                    </td>
                                    <td class="text-end">
                                        end
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div v-else>
                        <div class="py-3 bg-secondary opacity-25 rounded w-100 mb-2"></div>
                        <div class="py-2 rounded bg-secondary opacity-25 rounded w-100 mb-1"></div>
                        <div class="py-2 rounded bg-secondary opacity-25 rounded w-100 mb-1"></div>
                        <div class="py-2 rounded bg-secondary opacity-25 rounded w-100 mb-1"></div>
                        <div class="py-2 rounded bg-secondary opacity-25 rounded w-100 mb-1"></div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import Modal from 'bootstrap/js/dist/modal';
import { mapState } from 'vuex'
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
            { id: 8, text: 'Custom Schedule' },
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
        },
        modal: undefined,
        loaded: false
    }),
    created() {
        this.$store.dispatch('allCrons').finally(() => this.loaded = true)
    },
    mounted() {
        this.modal = new Modal(document.getElementById('cron-modal'))
    },
    methods: {
        createCron() {
            this.$store.dispatch('createCron', this.formdata).then(() => {
                this.modal.hide()
                this.resetFormdata()
            }).catch(error => {
                this.$store.commit('setAlert', {
                    'color': 'danger', 
                    'message': error.response.data.message
                })
            })
        },
        resetFormdata() {
            this.formdata = {
                name: undefined,
                url: undefined,
                common_setting: 0,
                weekday: undefined,
                month: undefined,
                day: undefined,
                hour: undefined,
                minute: undefined
            }
        }
    },
    computed: {
        ...mapState({
            profile: state => state.user.profile,
            schedules: state => state.schedule.schedules,
        })
    },
}
</script>