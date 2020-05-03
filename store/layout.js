import axios from 'axios';

export const state = () => {
    return {
        layoutData: null
    }
};

export const getters = {
    layoutData: (state) => state.layoutData
};

export const actions = {

    async nuxtServerInit({ commit }, payload) {
        const response = await axios.get('/pages/landing`');
        console.log(response.data.data);
        commit('storeLayoutData', response.data);
    }
};

export const mutations = {
    storeLayoutData: (state, layoutData) => state.layoutData = layoutData
};

// export default {
//     state,
//     getters,
//     actions,
//     mutations
// }