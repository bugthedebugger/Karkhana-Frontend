import axios from 'axios';

const BASE_URL = 'https://jsonplaceholder.typicode.com';

const state = {
    locale: "en",
    lastUpdatedAt: null
};

const getters = {
    locale: (state) => state.locale
};

const actions = {

    async fetchSliderData({ commit }) {
        const response = await axios.get(`${BASE_URL}/slider-data`)
        commit('storeSliderData', response.data);
    }
};

const mutations = {
    setLocale: (state, locale) => state.locale = locale
};

export default {
    state,
    getters,
    actions,
    mutations
}