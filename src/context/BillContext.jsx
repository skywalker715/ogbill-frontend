import React, { createContext, useContext, useState, useMemo } from 'react';

const BillContext = createContext();

export function BillProvider({ children }) {
    // items: { id: string, name: string, price: number, quantity: number, assignedTo: string[] }[]
    const [items, setItems] = useState([]);

    // people: { id: string, name: string }[]
    const [people, setPeople] = useState([]);

    const [taxRate, setTaxRate] = useState(0);
    const [tipPercent, setTipPercent] = useState(0);

    const addItem = (item) => {
        setItems(prev => [...prev, {
            ...item,
            id: item.id || crypto.randomUUID(),
            assignedTo: [],
            quantity: item.quantity || 1,
            price: Number(item.price) || 0
        }]);
    };

    const updateItem = (id, updates) => {
        setItems(prev => prev.map(i => i.id === id ? { ...i, ...updates } : i));
    };

    const deleteItem = (id) => {
        setItems(prev => prev.filter(i => i.id !== id));
    };

    const addPerson = (name) => {
        const newPerson = { id: crypto.randomUUID(), name };
        setPeople(prev => [...prev, newPerson]);
        return newPerson;
    };

    const removePerson = (id) => {
        setPeople(prev => prev.filter(p => p.id !== id));
        // Remove assertions
        setItems(prev => prev.map(item => ({
            ...item,
            assignedTo: item.assignedTo.filter(pId => pId !== id)
        })));
    };

    const toggleAssignment = (itemId, personId) => {
        setItems(prev => prev.map(item => {
            if (item.id !== itemId) return item;
            const isAssigned = item.assignedTo.includes(personId);
            return {
                ...item,
                assignedTo: isAssigned
                    ? item.assignedTo.filter(id => id !== personId)
                    : [...item.assignedTo, personId]
            };
        }));
    };

    const value = useMemo(() => ({
        items, people, taxRate, tipPercent,
        setItems, setPeople, setTaxRate, setTipPercent,
        addItem, updateItem, deleteItem,
        addPerson, removePerson,
        toggleAssignment
    }), [items, people, taxRate, tipPercent]);

    return <BillContext.Provider value={value}>{children}</BillContext.Provider>;
}

export const useBill = () => {
    const context = useContext(BillContext);
    if (!context) throw new Error('useBill must be used within a BillProvider');
    return context;
};
