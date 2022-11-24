import apiGlobal from '@/api/storefront/global'

// initial state
const state = {
    alert: {}
}

// getters
const getters = {
    translation: () => (item, field, locale) => {
        if(!_.isEmpty(item.translations)) {
            return item.translations.find(trans => trans.locale === locale)[field] || {}
        }
    },
    urlGetAllParams: () => (excludingParams = []) => {
        
        // Always ignore just_created: show message 
        // when product have just created
        let __excludingParams = [ ...excludingParams, 'just_created']

        let __params = {}
        let paramstring = window.location.search.substring(1)

        let params = paramstring.split('&')
        params.forEach(p => {
            const [key, value] = p.split('=')
            if(key && __excludingParams.includes(key) === false) {
                __params[key] = value.replace(/\+/g, ' ')
            }
        })
        return __params
    },
    urlParamValueFromName: () => (url, paramName) => {
        if(!url) return undefined
        let objURL = new URL(url)
        return objURL.searchParams.get(paramName)
    },
    moneyFormat: () => (price, decimal) => (+price).toFixed(decimal).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}

// actions 
const actions = {
    
}

// mutations is often used to filter results
const mutations = {
    setAlert(state, response) {
        state.alert = { ...response, time: new Date().getTime() }
    }
};

export default {
    state,
    getters,
    actions,
    mutations
}