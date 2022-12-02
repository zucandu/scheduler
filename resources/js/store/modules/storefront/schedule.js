import apiSchedule from '@/api/storefront/schedule'

// initial state
const state = {
    schedules: [],
    scheduleSalesPrice: []
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
    async updateCron({ }, formdata) {
        await apiSchedule.updateCron(formdata)
    },
    async deleteCron({ }, id) {
        await apiSchedule.deleteCron(id)
    },
    async allScheduleSalesPrice({ commit }) {
        commit('setScheduleSalesPrice', await apiSchedule.allScheduleSalesPrice())
    },
    async createScheduleSalesPrice({ commit }, formdata) {
        commit('setScheduleSalesPrice', await apiSchedule.createScheduleSalesPrice(formdata))
    },
    async deleteScheduleSalesPrice({ }, id) {
        await apiSchedule.deleteScheduleSalesPrice(id)
    },
    async AddProducts2Schedule({ }, formdata) {
        await apiSchedule.AddProducts2Schedule(formdata)
    },
}

// mutations is often used to filter results
const mutations = {
    setSchedules(state, response) {
        state.schedules = response.data.schedules
    },
    setScheduleSalesPrice(state, response) {
        state.scheduleSalesPrice = response.data.schedule_sales_price
    }
};

export default { state, getters, actions, mutations }