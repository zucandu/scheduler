export default {
    allCrons() {
        return axios.get(`/api/v1/storefront/user/cron/all`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('jwt_user')}`
            }
        })
    },
    createCron(formdata) {
        return axios.post(`/api/v1/storefront/user/cron/create`, formdata, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('jwt_user')}`
            }
        })
    },
    updateCron(formdata) {
        return axios.post(`/api/v1/storefront/user/cron/update`, formdata, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('jwt_user')}`
            }
        })
    },
    deleteCron(id) {
        return axios.get(`/api/v1/storefront/user/cron/delete/${id}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('jwt_user')}`
            }
        })
    },
    allScheduleSalesPrice() {
        return axios.get(`/api/v1/storefront/user/schedule/all-sales-price`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('jwt_user')}`
            }
        })
    },
    createScheduleSalesPrice(formdata) {
        return axios.post(`/api/v1/storefront/user/schedule/create-sales-price`, formdata, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('jwt_user')}`
            }
        })
    },
    deleteScheduleSalesPrice(id) {
        return axios.get(`/api/v1/storefront/user/schedule/delete/${id}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('jwt_user')}`
            }
        })
    },

}