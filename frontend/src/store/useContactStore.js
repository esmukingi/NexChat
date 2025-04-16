// useContactStore.js
import { create } from 'zustand';
import { axiosInstance } from '../lib/axios';
import toast from 'react-hot-toast';

const useContactStore = create((set, get) => ({
  formData: {
    name: '',
    email: '',
    message: '',
  },
  formStatus: null, // 'loading', 'success', 'error'

  setFormData: (data) => set({ formData: data }),
  setFormStatus: (status) => set({ formStatus: status }),

  submitForm: async () => {
    const { formData } = get();
    set({ formStatus: 'loading' });

    try {
      const response = await axiosInstance.post('/contacts/contact', formData);

      if (response.status === 200 || response.status === 201) {
        set({ formStatus: 'success' });
        set({
          formData: {
            name: '',
            email: '',
            message: '',
          },
        });
      } else {
        throw new Error('Unexpected response');
      }
    } catch (error) {
      console.error('Form submission failed:', error);
      toast.error('Contact submision failed')
      set({ formStatus: 'error' });
    } finally {
      setTimeout(() => set({ formStatus: null }), 3000);
    }
  },
}));

export default useContactStore;
