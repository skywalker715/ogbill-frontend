import React, { useState } from 'react';
import { useBill } from '../context/BillContext';
import { Card } from './ui/Card';
import { Button } from './ui/Button';
import { Input } from './ui/Input';
import { Trash2, Plus } from 'lucide-react';

export function ItemManager() {
    const { items, updateItem, deleteItem, addItem } = useBill();
    const [newItemName, setNewItemName] = useState('');
    const [newItemPrice, setNewItemPrice] = useState('');

    const handleManualAdd = (e) => {
        e.preventDefault();
        if (!newItemName || !newItemPrice) return;
        addItem({ name: newItemName, price: parseFloat(newItemPrice) });
        setNewItemName('');
        setNewItemPrice('');
    };

    const { people, toggleAssignment } = useBill();

    return (
        <div className="space-y-4">
            {items.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                    No items yet. Scan a receipt or add manually below.
                </div>
            ) : (
                items.map(item => (
                    <div key={item.id}>
                        <Card className="flex items-center gap-3 p-3">
                            <div className="flex-1 space-y-1">
                                <Input
                                    value={item.name}
                                    onChange={(e) => updateItem(item.id, { name: e.target.value })}
                                    className="text-sm font-medium border-none shadow-none p-0 focus:ring-0 bg-transparent"
                                    placeholder="Item Name"
                                />
                                <div className="flex items-center gap-1">
                                    <span className="text-gray-400 text-sm">$</span>
                                    <Input
                                        type="number"
                                        value={item.price}
                                        onChange={(e) => updateItem(item.id, { price: parseFloat(e.target.value) })}
                                        className="text-sm text-gray-600 border-none shadow-none p-0 focus:ring-0 w-20 bg-transparent"
                                        placeholder="0.00"
                                    />
                                </div>
                            </div>
                            {/* Delete Button */}
                            <Button variant="ghost" onClick={() => deleteItem(item.id)} className="text-red-400 hover:text-red-600 hover:bg-red-50 p-2">
                                <Trash2 size={18} />
                            </Button>
                        </Card>

                        {/* Assignment Section */}
                        <div className="flex flex-wrap gap-1 mt-2 pl-2">
                            {people.map(person => {
                                const isAssigned = item.assignedTo.includes(person.id);
                                return (
                                    <button
                                        key={person.id}
                                        onClick={() => toggleAssignment(item.id, person.id)}
                                        className={`text-xs px-2 py-1 rounded-full border transition-all ${isAssigned
                                                ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                                                : 'bg-white text-gray-500 border-gray-200 hover:border-blue-300'
                                            }`}
                                    >
                                        {person.name}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                ))
            )}

            {/* Manual Add Form */}
            <form onSubmit={handleManualAdd} className="mt-6 pt-4 border-t border-gray-200">
                <h3 className="text-sm font-semibold text-gray-700 mb-3">Add Item Manually</h3>
                <div className="flex gap-2">
                    <Input
                        placeholder="Item Name"
                        value={newItemName}
                        onChange={(e) => setNewItemName(e.target.value)}
                        className="flex-1"
                    />
                    <Input
                        type="number"
                        placeholder="Price"
                        value={newItemPrice}
                        onChange={(e) => setNewItemPrice(e.target.value)}
                        className="w-24"
                    />
                    <Button type="submit" variant="secondary" className="px-3">
                        <Plus size={20} />
                    </Button>
                </div>
            </form>
        </div>
    );
}
