import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { animalService } from '../api/animalApi';
import { X } from 'lucide-react';

export default function ManageAnimal({ initialData, onClose }) {
    const queryClient = useQueryClient();
    const [formData, setFormData] = useState(initialData || {
        name: '', species: '', location: '', status: 'Healthy'
    });

    const mutation = useMutation({
        mutationFn: (data) => {
            if (initialData) return animalService.update(initialData._id, data);
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
        <div className="fixed inset-0 bg-rose-950/20 backdrop-blur-md flex items-center justify-center p-4 z-50">
            <form onSubmit={handleSubmit} className="bg-white p-10 rounded-[3rem] w-full max-w-md shadow-2xl relative border border-rose-100">
                <button type="button" onClick={onClose} className="absolute top-8 right-8 text-gray-300 hover:text-rose-500 transition-colors">
                    <X size={24} strokeWidth={3} />
                </button>

                <div className="mb-8">
                    <h2 className="text-3xl font-black text-gray-800 leading-tight">
                        {initialData ? 'Update Profile' : 'New Inhabitant'}
                    </h2>
                    <p className="text-rose-400 font-medium text-sm">Fill in the details for our campus friend.</p>
                </div>

                <div className="space-y-6">
                    <div className="group">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-2">Pet Name</label>
                        <input
                            className="w-full mt-1 p-4 bg-gray-50 border-2 border-transparent focus:border-rose-200 focus:bg-white focus:ring-0 rounded-2xl transition-all font-bold text-gray-700 outline-none"
                            placeholder="e.g. Browne"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            required
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-2">Species</label>
                            <input
                                className="w-full mt-1 p-4 bg-gray-50 border-2 border-transparent focus:border-rose-200 focus:bg-white rounded-2xl transition-all font-bold text-gray-700 outline-none"
                                placeholder="Dog/Cat"
                                value={formData.species}
                                onChange={(e) => setFormData({ ...formData, species: e.target.value })}
                                required
                            />
                        </div>
                        <div>
                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-2">Status</label>
                            <select
                                className="w-full mt-1 p-4 bg-gray-50 border-2 border-transparent focus:border-rose-200 focus:bg-white rounded-2xl transition-all font-bold text-gray-700 outline-none appearance-none"
                                value={formData.status}
                                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                            >
                                <option value="Healthy">Healthy</option>
                                <option value="Under Treatment">Under Treatment</option>
                                <option value="Adopted">Adopted</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-2">Last Seen Location</label>
                        <input
                            className="w-full mt-1 p-4 bg-gray-50 border-2 border-transparent focus:border-rose-200 focus:bg-white rounded-2xl transition-all font-bold text-gray-700 outline-none"
                            placeholder="e.g. UP Miagao Library"
                            value={formData.location}
                            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                            required
                        />
                    </div>
                </div>

                <div className="flex gap-4 mt-10">
                    <button type="submit" className="flex-[2] py-5 bg-rose-500 text-white rounded-[1.5rem] font-black shadow-xl shadow-rose-200 hover:bg-rose-600 active:scale-95 transition-all uppercase tracking-widest text-sm">
                        {mutation.isPending ? 'Saving...' : (initialData ? 'Update Records' : 'Register Pet')}
                    </button>
                </div>
            </form>
        </div>
    );
}