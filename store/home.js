import axios from 'axios';

const BASE_URL = 'https://jsonplaceholder.typicode.com';

export const state = () => {
    return {
        data: null
    }
};

export const getters = {
    data: (state) => state.data
};

export const actions = {

    async fetchData({ commit }) {
        // const response = await axios.get(`${BASE_URL}/slider-data`)
        const response = {
            data: {
                sliderImages: [
                    {
                        title: "The best way to predict the future is to invent it.",
                        image: "https://i.imgur.com/jGBNTLO.jpg",
                        cta: "Discover classes"
                    },
                    {
                        title: "The flower that blooms in adversity is the rarest and most beautiful of all.",
                        image: "https://images.unsplash.com/photo-1509062522246-3755977927d7",
                        cta: "Find more"
                    },
                    {
                        title: "Don't be pushed around by the fears in your mind. Be led by the dreams in your heart.",
                        image: "https://images.unsplash.com/photo-1503796627019-324e68809dc3",
                        cta: "Get started"
                    }
                ],
                aboutData: {

                },
                partnersData: {

                }
            }
        }
        commit('storeData', response.data);
    }
};

export const mutations = {
    storeData: (state, data) => state.data = data
};

// export default {
//     state,
//     getters,
//     actions,
//     mutations
// }