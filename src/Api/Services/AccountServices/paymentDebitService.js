import axiosInstance from "../axiosInstance";

const debitService = {


  getAllDebit: async () => {
    try {
      const response = await axiosInstance.get('/paymentDebits');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

};
export default debitService;