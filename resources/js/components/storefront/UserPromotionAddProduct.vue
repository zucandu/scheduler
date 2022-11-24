<template>
    <section class="container">
        <div class="row justify-content-center">
            <div class="col-xl-8 col-12">
                <h4 v-if="Object.keys(promotionDetails).length > 0" class="mb-3">Add products to <strong>{{ promotionDetails.title }}</strong> promotion</h4>
                <h4 v-else>
                    <div class="spinner-border opacity-50" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                </h4>
                <div class="card card-body shadow-sm">
                    <div class="input-group">
                        <input v-model="keyword" type="search" class="form-control rounded-0" placeholder="Product name...">
                    </div>
                    <hr>
                    <div v-if="checkboxes.length > 0" class="row bg-secondary p-2 mb-3">
                        <div class="col-7">
                            <span v-for="cb in checkboxes" :key="cb" class="badge bg-primary me-2">{{ cb }}</span>
                        </div>
                        <div class="col-5">
                            <button @click.stop="addProductsToPromotion" class="btn btn-primary w-100">Add product(s) into this promotion</button>
                        </div>
                    </div>
                    <div v-if="!loading" class="overflow-auto products-list">
                        <table v-if="products.length > 0" class="table table-hover">
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>ID</th>
                                    <th>Store product id</th>
                                    <th>Product name</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="product in products" :key="product.id">
                                    <td>
                                        <input v-model="checkboxes" type="checkbox" :value="product.id" class="form-check-input">
                                    </td>
                                    <td>{{ product.id }}</td>
                                    <td>{{ product.store_product_id }}</td>
                                    <td>{{ product.name }}</td>
                                </tr>
                            </tbody>
                        </table>
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
            promotion_id: undefined
        },
        keyword: undefined,
        loading: false,
        checkboxes: [],
        checkAll: false,
    }),
    created() {
        this.$store.dispatch('promotionDetails', this.$route.params.id).then(() => this.checkboxes = this.promotionDetails.products)
        this.queryListing(this.urlGetAllParams())
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
        addProductsToPromotion() {
            this.$store.dispatch('addProductsToPromotion', { id: this.$route.params.id, products: this.checkboxes}).then(() => {
                this.$store.commit('setAlert', {
                    'color': 'success', 
                    'message': "Added!"
                })
            }).catch(error => {
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
            promotionDetails: state => state.promotion.promotionDetails,
        })
    },
    watch: {
        keyword: _.debounce(function(v) {
            if(v) {
                this.$router.push({ path: `/store/promotion/${this.$route.params.id}/add-product`, query: { ...this.urlGetAllParams(['keyword']), keyword: v } } )
            }
        }, 500),
        checkboxes(v) {
            if(v.length === 0) {
                this.checkAll = false
            } else if(v.length === this.products.length) {
                this.checkAll = true
            }
        },
        checkAll(v) {
            if(v === true) {
                this.checkboxes = [ ...this.products.map(p => p.id) ]
            } else {
                this.checkboxes = []
            }
        },
    }
}
</script>

<style lang="scss" scoped>
.products-list {
    max-height: 500px;
}
</style>