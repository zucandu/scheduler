<template>
    <section class="container">
        <div class="row justify-content-center">
            <h5 class="mb-3">Products</h5>
            <div class="col-12">
                <div class="card card-body">
                    <div class="input-group">
                        <input v-model="keyword" type="search" class="form-control rounded-0" placeholder="Product name...">
                        <button class="btn border dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-sort-alpha-down" viewBox="0 0 16 16">
                                <path fill-rule="evenodd" d="M10.082 5.629 9.664 7H8.598l1.789-5.332h1.234L13.402 7h-1.12l-.419-1.371h-1.781zm1.57-.785L11 2.687h-.047l-.652 2.157h1.351z"/>
                                <path d="M12.96 14H9.028v-.691l2.579-3.72v-.054H9.098v-.867h3.785v.691l-2.567 3.72v.054h2.645V14zM4.5 2.5a.5.5 0 0 0-1 0v9.793l-1.146-1.147a.5.5 0 0 0-.708.708l2 1.999.007.007a.497.497 0 0 0 .7-.006l2-2a.5.5 0 0 0-.707-.708L4.5 12.293V2.5z"/>
                            </svg>
                            Sort
                        </button>
                        <ul class="dropdown-menu dropdown-menu-end">
                            <li v-for="(sort, index) in filters.sort" :key="index">
                                <router-link class="dropdown-item" :to="{ path: `/store/dashboard`, query: Object.assign({}, urlGetAllParams(['sort', 'page']), { sort: sort.id } ) }">{{ sort.text }}</router-link>
                            </li>
                        </ul>
                        <button :disabled="checkboxes.length === 0" @click="deleteProducts" class="btn btn-warning text-white">Delete</button>
                        <button @click.stop="downloadProducts" :disabled="downloading" class="btn btn-primary rounded ms-3 d-flex align-items-center">
                            <svg v-if="!downloading" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-download me-2" viewBox="0 0 16 16">
                                <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
                                <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"/>
                            </svg>
                            <span v-else class="me-2 small">{{ processing }}%</span>
                            Download products
                        </button>
                    </div>
                    <div class="selected-filters my-3">
                        <template v-if="Object.keys($route.query).length > 0">
                            <div class="d-inline-block mb-2" v-for="(qValue, qKey) in $route.query" :key="qKey">
                                <router-link v-if="qValue" class="btn btn-light border me-2" :to="{ path: `/store/dashboard`, query: Object.assign({}, urlGetAllParams([qKey])) }">
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
                        <router-link v-if="resetAll" class="btn btn-light border me-2" :to="{ path: `/store/dashboard`, query: Object.assign({}, urlGetAllParams(['category', 'manufacturer', 'type', 'status', 'visibility', 'more', 'sort', 'page', 'keyword'])) }">
                            Reset all
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle-fill ms-1" viewBox="0 0 16 16">
                                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"/>
                            </svg>
                        </router-link>
                    </div>
                    <div v-if="!loading">
                        <table v-if="products.length > 0" class="table table-hover">
                            <thead>
                                <tr>
                                    <th>
                                        <input v-model="checkAll" type="checkbox" :class="`form-check-input ${(this.checkboxes.length !== this.products.length) && this.checkboxes.length > 0 ? 'indeterminate' : ''}`">
                                    </th>
                                    <th>ID</th>
                                    <th>Product name</th>
                                    <th>Price</th>
                                    <th>Sale price</th>
                                    <th>Quantity</th>
                                    <th class="text-end">Created at</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="product in products" :key="product.id">
                                    <td>
                                        <input v-model="checkboxes" type="checkbox" :value="product.id" class="form-check-input">
                                    </td>
                                    <td>{{ product.id }}</td>
                                    <td>{{ product.name }}</td>
                                    <td>${{ moneyFormat(product.price, 2) }}</td>
                                    <td>${{ moneyFormat(product.sale_price, 2) }}</td>
                                    <td>{{ product.quantity }}</td>
                                    <td class="text-end">{{ product.created_at }}</td>
                                </tr>
                            </tbody>
                        </table>
                        <p v-else class="text-center">There is no products.</p>

                        <div class="row mt-3 justify-content-center" v-if="paginationLinks.length > 0">
                            <div class="col-12 text-end">
                                <router-link :to="{ path: `/store/dashboard`, query: { ...urlGetAllParams(['page']), page: urlParamValueFromName(link.url, 'page') }}" v-for="(link, index) in paginationLinks" :key="index" :class="`btn btn-link mx-1${(!link.url ? ' disabled' : '')}${(link.active === true ? ' btn-activated' : '')}`" v-html="link.label"></router-link>
                            </div>
                        </div>

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
import { mapGetters, mapState } from 'vuex'
export default {
    data: () => ({
        formdata: {
            
        },
        filters: {
            sort: [
                { id: 'created_date', text: 'Created Date' },
                { id: 'a_z', text: 'A to Z' },
                { id: 'z_a', text: 'Z to A' },
            ],
        },
        keyword: undefined,
        page: 1,
        loading: false,
        resetAll: false,
        checkboxes: [],
        checkAll: false,
        downloading: false,
        processing: 0
    }),
    created() {
        
        // Get paging products
        this.queryListing(this.urlGetAllParams())

        // Show resetAll
        this.resetAll = Object.keys(this.$route.query).filter(k => k !== 'page').length > 0

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
            }).finally(() => this.loading = false)
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
        ...mapGetters(['urlGetAllParams', 'urlParamValueFromName', 'moneyFormat']),
        ...mapState({
            profile: state => state.user.profile,
            products: state => state.product.products,
            paginationLinks: state => state.product.paginationLinks,
            downloadStatus: state => state.product.downloadStatus,
        })
    },
    watch: {
        keyword: _.debounce(function(v) {
            if(v) {
                this.$router.push({ path: `/store/dashboard`, query: { ...this.urlGetAllParams(['keyword']), keyword: v } } )
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