import apiPromotion from '@/api/storefront/promotion'

// initial state
const state = {
    promotions: [],
    paginationLinks: [],
    promotionDetails: {}
}

// getters
const getters = { }

// actions 
const actions = {
    async allPromotions({ commit }, params) {

        let _params = {
            querystr: ''
        }
        let temp = []
        if(params.objParams && Object.keys(params.objParams).length > 0) {
            for (const [key, value] of Object.entries(params.objParams)) {
                temp = [ ...temp, `${key}=${value}`]
            }
        }
        _params.querystr = temp.join('&')

        commit('SET_PROMO', await apiPromotion.allPromotions(_params))
    },
    async createPromotion({ }, formdata) {
        await apiPromotion.createPromotion(formdata)
    },
    async updatePromotion({ }, formdata) {
        await apiPromotion.updatePromotion(formdata)
    },
    async deletePromotion({ }, id) {
        await apiPromotion.deletePromotion(id)
    },
    async promotionDetails({ commit }, id) {
        commit('SET_PROMO_DETAILS', await apiPromotion.promotionDetails(id))
    },
    async addProductsToPromotion({ }, formdata) {
        await apiPromotion.addProductsToPromotion(formdata)
    },
}

// mutations is often used to filter results
const mutations = {
    SET_PROMO(state, res) {
        const { data, links } = res.data.paginator
        state.promotions = data
        state.paginationLinks = links
    },
    SET_PROMO_DETAILS(state, res) {
        state.promotionDetails = res.data.promotion
    },
};

export default { state, getters, actions, mutations }