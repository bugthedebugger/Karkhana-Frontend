import axios from 'axios';

const BASE_URL = 'https://jsonplaceholder.typicode.com';

const state = {
    sliderData: [],
    lastUpdatedAt: null
};

const getters = {
    sliderData: (state) => state.sliderData
};

const actions = {

    async fetchSliderData({ commit }) {
        const response = await axios.get(`${BASE_URL}/slider-data`)
        commit('storeSliderData', response.data);
    }
};

const mutations = {
    storeSliderData: (state, sliderData) => state.sliderData = sliderData
};

export default {
    state,
    getters,
    actions,
    mutations
}