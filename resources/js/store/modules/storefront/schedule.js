import apiSchedule from '@/api/storefront/schedule'

// initial state
const state = {
    schedules: [],
    schedule_sales_prices: []
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
    }
}

// mutations is often used to filter results
const mutations = {
    setSchedules(state, response) {
        state.schedules = response.data.schedules
    },
    setScheduleSalesPrice(state, response) {
        state.schedule_sales_price = response.data.schedule_sales_price
    }
};

export default { state, getters, actions, mutations }