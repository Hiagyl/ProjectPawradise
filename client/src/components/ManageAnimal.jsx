import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { animalService } from '../api/animalApi';

export default function ManageAnimal({ initialData, onClose }) {
    const queryClient = useQueryClient();
    const [formData, setFormData] = useState(initialData || {
        name: '', species: '', location: '', status: 'Healthy'
    });

    const mutation = useMutation({
        mutationFn: (data) => {
            if (initialData) {
                // Use initialData._id specifically
                return animalService.update(initialData._id, data);
            }
            return animalService.create(data);
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['animals']);
            onClose();
        },
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        mutation.mutate(formData);
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl w-full max-w-md shadow-2xl">
                <h2 className="text-2xl font-bold mb-4">{initialData ? 'Edit Pet' : 'Register New Pet'}</h2>

                <div className="space-y-4">
                    <input
                        className="w-full p-3 border rounded-lg"
                        placeholder="Name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                    />
                    <input
                        className="w-full p-3 border rounded-lg"
                        placeholder="Species (e.g. Dog)"
                        value={formData.species}
                        onChange={(e) => setFormData({ ...formData, species: e.target.value })}
                        required
                    />
                    <input
                        className="w-full p-3 border rounded-lg"
                        placeholder="Location"
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        required
                    />
                    <select
                        className="w-full p-3 border rounded-lg"
                        value={formData.status}
                        onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    >
                        <option value="Healthy">Healthy</option>
                        <option value="Under Treatment">Under Treatment</option>
                        <option value="Adopted">Adopted</option>
                    </select>
                </div>

                <div className="flex gap-3 mt-6">
                    <button type="button" onClick={onClose} className="flex-1 py-2 bg-gray-100 rounded-lg">Cancel</button>
                    <button type="submit" className="flex-1 py-2 bg-blue-600 text-white rounded-lg">
                        {mutation.isPending ? 'Saving...' : 'Save Pet'}
                    </button>
                </div>
            </form>
        </div>
    );
}