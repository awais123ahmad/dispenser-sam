import axiosInstance from "./axiosInstance";

const doctorService = {
    create: async (payload) => {
        try {
            const response = await axiosInstance.post('/doctor/create', payload);
            return response.data;
        } catch (error) {
            throw error.response.data;
        }
    },
    fetchAllDoctors: async () => {
        try {
            const response = await axiosInstance.get('/doctor/for/all');
            return response.data;
        } catch (error) {
            throw error.response.data;
        }
    },
    fetchTotal: async () => {
        try {
            const response = await axiosInstance.get('/doctor/total');
            return response.data;
        } catch (error) {
            throw error.response.data;
        }
    },
    fetchPatientById: async (id) => {
        try {
            const response = await axiosInstance.get('/doctor/id/' + id);
            return response.data;
        } catch (error) {
            throw error.response.data;
        }
    },
    update: async (id, payload) => {
        try {
            const response = await axiosInstance.put(`/doctor/update/${id}`, payload);
            return response.data;
        } catch (error) {
            throw error.response.data;
        }
    },
};

export default doctorService;
