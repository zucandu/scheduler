export default {

    register(formdata) {
        return axios.post('/api/v1/storefront/register', formdata)
    },
    
    login(formdata) {
        return axios.post('/api/v1/storefront/login', formdata)
    },

    forgotPassword(formdata) {
        return axios.post('/api/v1/storefront/forgot-password', formdata)
    },

    resetPassword(formdata) {
        return axios.post('/api/v1/storefront/reset-password', formdata)
    }

}