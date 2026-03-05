import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { animalService } from '../api/animalApi';
import { Trash2, Archive, Edit3, Plus, MapPin, Heart } from 'lucide-react';
import ManageAnimal from './ManageAnimal';

export default function AnimalList() {
    const queryClient = useQueryClient();
    const [editingPet, setEditingPet] = useState(null);
    const [isAdding, setIsAdding] = useState(false);

    const { data: animals, isLoading } = useQuery({
        queryKey: ['animals'],
        queryFn: animalService.getAll,
    });

    // --- Helper Function (Inside Component Scope) ---
    const getStatusColor = (status) => {
        switch (status) {
            case 'Healthy': return 'bg-green-100 text-green-700 border-green-200';
            case 'Under Treatment': return 'bg-amber-100 text-amber-700 border-amber-200';
            case 'Adopted': return 'bg-rose-100 text-rose-700 border-rose-200';
            default: return 'bg-gray-100 text-gray-700 border-gray-200';
        }
    };

    const softDelete = useMutation({
        mutationFn: animalService.archive,
        onSuccess: () => queryClient.invalidateQueries(['animals']),
    });

    const hardDelete = useMutation({
        mutationFn: animalService.remove,
        onSuccess: () => queryClient.invalidateQueries(['animals']),
    });

    if (isLoading) return (
        <div className="flex flex-col items-center justify-center p-20">
            <div className="animate-bounce text-5xl mb-4">🐱</div>
            <p className="text-rose-400 font-bold animate-pulse">Scanning campus for friends...</p>
        </div>
    );

    return (
        <div className="p-2">
            <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-4">
                <div>
                    <h2 className="text-3xl font-black text-gray-800">Inhabitants</h2>
                    <p className="text-gray-500 font-medium">Monitoring {animals?.length || 0} fur-babies on campus</p>
                </div>
                <button
                    onClick={() => setIsAdding(true)}
                    className="flex items-center gap-2 bg-rose-500 text-white px-8 py-4 rounded-2xl font-black shadow-lg shadow-rose-200 hover:bg-rose-600 hover:-translate-y-1 transition-all active:scale-95"
                >
                    <Plus size={22} strokeWidth={3} /> Register New Pet
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {animals?.map((animal) => (
                    <div key={animal._id} className="bg-white p-6 rounded-[2.5rem] border border-rose-50 shadow-sm hover:shadow-2xl hover:shadow-rose-100/40 transition-all group relative">

                        {/* Status Badge */}
                        <div className={`absolute top-6 right-6 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider border ${getStatusColor(animal.status)}`}>
                            {animal.status}
                        </div>

                        <div className="space-y-4">
                            <div className="w-14 h-14 bg-rose-50 rounded-3xl flex items-center justify-center text-3xl shadow-inner">
                                {animal.species?.toLowerCase().includes('cat') ? '🐱' : '🐶'}
                            </div>

                            <div>
                                <h3 className="font-black text-2xl text-gray-800 leading-tight">{animal.name}</h3>
                                <div className="flex flex-wrap items-center gap-2 mt-2">
                                    <span className="bg-rose-50 text-rose-600 text-xs font-bold px-3 py-1 rounded-lg uppercase">{animal.species}</span>
                                    <span className="text-gray-300">|</span>
                                    <span className="flex items-center gap-1 text-gray-500 text-sm font-medium">
                                        <MapPin size={14} className="text-rose-300" /> {animal.location}
                                    </span>
                                </div>
                            </div>

                            <div className="pt-6 flex gap-3 border-t border-gray-50 opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0">
                                <button onClick={() => setEditingPet(animal)} className="flex-1 flex justify-center py-3 bg-gray-50 text-gray-700 hover:bg-rose-50 hover:text-rose-600 rounded-2xl transition-all font-bold text-sm gap-2 items-center">
                                    <Edit3 size={16} /> Edit
                                </button>
                                <button onClick={() => softDelete.mutate(animal._id)} className="p-3 text-amber-500 hover:bg-amber-50 rounded-2xl transition-colors" title="Archive">
                                    <Archive size={20} />
                                </button>
                                <button onClick={() => { if (confirm('Remove this pet forever?')) hardDelete.mutate(animal._id) }} className="p-3 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-2xl transition-colors">
                                    <Trash2 size={20} />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modals */}
            {isAdding && <ManageAnimal onClose={() => setIsAdding(false)} />}
            {editingPet && <ManageAnimal initialData={editingPet} onClose={() => setEditingPet(null)} />}
        </div>
    );
}