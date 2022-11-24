<template>
    <section class="container">
        <div class="row justify-content-center">
            <h5 class="mb-3">Promotions</h5>
            <div class="col-3">
                <div class="card card-body">
                    <form @submit.prevent="handlePromotion">
                        <p>The data request matches store product id or subtotal, discount will be applied</p>
                        <div class="mb-3">
                            <label class="form-label">Group ID</label>
                            <input v-model="formdata.group_id" type="number" placeholder="E.g. 123" class="form-control">
                            <p class="small text-primary">Used to combine multiple promotions and then check if the gift has been used or not.</p>
                        </div>
                        <div class="mb-3">
                            <label class="form-label">Title</label>
                            <input v-model="formdata.title" type="text" placeholder="E.g. 10% OFF" class="form-control" required>
                        </div>
                        <div class="row g-3">
                            <div class="col-lg-6 mb-3">
                                <label class="form-label">Promotion</label>
                                <select v-model="formdata.promotion_type" class="form-select">
                                    <option v-for="protype in promotionTypes" :key="protype" :value="protype.id">{{ protype.text }}</option>
                                </select>
                            </div>
                            <div class="col-lg-6 mb-3">
                                <label class="form-label">Status</label>
                                <select v-model="formdata.status" class="form-select">
                                    <option v-for="st in statusItems" :key="st" :value="st.id">{{ st.text }}</option>
                                </select>
                            </div>
                        </div>
                        <div v-if="formdata.promotion_type === `bogo`" class="row g-3">
                            <div class="col-lg-6 mb-3">
                                <label class="form-label">Store product id</label>
                                <input v-model="formdata.store_product_id" type="number" placeholder="E.g. 123" class="form-control">
                            </div>
                            <div class="col-lg-6 mb-3">
                                <label class="form-label">Quantity</label>
                                <input v-model="formdata.quantity" type="number" placeholder="E.g. 123" class="form-control">
                            </div>
                        </div>
                        <div v-if="formdata.promotion_type === `fg`" class="mb-3">
                            <label class="form-label">Subtotal</label>
                            <input v-model="formdata.subtotal" type="number" step="0.1" placeholder="E.g. 99.60" class="form-control">
                        </div>
                        <div class="mb-3">
                            <label class="form-label">Limited quantity of free products</label>
                            <input v-model="formdata.limited_quantity" type="number" placeholder="E.g. 1" class="form-control">
                        </div>
                        <div class="row">
                            <div class="col-lg-7 col-12 mb-3">
                                <label class="form-label">Type</label>
                                <select v-model="formdata.discount_type" class="form-select">
                                    <option v-for="dt in discountTypes" :key="dt" :value="dt.id">{{ dt.text }}</option>
                                </select>
                            </div>
                            <div class="col-lg-5 col-12 mb-3">
                                <label class="form-label">Value</label>
                                <input v-model="formdata.discount_value" type="number" step="0.1" placeholder="E.g. 10" class="form-control">
                            </div>
                        </div>
                        <button v-if="!editStatus" class="btn btn-primary w-100" type="submit">Create a new promotion</button>
                        <template v-else>
                            <button class="btn btn-primary w-100" type="submit">Update promotion</button>
                            <button @click="resetFormData" class="btn btn-link mt-2 w-100 text-center">Create a new?</button>
                        </template>
                    </form>
                </div>
            </div>
            <div class="col-9">
                <div class="card card-body">
                    <div v-if="!loading">
                        <table v-if="promotions.length > 0" class="table table-hover">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th class="text-center">Group</th>
                                    <th>Title</th>
                                    <th class="text-center">Store PID</th>
                                    <th class="text-center">Qty</th>
                                    <th class="text-center">Limited Qty</th>
                                    <th>Subtotal</th>
                                    <th>Discount</th>
                                    <th class="text-center">Status</th>
                                    <th class="text-end"></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="promo in promotions" :key="promo.id">
                                    <td>{{ promo.id }}</td>
                                    <td class="text-center">{{ promo.group_id }}</td>
                                    <td>{{ promo.title }}</td>
                                    <td class="text-center">
                                        <span v-if="promo.store_product_id" class="text-primary">{{ promo.store_product_id }}</span>
                                        <span v-else class="text-secondary">N/A</span>
                                    </td>
                                    <td class="text-center">
                                        <span v-if="promo.quantity" class="text-primary">{{ promo.quantity }}</span>
                                        <span v-else class="text-secondary">N/A</span>
                                    </td>
                                    <td class="text-center">{{ promo.limited_quantity }}</td>
                                    <td>
                                        <span v-if="promo.subtotal > 0" class="text-primary">${{ moneyFormat(promo.subtotal, 2) }}</span>
                                        <span v-else class="text-secondary">N/A</span>
                                    </td>
                                    <td>
                                        <span class="text-primary">
                                            <template v-if="promo.discount_type === `f`">${{ moneyFormat(promo.discount_value, 2) }}</template>
                                            <template v-else>{{ moneyFormat(promo.discount_value, 0) }}%</template>
                                        </span>
                                    </td>
                                    <td class="text-center">
                                        <svg v-if="+promo.status === 1" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="text-success bi bi-check-circle-fill" viewBox="0 0 16 16">
                                            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
                                        </svg>
                                        <svg v-else xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="text-secondary bi bi-dash-circle-fill" viewBox="0 0 16 16">
                                            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM4.5 7.5a.5.5 0 0 0 0 1h7a.5.5 0 0 0 0-1h-7z"/>
                                        </svg>
                                    </td>
                                    <td class="text-end">
                                        <router-link :to="`/store/promotion/${promo.id}/add-product`" class="btn btn-success btn-sm ms-2">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus" viewBox="0 0 16 16">
                                                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                                            </svg>
                                        </router-link>
                                        <button @click.stop="edit(promo)" class="btn btn-primary btn-sm ms-2">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16">
                                                <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
                                            </svg>
                                        </button>
                                        <button @click.stop="deletePromo(promo.id)" class="btn btn-danger btn-sm ms-2 text-white">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                                                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                                                <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                                            </svg>
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <p v-else class="text-center">There is no promotion.</p>

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
            group_id: undefined,
            id: undefined,
            title: undefined,
            promotion_type: 'fg',
            store_product_id: undefined,
            quantity: 0,
            subtotal: undefined,
            discount_type: 'p',
            discount_value: 0,
            status: 1,
            limited_quantity: 1
        },
        promotionTypes: [
            { id: 'fg', text: 'Free gift' },
            { id: 'bogo', text: 'Buy one get one' }
        ],
        discountTypes: [
            { id: 'p', text: 'Percentage' },
            { id: 'f', text: 'Fixed amount' }
        ],
        statusItems: [
            { id: 1, text: 'Active' },
            { id: 0, text: 'Inactive' }
        ],
        loading: false,
        editStatus: false
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
            this.$store.dispatch('allPromotions', { objParams: params }).then(() => {
                
            }).catch(error => {
                this.$store.commit('setAlert', {
                    'color': 'danger', 
                    'message': error.response.data.message
                })
            }).finally(() => this.loading = false)
        },
        handlePromotion() {
            if(this.editStatus) {
                this.updatePromotion()
            } else {
                this.createPromotion()
            }
        },
        createPromotion() {
            Object.keys(this.formdata).filter(k => this.formdata[k] === "" || !this.formdata[k]).map(k2 => this.formdata[k2] = undefined)
            this.$store.dispatch('createPromotion', this.formdata).then(() => {
                this.$store.commit('setAlert', {
                        'color': 'success', 
                        'message': "Created!"
                    })
                    this.queryListing(this.urlGetAllParams())
                    this.resetFormData()
            }).catch(error => {
                this.$store.commit('setAlert', {
                    'color': 'danger', 
                    'message': error.response.data.message
                })
            })
        },
        updatePromotion() {
            Object.keys(this.formdata).filter(k => this.formdata[k] === "" || !this.formdata[k]).map(k2 => this.formdata[k2] = undefined)
            this.$store.dispatch('updatePromotion', this.formdata).then(() => {
                this.$store.commit('setAlert', {
                        'color': 'success', 
                        'message': "Updated!"
                    })
                    this.queryListing(this.urlGetAllParams())
                    this.resetFormData()
            }).catch(error => {
                this.$store.commit('setAlert', {
                    'color': 'danger', 
                    'message': error.response.data.message
                })
            })
        },
        deletePromo(id) {
            const wConfirm = confirm(`Are you sure you want to delete this promotion?`);
            if(wConfirm) {
                this.$store.dispatch('deletePromotion', id).then(() => {
                    this.$store.commit('setAlert', {
                        'color': 'success', 
                        'message': "Deleted!"
                    })
                    this.queryListing(this.urlGetAllParams())
                }).catch(error => {
                    this.$store.commit('setAlert', {
                        'color': 'danger', 
                        'message': error.response.data.message
                    })
                })
            }
        },
        edit(promo) {
            this.formdata = { ...promo }
            this.editStatus = true
        },
        resetFormData() {
            this.editStatus = false
            this.formdata = {
                id: undefined,
                title: undefined,
                promotion_type: 'fg',
                store_product_id: undefined,
                quantity: 0,
                subtotal: undefined,
                discount_type: 'p',
                discount_value: 0,
                status: 1,
                limited_quantity: 1
            }
        }
    },
    computed: {
        ...mapGetters(['urlGetAllParams', 'urlParamValueFromName', 'moneyFormat']),
        ...mapState({
            profile: state => state.user.profile,
            promotions: state => state.promotion.promotions,
            paginationLinks: state => state.promotion.paginationLinks
        })
    },
}
</script>