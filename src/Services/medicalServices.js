import { Login } from "@mui/icons-material";
import axiosInstance from "./axiosInstance";

const medicalServices = {
    create: async (payload) => {
        try {
            const response = await axiosInstance.post('/medical/services/create', payload);
            return response.data;
        } catch (error) {
            throw error.response.data;         
        }
    },
    fetchAll: async () => {
        try {
            const response = await axiosInstance.get('/medical/services/all');
            return response.data;
        } catch (error) {
            throw error.response.data;
        }
    },
    fetchTotal: async () => {
        try {
            const response = await axiosInstance.get('/medical/services/total');
            return response.data;
        } catch (error) {
            throw error.response.data;
        }
    },
    fetchById: async (id) => {
        try {
            const response = await axiosInstance.get('/medical/services/id/' + id);
            return response.data;
        } catch (error) {
            throw error.response.data;
        }
    },
    update: async (id, payload) => {
        try {
            const response = await axiosInstance.put(`/medical/services/edit/${id}`, payload);
            return response.data;
        } catch (error) {
            throw error.response.data;
        }
    },

};

export default medicalServices;
