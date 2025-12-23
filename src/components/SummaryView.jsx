import React from 'react';
import { useBill } from '../context/BillContext';
import { Card } from './ui/Card';
import { Input } from './ui/Input';
import { Button } from './ui/Button';
import { Share2 } from 'lucide-react';

export function SummaryView() {
    const { people, items, taxRate, setTaxRate, tipPercent, setTipPercent } = useBill();

    const totals = people.map(person => {
        let subtotal = 0;

        items.forEach(item => {
            if (item.assignedTo.includes(person.id)) {
                subtotal += item.price / item.assignedTo.length;
            }
        });

        const taxAmount = subtotal * (taxRate / 100);
        const tipAmount = subtotal * (tipPercent / 100);

        return {
            ...person,
            subtotal,
            taxAmount,
            tipAmount,
            total: subtotal + taxAmount + tipAmount
        };
    });

    const unassignedTotal = items
        .filter(i => i.assignedTo.length === 0)
        .reduce((sum, i) => sum + i.price, 0);

    const grandTotal = totals.reduce((sum, p) => sum + p.total, 0) + unassignedTotal; // Basic sum check

    const handleShare = () => {
        const text = totals.map(p => `${p.name}: $${p.total.toFixed(2)}`).join('\n');
        const url = `https://wa.me/?text=${encodeURIComponent("Bill Split:\n" + text)}`;
        window.open(url, '_blank');
    };

    if (people.length === 0 && items.length === 0) return null;

    return (
        <div className="mt-8 pt-6 border-t border-gray-200">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Summary</h2>

            {/* Global Settings */}
            <div className="flex gap-4 mb-6">
                <label className="flex-1">
                    <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Tax %</span>
                    <Input
                        type="number"
                        value={taxRate}
                        onChange={(e) => setTaxRate(parseFloat(e.target.value) || 0)}
                        className="mt-1"
                    />
                </label>
                <label className="flex-1">
                    <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Tip %</span>
                    <Input
                        type="number"
                        value={tipPercent}
                        onChange={(e) => setTipPercent(parseFloat(e.target.value) || 0)}
                        className="mt-1"
                    />
                </label>
            </div>

            {unassignedTotal > 0 && (
                <div className="mb-4 p-3 bg-yellow-50 text-yellow-800 text-sm rounded-lg border border-yellow-200">
                    Warning: ${unassignedTotal.toFixed(2)} worth of items are unassigned!
                </div>
            )}

            <div className="space-y-3">
                {totals.map(person => (
                    <Card key={person.id} className="flex justify-between items-center p-4 bg-blue-50 border-blue-100">
                        <div>
                            <div className="font-bold text-lg text-gray-900">{person.name}</div>
                            <div className="text-xs text-gray-500">
                                Sub: ${person.subtotal.toFixed(2)} | Tax: ${person.taxAmount.toFixed(2)} | Tip: ${person.tipAmount.toFixed(2)}
                            </div>
                        </div>
                        <div className="text-xl font-bold text-blue-600">
                            ${person.total.toFixed(2)}
                        </div>
                    </Card>
                ))}
            </div>

            <div className="mt-6">
                <Button onClick={handleShare} className="w-full flex items-center justify-center gap-2">
                    <Share2 size={20} />
                    Share via WhatsApp
                </Button>
            </div>

            <div className="mt-8 h-8"></div>
        </div>
    );
}
