import axios from 'axios';

// Create an instance so we don't have to type the URL every time
const api = axios.create({
    baseURL: 'http://localhost:5000/api/animals',
});

export const animalService = {
    // GET: Fetch all active animals
    getAll: async () => {
        const response = await api.get('/');
        return response.data;
    },

    // POST: Create a new animal
    create: async (data) => {
        const response = await api.post('/', data);
        return response.data;
    },

    // PUT: Update an existing animal
    update: async (id, data) => {
        const response = await api.put(`/${id}`, data);
        return response.data;
    },

    // PATCH: Soft delete (Archive)
    archive: async (id) => {
        const response = await api.patch(`/${id}/soft`);
        return response.data;
    },

    // DELETE: Hard delete (Permanent)
    remove: async (id) => {
        const response = await api.delete(`/${id}`);
        return response.data;
    }
};