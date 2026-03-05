import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { animalService } from '../api/animalApi';
import { Trash2, Archive, Edit3, Plus } from 'lucide-react';
import ManageAnimal from './ManageAnimal';



export default function AnimalList() {
    const queryClient = useQueryClient();
    const [editingPet, setEditingPet] = useState(null);
    const [isAdding, setIsAdding] = useState(false);

    const { data: animals, isLoading } = useQuery({
        queryKey: ['animals'],
        queryFn: animalService.getAll,
    });

    // Mutations for Deleting
    const softDelete = useMutation({
        mutationFn: animalService.archive,
        onSuccess: () => queryClient.invalidateQueries(['animals']),
    });

    const hardDelete = useMutation({
        mutationFn: animalService.remove,
        onSuccess: () => queryClient.invalidateQueries(['animals']),
    });

    if (isLoading) return <div className="text-center p-10">Loading...</div>;

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold text-gray-800">Campus Inhabitants</h2>
                <button
                    onClick={() => setIsAdding(true)}
                    className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                >
                    <Plus size={20} /> Add Pet
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {animals?.map((animal) => (
                    <div key={animal._id} className="bg-white p-5 rounded-2xl shadow-sm border group">
                        <div className="flex justify-between items-start">
                            <div>
                                <h3 className="font-bold text-lg">{animal.name}</h3>
                                <p className="text-gray-500 text-sm">{animal.species} • {animal.location}</p>
                            </div>
                            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button onClick={() => setEditingPet(animal)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"><Edit3 size={18} /></button>
                                <button onClick={() => softDelete.mutate(animal._id)} className="p-2 text-amber-600 hover:bg-amber-50 rounded-lg"><Archive size={18} /></button>
                                <button onClick={() => { if (confirm('Delete permanently?')) hardDelete.mutate(animal._id) }} className="p-2 text-red-600 hover:bg-red-50 rounded-lg"><Trash2 size={18} /></button>
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