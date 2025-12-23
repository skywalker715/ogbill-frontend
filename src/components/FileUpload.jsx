import React, { useState } from 'react';
import { Button } from './ui/Button';
import { parseBillText } from '../utils/billParser';
import { useBill } from '../context/BillContext';
import { Loader2, Camera } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export function FileUpload() {
    const [scanning, setScanning] = useState(false);
    const { addItem } = useBill();

    const handleFile = async (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setScanning(true);

        // Convert to Base64
        const reader = new FileReader();
        reader.onload = async () => {
            try {
                const base64Image = reader.result;

                const response = await fetch(`${API_URL}/analyze`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ image: base64Image })
                });

                if (!response.ok) throw new Error('Server error');
                const data = await response.json();

                if (data.error) throw new Error(data.error);

                // Parse the returned text (Florence-2 <OCR> output)
                const items = parseBillText(data.text);

                if (items.length === 0) {
                    alert("No items detected. Try manual entry.");
                }
                items.forEach(addItem);

            } catch (err) {
                console.error(err);
                alert(`Error: ${err.message || 'Failed to analyze receipt'}`);
            } finally {
                setScanning(false);
            }
        };
        reader.onerror = () => {
            setScanning(false);
            alert("Failed to read file");
        };
        reader.readAsDataURL(file);
    };

    return (
        <div className="mb-6">
            <input
                type="file"
                accept="image/*"
                id="camera-input"
                className="hidden"
                onChange={handleFile}
            />
            <label htmlFor="camera-input" className="block w-full">
                <div
                    className={`flex items-center justify-center gap-2 p-4 rounded-xl border-2 border-dashed border-blue-300 bg-blue-50 text-blue-700 font-medium cursor-pointer hover:bg-blue-100 transition-colors ${scanning ? 'opacity-70' : ''}`}
                >
                    {scanning ? <Loader2 className="animate-spin" /> : <Camera />}
                    {scanning ? 'Analyzing Receipt...' : 'Scan Receipt'}
                </div>
            </label>
        </div>
    );
}
