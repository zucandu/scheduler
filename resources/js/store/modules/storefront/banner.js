import apiBanner from '@/api/storefront/banner'

// initial state
const state = {
    banners: [],
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
    async AllBanners({ commit }, params) {

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

        commit('SET_BANNERS', await apiBanner.AllBanners(_params))
    },
    async DownloadBanners({ commit }, request) {
        commit('SET_DOWNLOAD', await apiBanner.DownloadBanners(request))
    },
    async setTimer({ commit }, formdata) {
        await apiBanner.setTimer(formdata)
    }, 
}

// mutations is often used to filter results
const mutations = {
    SET_BANNERS(state, res) {
        const { data, links } = res.data.paginator
        state.banners = data
        state.paginationLinks = links
    },
    SET_DOWNLOAD(state, res) {
        state.downloadStatus = { ...res.data }
    },
};

export default { state, getters, actions, mutations }