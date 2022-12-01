<template>
    <section class="container">
        <div class="row justify-content-center">
            <div class="col-lg-3 col-12 mb-3">
                <p>Add Schedule</p>
                <p>You can set the date to apply the sales price into your products.</p>
            </div>
            <div class="col-lg-9 col-12 mb-3">
                <div class="card card-body">
                    <form @submit.prevent="createScheduleSalesPrice">
                        <div class="mb-3">
                            <div class="mb-3">
                                <label class="form-label">Name</label>
                                <input v-model="formdata.name" type="text" class="form-control" placeholder="E.g. Big Summer Sale">
                            </div>
                        </div>
                        <div class="row g-3">
                            <div class="col-md-4 col-12 mb-3">
                                <label class="form-label">Discount Amount</label>
                                <input v-model="formdata.discount_amount" type="text" class="form-control" placeholder="E.g. 10% of 10">
                            </div>
                            <div class="col-md-4 col-12 mb-3">
                                <label class="form-label">Start at</label>
                                <DatePicker v-model="formdata.started_at" mode="date" timezone="utc" :masks="masks">
                                    <template v-slot="{ inputValue, inputEvents }">
                                        <input class="form-control" :value="inputValue" v-on="inputEvents">
                                    </template>
                                </DatePicker>
                            </div>
                            <div class="col-md-4 col-12 mb-3">
                                <label class="form-label">Expires at</label>
                                <DatePicker v-model="formdata.expired_at" mode="date" timezone="utc" :masks="masks">
                                    <template v-slot="{ inputValue, inputEvents }">
                                        <input class="form-control" :value="inputValue" v-on="inputEvents">
                                    </template>
                                </DatePicker>
                            </div>
                        </div>
                        <div class="text-end">
                            <button type="submit" class="btn btn-primary">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-lg me-2" viewBox="0 0 16 16">
                                    <path fill-rule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"/>
                                </svg>
                                Submit
                            </button>
                        </div>
                    </form>
                    <hr class="bg-secondary my-4">
                    <table class="table table-striped table-hover">
                        <thead>
                            <tr>
                                <td>ID</td>
                                <td>Name</td>
                                <td>Discount</td>
                                <td>Started at</td>
                                <td>Expired at</td>
                                <td></td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="sp in scheduleSalesPrice" :key="sp.id">
                                <td>{{ sp.id }}</td>
                                <td>{{ sp.name }}</td>
                                <td>{{ sp.discount_amount }}</td>
                                <td>{{ sp.started_at }}</td>
                                <td>{{ sp.expired_at }}</td>
                                <td>
                                    <button class="btn btn-sm btn-danger">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                                            <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                                        </svg>
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        <hr>
        <div class="row justify-content-center">
            <div class="col-lg-3 col-12 mb-3">
                <p>Products</p>
                <p>Select and add products into schedule.</p>
            </div>
            <div class="col-lg-9 col-12 mb-3">
                <div class="d-flex justify-content-between mb-3">
                    <h4 class="mb-0">Products</h4>
                    <div>
                        <button @click.stop="downloadProducts" :disabled="downloading" class="btn btn-primary rounded ms-3 d-flex align-items-center">
                            <svg v-if="!downloading" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-download me-2" viewBox="0 0 16 16">
                                <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
                                <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"/>
                            </svg>
                            <span v-else class="me-2 small">{{ processing }}%</span>
                            Download products
                        </button>
                    </div>
                </div>
                <div class="p-3 bg-white border">
                    <div class="input-group">
                        <input v-model="keyword" type="search" class="form-control rounded-0" placeholder="Find your product by name, SKU, GTIN,..">
                        <button class="btn dropdown-toggle border-grey" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-toggles" viewBox="0 0 16 16">
                                <path d="M4.5 9a3.5 3.5 0 1 0 0 7h7a3.5 3.5 0 1 0 0-7h-7zm7 6a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5zm-7-14a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zm2.45 0A3.49 3.49 0 0 1 8 3.5 3.49 3.49 0 0 1 6.95 6h4.55a2.5 2.5 0 0 0 0-5H6.95zM4.5 0h7a3.5 3.5 0 1 1 0 7h-7a3.5 3.5 0 1 1 0-7z"/>
                            </svg>
                            Status
                        </button>
                        <ul class="dropdown-menu dropdown-menu-end">
                            <li v-for="(status, index) in filters.status" :key="index">
                                <router-link class="dropdown-item" :to="{ path: `/store/schedule-sales-price`, query: Object.assign({}, urlGetAllParams(['status', 'page']), { status: status.id } ) }">{{ status.text }}</router-link>
                            </li>
                        </ul>
                        <button class="btn dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-sort-alpha-down" viewBox="0 0 16 16">
                                <path fill-rule="evenodd" d="M10.082 5.629 9.664 7H8.598l1.789-5.332h1.234L13.402 7h-1.12l-.419-1.371h-1.781zm1.57-.785L11 2.687h-.047l-.652 2.157h1.351z"/>
                                <path d="M12.96 14H9.028v-.691l2.579-3.72v-.054H9.098v-.867h3.785v.691l-2.567 3.72v.054h2.645V14zM4.5 2.5a.5.5 0 0 0-1 0v9.793l-1.146-1.147a.5.5 0 0 0-.708.708l2 1.999.007.007a.497.497 0 0 0 .7-.006l2-2a.5.5 0 0 0-.707-.708L4.5 12.293V2.5z"/>
                            </svg>
                            Sort
                        </button>
                        <ul class="dropdown-menu dropdown-menu-end">
                            <li v-for="(sort, index) in filters.sort" :key="index">
                                <router-link class="dropdown-item" :to="{ path: `/store/schedule-sales-price`, query: Object.assign({}, urlGetAllParams(['sort', 'page']), { sort: sort.id } ) }">{{ sort.text }}</router-link>
                            </li>
                        </ul>
                    </div>
                    <div class="d-flex align-items-center my-lg-3">

                        <!-- Button trigger modal -->
                        <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#schedule-modal">Set Schedule</button>

                        <!-- Modal -->
                        <div class="modal fade" id="schedule-modal" tabindex="-1" aria-labelledby="schedule-modal-label" aria-hidden="true">
                            <div class="modal-dialog">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h1 class="modal-title fs-5" id="schedule-modal-label">Modal title</h1>
                                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div class="modal-body">
                                        This is a modal
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                        <button type="button" class="btn btn-primary">Save changes</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="selected-filters">
                        <template v-if="Object.keys($route.query).length > 0">
                            <div class="d-inline-block mb-2" v-for="(qValue, qKey) in $route.query" :key="qKey">
                                <router-link v-if="qValue" class="btn btn-light border me-2" :to="{ path: `/store/schedule-sales-price`, query: Object.assign({}, urlGetAllParams([qKey])) }">
                                    <span class="text-capitalize" v-if="filters[qKey] && filters[qKey].length > 0">
                                        {{qKey}}: {{filters[qKey].find(v => v.id == qValue).text}} 
                                    </span>
                                    <span class="text-capitalize" v-else>
                                        {{qKey}}: <span v-html="qValue"></span>
                                    </span>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle-fill ms-1" viewBox="0 0 16 16">
                                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"/>
                                    </svg>
                                </router-link>
                            </div>
                        </template>
                        <router-link v-if="resetAll" class="btn btn-light border me-2" :to="{ path: `/store/schedule-sales-price`, query: Object.assign({}, urlGetAllParams(['category', 'manufacturer', 'type', 'status', 'visibility', 'more', 'sort', 'page', 'keyword'])) }">
                            Reset all
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle-fill ms-1" viewBox="0 0 16 16">
                                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"/>
                            </svg>
                        </router-link>
                    </div>
                </div>
                <div class="card card-body shadow-sm border-top-0 rounded-0">
                    <template v-if="loading === true">
                        <div class="d-flex justify-content-center p-3">
                            <span class="spinner-grow spinner-grow-sm mx-1 text-info" role="status" aria-hidden="true"></span>
                            <span class="spinner-grow spinner-grow-sm mx-1 text-info" role="status" aria-hidden="true"></span>
                            <span class="spinner-grow spinner-grow-sm mx-1 text-info" role="status" aria-hidden="true"></span>
                        </div>
                    </template>
                    <template v-else>
                        <p v-if="products && products.length === 0" class="text-danger text-center mb-0">Item not found.</p>
                        <div v-else>
                            <table class="table table-striped table-hover">
                                <thead>
                                <tr>
                                    <th>
                                        <input v-model="checkAll" type="checkbox" :class="`form-check-input ${(this.checkboxes.length !== this.products.length) && this.checkboxes.length > 0 ? 'indeterminate' : ''}`">
                                    </th>
                                    <th>Store's ID</th>
                                    <th>Name</th>
                                    <th>SKU</th>
                                    <th>Qty</th>
                                    <th>Price</th>
                                    <th>Sale price</th>
                                </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="product in products" :key="product.id">
                                        <td>
                                            <input v-model="checkboxes" type="checkbox" :value="product.id" class="form-check-input">
                                        </td>
                                        <td>{{ product.store_product_id }}</td>
                                        <td>{{ product.name }}</td>
                                        <td>{{ product.sku }}</td>
                                        <td>{{ product.quantity }}</td>
                                        <td>${{ (+product.price).toFixed(2) }}</td>
                                        <td>
                                            <span v-if="+product.sale_price > 0">${{ (+product.sale_price).toFixed(2) }}</span>
                                            <span v-else>N/A</span>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <div v-if="paginationLinks.length > 0" class="row mt-5 justify-content-center">
                                <div class="col-12 text-end">
                                    <router-link :to="{ path: `/store/schedule-sales-price`, query: Object.assign({}, urlGetAllParams(['page']), { page: urlParamValueFromName(link.url, 'page') })}" v-for="(link, index) in paginationLinks" :key="index" :class="`btn btn-outline-dark mx-1${(!link.url ? ' disabled' : '')}${(link.active === true ? ' btn-primary text-white' : '')}`" v-html="link.label"></router-link>
                                </div>
                            </div>
                        </div>
                    </template>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import Modal from 'bootstrap/js/dist/modal';
