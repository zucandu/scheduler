export default {

    AllBanners(params) {
        const queryStr = params.querystr ? `?${params.querystr}` : ``
        return axios.get(`/api/v1/storefront/user/banners/${queryStr}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('jwt_user')}`
            }
        })
    },

    DownloadBanners(request) {
        return axios.get(`/api/v1/storefront/user/download-banners?page=${request.page}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('jwt_user')}`
            }
        })
    },
}