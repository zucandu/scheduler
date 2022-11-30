import apiProduct from '@/api/storefront/product'

// initial state
const state = {
    products: [],
    paginationLinks: [],
    downloadStatus: {
        total: 0,
        current: 0
    }
}

// getters
const getters = { }

// actions 
const actions = {
    async AllProducts({ commit }, params) {

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

        commit('SET_PRODUCTS', await apiProduct.AllProducts(_params))
    },
    async DownloadProducts({ commit }, request) {
        commit('SET_DOWNLOAD', await apiProduct.DownloadProducts(request))
    }
}

// mutations is often used to filter results
const mutations = {
    SET_PRODUCTS(state, res) {
        const { data, links } = res.data.paginator
        state.products = data
        state.paginationLinks = links
    },
    SET_DOWNLOAD(state, res) {
        state.downloadStatus = { ...res.data }
    },
};

export default { state, getters, actions, mutations }