import { DatePicker } from 'v-calendar';
import { mapGetters, mapState } from 'vuex'
export default {
    data: () => ({
        formdata: {
            name: undefined,
            discount_amount: undefined,
            started_at: undefined,
            expired_at: undefined
        },
        masks: {
            input: 'YYYY-MM-DD',
        },
        filters: {
            status: [
                {id: 1, text: 'Active'},
                {id: 0, text: 'Inactive'}
            ],
            sort: [
                {id: 'created_date', text: 'Created Date'},
                {id: 'last_updated', text: 'Last Updated'}
            ],
        },
        keyword: undefined,
        processing: 0,
        downloading: false,
        page: 1,
        loading: false,
        resetAll: false,
        checkboxes: [],
        checkAll: false,
    }),
    components: { DatePicker },
    created() {
        
        // Get paging products
        this.queryListing(this.urlGetAllParams())

        // Show resetAll
        this.resetAll = Object.keys(this.$route.query).filter(k => k !== 'page').length > 0

        // Load all schedule sales price
        this.$store.dispatch('allScheduleSalesPrice')

    },
    mounted() {
        const el = document.getElementById('schedule-modal')
        this.scheduleModal = new Modal(el)
        const _ = this
        el.addEventListener('hidden.bs.modal', () => _.scheduleModal.hide())
    },
    methods: {
        
        queryListing(params) {

            this.loading = true
            this.$store.dispatch('AllProducts', { objParams: params }).then(() => {
                
            }).catch(error => {
                this.$store.commit('setAlert', {
                    'color': 'danger', 
                    'message': error.response.data.message
                })
            }).finally(() => {
                this.loading = false
            })
        },
        downloadProducts() {
            this.downloading = true
            this.$store.dispatch('DownloadProducts', { page: this.page }).then(() => {
                
                if(this.downloadStatus.current < this.downloadStatus.total) {
                    this.processing = Math.round(this.downloadStatus.current*100/this.downloadStatus.total)
                    this.page++
                    this.downloadProducts()
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
        createScheduleSalesPrice() {
            this.$store.dispatch('createScheduleSalesPrice', this.formdata).finally(() => this.resetForm())
        },
        resetForm() {
            this.formdata = {
                name: undefined,
                discount_amount: undefined,
                started_at: undefined,
                expired_at: undefined
            }
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
        ...mapGetters(['translation', 'urlGetAllParams', 'urlParamValueFromName']),
        ...mapState({
            products: state => state.product.products,
            paginationLinks: state => state.product.paginationLinks,
            scheduleSalesPrice: state => state.schedule.scheduleSalesPrice,
        })
    },
    watch: {
        keyword: _.debounce(function(v) {
            if(v) {
                this.$router.push({ path: `/store/schedule-sales-price`, query: { ...this.urlGetAllParams(['keyword']), keyword: v } } )
            }
        }, 500),
        checkAll(v) {
            if(v === true) {
                this.checkboxes = [ ...this.products.map(p => p.id) ]
            } else {
                this.checkboxes = []
            }
        },
        checkboxes(v) {
            if(v.length === 0) {
                this.checkAll = false
            } else if(v.length === this.products.length) {
                this.checkAll = true
            }
        }
    }
}
</script>