export default {

    AllProducts(params) {
        const queryStr = params.querystr ? `?${params.querystr}` : ``
        return axios.get(`/api/v1/storefront/user/products/${queryStr}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('jwt_user')}`
            }
        })
    },

    DownloadProducts(request) {
        return axios.get(`/api/v1/storefront/user/download-products?page=${request.page}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('jwt_user')}`
            }
        })
    },
}