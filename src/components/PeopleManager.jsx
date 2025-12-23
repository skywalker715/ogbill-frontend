import React, { useState } from 'react';
import { useBill } from '../context/BillContext';
import { Input } from './ui/Input';
import { Button } from './ui/Button';
import { X, UserPlus, Users } from 'lucide-react';

export function PeopleManager() {
    const { people, addPerson, removePerson } = useBill();
    const [name, setName] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name.trim()) return;
        addPerson(name.trim());
        setName('');
    };

    return (
        <div className="mb-6 p-4 bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center gap-2 mb-3 text-gray-700 font-semibold">
                <Users size={20} />
                <h2>People</h2>
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
                {people.map(person => (
                    <div key={person.id} className="flex items-center gap-1 bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-medium border border-blue-100 animate-in fade-in zoom-in duration-200">
                        {person.name}
                        <button
                            onClick={() => removePerson(person.id)}
                            className="text-blue-400 hover:text-blue-600 rounded-full p-0.5 hover:bg-blue-200 transition-colors"
                        >
                            <X size={14} />
                        </button>
                    </div>
                ))}
                {people.length === 0 && <span className="text-gray-400 text-sm italic">Add people to split with...</span>}
            </div>

            <form onSubmit={handleSubmit} className="flex gap-2">
                <Input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Add person (e.g. Alice)"
                    className="text-sm"
                />
                <Button type="submit" variant="secondary" size="md" className="px-3">
                    <UserPlus size={20} />
                </Button>
            </form>
        </div>
    );
}
