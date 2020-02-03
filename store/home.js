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
                        title: "Makers Today, Shapers of Tomorrow.",
                        image: "https://i.imgur.com/jGBNTLO.jpg",
                        cta: "Discover classes"
                    },
                    {
                        title: "The hands are the gateway to the mind.",
                        image: "https://images.unsplash.com/photo-1509062522246-3755977927d7",
                        cta: "Find more"
                    },
                    {
                        title: "The world is malleable. We give you the tools to reshape it.",
                        image: "https://images.unsplash.com/photo-1503796627019-324e68809dc3",
                        cta: "Get started"
                    },
                    {
                        title: "We design learning experiences.",
                        image: "https://images.unsplash.com/photo-1509062522246-3755977927d7",
                        cta: "Find more"
                    },
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