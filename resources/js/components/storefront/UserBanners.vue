<template>
    <section class="container">
        <div class="row justify-content-center">
            <div class="col-lg-3 col-12 mb-3">
                <p>All Banners</p>
                <p class="text-secondary">Loads all banners from your online store into the app.</p>
            </div>
            <div class="col-lg-9 col-12 mb-3">
                <div class="card card-body">
                    <div class="d-flex justify-content-between align-items-center">
                        <div class="fw-bold">Banners</div>
                        <div>
                            <span v-if="downloading" class="me-2">{{ processing }}%</span>
                            <button @click.stop="DownloadBanners" class="btn btn-success">Download banners</button>
                        </div>
                    </div>
                    <table v-if="banners.length > 0" class="table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Title</th>
                                <th>Started at</th>
                                <th>Expired at</th>
                                <th class="text-end"></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="banner in banners" :key="banner.id">
                                <td>{{ banner.id }}</td>
                                <td>{{ banner.name }}</td>
                                <td>
                                    <span v-if="banner.started_at">{{ banner.started_at }}</span>
                                    <span v-else>N/A</span>
                                </td>
                                <td>
                                    <span v-if="banner.expired_at">{{ banner.expired_at }}</span>
                                    <span v-else>N/A</span>
                                </td>
                                <td class="text-end">
                                    <button @click="openModal(banner)" type="button">Set schedule</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div v-if="banners.length > 0 && paginationLinks.length > 0" class="row mt-5 justify-content-center">
                        <div class="col-12 text-end">
                            <router-link :to="{ path: `/store/banners-timer`, query: Object.assign({}, urlGetAllParams(['page']), { page: urlParamValueFromName(link.url, 'page') })}" v-for="(link, index) in paginationLinks" :key="index" :class="`btn btn-outline-dark mx-1${(!link.url ? ' disabled' : '')}${(link.active === true ? ' btn-primary text-white' : '')}`" v-html="link.label"></router-link>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="modal fade" id="banner-schedule-modal" tabindex="-1" aria-labelledby="banner-schedule-modal-label" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="banner-schedule-modal-label">Set start and expired date</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        fdf
                    </div>
                    <div class="modal-footer">
                        <button type="submit" class="btn btn-primary">Save changes</button>
                    </div>
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
        keyword: undefined,
        page: 1,
        loading: false,
        resetAll: false,
        checkboxes: [],
        checkAll: false,
        downloading: false,
        processing: 0,
        modal: undefined,
        formdata: {
            name: undefined,
            started_at: undefined,
            expired_at: undefined
        }
    }),
    created() {
        
        // Get paging banners
        this.queryListing(this.urlGetAllParams())

        // Show resetAll
        this.resetAll = Object.keys(this.$route.query).filter(k => k !== 'page').length > 0

    },
    mounted() {
        const modalEl = document.getElementById('banner-schedule-modal')
        this.modal = new Modal(modalEl)
    },
    methods: {
        queryListing(params) {

            this.loading = true
            this.$store.dispatch('AllBanners', { objParams: params }).then(() => {
                
            }).catch(error => {
                this.$store.commit('setAlert', {
                    'color': 'danger', 
                    'message': error.response.data.message
                })
            }).finally(() => this.loading = false)
        },
        DownloadBanners() {
            this.downloading = true
            this.$store.dispatch('DownloadBanners', { page: this.page }).then(() => {
                
                if(this.downloadStatus.current < this.downloadStatus.total) {
                    this.processing = Math.round(this.downloadStatus.current*100/this.downloadStatus.total)
                    this.page++
                    this.DownloadBanners()
                } else {
                    this.processing = 0, this.downloading = false, this.page = 1
                    this.queryListing(this.urlGetAllParams())
                }

            }).catch(error => {
                this.downloading = false
                this.$store.commit('setAlert', {
                    'color': 'danger', 
                    'message': error.response.data.message
                })
            })
        },
        openModal(banner) {
            this.formdata = { ...banner }
            this.modal.show()
        }
    },
    beforeRouteUpdate (to, from, next) {
        if(to.query) {

            // Show resetAll
            this.resetAll = Object.keys(to.query).length > 0

            // Query
            this.queryListing(to.query)
        }
        next()
    },
    computed: {
        ...mapGetters(['urlGetAllParams', 'urlParamValueFromName']),
        ...mapState({
            profile: state => state.user.profile,
            banners: state => state.banner.banners,
            paginationLinks: state => state.banner.paginationLinks,
            downloadStatus: state => state.banner.downloadStatus,
        })
    },
    watch: {
        keyword: _.debounce(function(v) {
            if(v) {
                this.$router.push({ path: `/store/banners-timer`, query: { ...this.urlGetAllParams(['keyword']), keyword: v } } )
            }
        }, 500),
        checkAll(v) {
            if(v === true) {
                this.checkboxes = [ ...this.banners.map(item => item.id) ]
            } else {
                this.checkboxes = []
            }
        },
        checkboxes(v) {
            if(v.length === 0) {
                this.checkAll = false
            } else if(v.length === this.banners.length) {
                this.checkAll = true
            }
        }
    }
}
</script>