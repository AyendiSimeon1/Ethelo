"use client"
import { useState } from 'react';

export default function Sidebar() {
    const [employmentType, setEmploymentType] = useState('');

    return (
        <div className="space-y-6">
            
            <div className="p-6 bg-black text-white rounded-lg shadow-md">
                <h2 className="text-lg font-semibold mb-2">Find Oppurtunuies</h2>
                <button className="text-gray-600">Learn More</button>
            </div>


            <div className="p-6 bg-white rounded-lg shadow-md">
                <h3 className="text-md font-semibold mb-4">Employment Type</h3>
                <form className="space-y-3">
                    <label className="flex items-center space-x-3">
                        <input
                            type="radio"
                            name="employment"
                            value="full-time"
                            checked={employmentType === 'full-time'}
                            onChange={() => setEmploymentType('full-time')}
                            className="text-indigo-600 focus:ring-indigo-500"
                        />
                        <span>Full-Time</span>
                    </label>
                    <label className="flex items-center space-x-3">
                        <input
                            type="radio"
                            name="employment"
                            value="part-time"
                            checked={employmentType === 'part-time'}
                            onChange={() => setEmploymentType('part-time')}
                            className="text-indigo-600 focus:ring-indigo-500"
                        />
                        <span>Part-Time</span>
                    </label>
                    <label className="flex items-center space-x-3">
                        <input
                            type="radio"
                            name="employment"
                            value="contract"
                            checked={employmentType === 'contract'}
                            onChange={() => setEmploymentType('contract')}
                            className="text-indigo-600 focus:ring-indigo-500"
                        />
                        <span>Contract</span>
                    </label>
                </form>
            </div>
        </div>
    );
}
