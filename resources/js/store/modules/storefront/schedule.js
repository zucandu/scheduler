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
    async createCron({ commit }, formdata) {
        commit('setSchedules', await apiSchedule.createCron(formdata))
    },
}

// mutations is often used to filter results
const mutations = {
    setSchedules(state, response) {
        state.schedules = response.data.schedules
    }
};

export default { state, getters, actions, mutations }