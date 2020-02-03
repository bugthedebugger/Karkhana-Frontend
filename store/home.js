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
                        image: "/images/slider-image-1.jpg",
                        cta: "Discover classes"
                    },
                    {
                        title: "The hands are the gateway to the mind.",
                        image: "/images/slider-image-2.jpg",
                        cta: "Find more"
                    },
                    {
                        title: "The world is malleable. We give you the tools to reshape it.",
                        image: "/images/slider-image-3.jpg",
                        cta: "Get started"
                    },
                    {
                        title: "We design learning experiences.",
                        image: "/images/slider-image-4.jpg",
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