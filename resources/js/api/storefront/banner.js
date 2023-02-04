export default {

    AllBanners(params) {
        const queryStr = params.querystr ? `?${params.querystr}` : ``
        return axios.get(`/api/v1/storefront/user/banner/all${queryStr}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('jwt_user')}`
            }
        })
    },

    DownloadBanners(request) {
        return axios.get(`/api/v1/storefront/user/banner/download?page=${request.page}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('jwt_user')}`
            }
        })
    },

    setTimer(formdata) {
        return axios.post(`/api/v1/storefront/user/banner/schedule`, formdata, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('jwt_user')}`
            }
        })
    },
}