export default {
    getUserProfile() {
        return axios.post('/api/v1/storefront/user/cron/create', {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('jwt_user')}`
            }
        })
    },
}