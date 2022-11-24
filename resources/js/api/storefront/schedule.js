export default {
    createCron(formdata) {
        return axios.post(`/api/v1/storefront/user/cron/create`, formdata, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('jwt_user')}`
            }
        })
    },
}