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
}