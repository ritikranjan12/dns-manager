
"use client"
import React, { useState } from 'react';

const DnsBulkPopup = ({ BulkDNSUpdate, setIsBulkDNSOpen }: any) => {
    const [file, setFile] = useState<File>();

    const handleCreateDnsRecord = async () => {
        try {
            const data = await BulkDNSUpdate(file);
            console.log('Domain created:', data);
            window.location.href = '/';
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <main className="bg-black flex items-center justify-center h-screen">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
                <div className="flex flex-col items-center">
                    <div className="text-2xl font-semibold mb-2">Upload Bulk DNS Record</div>
                </div>
                <div>
                    <div className="mb-4">
                        <label htmlFor="file" className="block text-zinc-700 text-sm font-bold mb-2">File</label>
                        <input
                         //   @ts-ignore
                            onChange={(e) => setFile(e.target.files && e.target.files[0])}
                            type="file"
                            id="file"
                            name="file"
                            required
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-zinc-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    <div className='flex'>
                        <div className="flex items-center justify-between mb-6 mx-2">
                            <button
                                onClick={handleCreateDnsRecord}
                                className="bg-black text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                type="button"
                            >
                                Submit
                            </button>
                        </div>
                        <div className="flex items-center justify-between mb-6">
                            <button
                                onClick={() => setIsBulkDNSOpen(false)}
                                className="bg-black text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                type="button"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default DnsBulkPopup;
