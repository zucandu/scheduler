import apiSchedule from '@/api/storefront/schedule'

// initial state
const state = {
    schedules: []
}

// getters
const getters = {
    
}

// actions 
const actions = {
    async allCrons({ commit }) {
        commit('setSchedules', await apiSchedule.allCrons())
    },
    async createCron({ }, formdata) {
        await apiSchedule.createCron(formdata)
    },
    async deleteCron({ }, id) {
        await apiSchedule.deleteCron(id)
    },
}

// mutations is often used to filter results
const mutations = {
    setSchedules(state, response) {
        state.schedules = response.data.schedules
    }
};

export default { state, getters, actions, mutations }