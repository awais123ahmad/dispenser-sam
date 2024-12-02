import axiosInstance from "./axiosInstance";

const loginService = {
    fetchAll: async () => {
        try {
            const response = await axiosInstance.get('/dispensers/all');
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    fetchById: async (id) => {
        try {
            const response = await axiosInstance.get(`/dispensers/id/${id}`);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    create: async (payload) => {
        try {
            const response = await axiosInstance.post('/dispensers/register', payload);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    update: async (id, payload) => {
        try {
            const response = await axiosInstance.put(`/dispensers/edit/${id}`, payload);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    delete: async (id) => {
        try {
            const response = await axiosInstance.delete(`/dispensers/delete/${id}`);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    login: async (payload) => {
        try {
            const response = await axiosInstance.post(`/dispensers/login`, payload);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    }
};

export default loginService;
