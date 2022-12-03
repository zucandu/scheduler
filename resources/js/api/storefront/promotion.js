export default {
    allPromotions(params) {
        const queryStr = params.querystr ? `?${params.querystr}` : ``
        return axios.get(`/api/v1/storefront/user/promotion/all/${queryStr}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('jwt_user')}`
            }
        })
    },
    createPromotion(formdata) {
        return axios.post(`/api/v1/storefront/user/promotion/create`, formdata, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('jwt_user')}`
            }
        })
    },
    updatePromotion(formdata) {
        return axios.post(`/api/v1/storefront/user/promotion/update`, formdata, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('jwt_user')}`
            }
        })
    },
    deletePromotion(id) {
        return axios.get(`/api/v1/storefront/user/promotion/delete/${id}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('jwt_user')}`
            }
        })
    },
    promotionDetails(id) {
        return axios.get(`/api/v1/storefront/user/promotion/${id}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('jwt_user')}`
            }
        })
    },
    addProductsToPromotion(formdata) {
        return axios.post(`/api/v1/storefront/user/promotion/add-products`, formdata, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('jwt_user')}`
            }
        })
    },
}