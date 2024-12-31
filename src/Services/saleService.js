import axiosInstance from "./axiosInstance";

const saleService = {
    create: async (payload) => {
        try {
            const response = await axiosInstance.post('/sale/medicine/create/medicine/quantity', payload);
            return response.data;
        } catch (error) {
            throw error.response.data;
        }
    },

    createServicesSale: async (payload) => {
        try {
            const response = await axiosInstance.post('/sale/medicine/create/medicine/services', payload);
            return response.data;
        } catch (error) {
            throw error.response.data;
        }
    },

    createInvoices: async (payload) => {
        try {
            const response = await axiosInstance.get('/invoices/create', payload);
            return response.data;
        } catch (error) {
            throw error.response.data;
        }
    },

    saveSale: async (payload) => {
        try {
            const response = await axiosInstance.post('/create/medicine/quantity', payload);
            return response.data;
        } catch (error) {
            throw error.response.data;
        }
    },


    save: async (payload) => {
        try {
            const response = await axiosInstance.post('/sales/save', payload);
            return response.data;
        } catch (error) {
            throw error.response.data;
        }
    },
    fetchAllPatients: async () => {
        try {
            const response = await axiosInstance.get('/sales/all');
            return response.data;
        } catch (error) {
            throw error.response.data;
        }
    },
    fetchTotal: async () => {
        try {
            const response = await axiosInstance.get('/sales/total');
            return response.data;
        } catch (error) {
            throw error.response.data;
        }
    },
      updatePatient: async (id, payload) => {
        try {
            const response = await axiosInstance.put(`/sales/edit/${id}`, payload);
            return response.data;
        } catch (error) {
            throw error.response.data;
        }
    },
 };

export default saleService;
