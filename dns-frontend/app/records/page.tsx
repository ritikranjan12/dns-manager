"use client"
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
    listHostedZones,
    createDNSRecord,
    updateDNSRecord,
    deleteDNSRecord
} from './page.server'
import CreateDNSRecordPopup from "@/components/DnsPopup";
import Navbar from "@/components/Navbar";
const TABLE_HEAD = ["Domain Name", "Type", "Value", ""];
const Records = () => {
    const [isPopupOpen, setIsPopupOpen] = useState(false)
    const router = useSearchParams();
    const code = router.get("code");
    const title = router.get("title");
    const [dnsRecords, setDNSRecords] = useState([]);
    const [recordToUpdate, setRecordToUpdate] = useState(null);
    const fetchDNSRecords = useCallback(async () => {
        try {
            const data = await listHostedZones(code);
            setDNSRecords(data);
        } catch (error) {
            console.error(error);
        }
    }, [code]);

    useMemo(() => {
        fetchDNSRecords();

    }, [fetchDNSRecords]);

    const handleCreateOrUpdateDNSRecord = async ({ recordData, ttl }: any) => {
        console.log(recordData, ttl, code)
        console.log(recordToUpdate)
        try {
            if (recordToUpdate) {
                await updateDNSRecord({ id: code, dnsRecordData: recordData, ttl, code });
            } else {
                await createDNSRecord({ dnsRecordData: recordData, code });
            }
            fetchDNSRecords();
            setRecordToUpdate(null);
        } catch (error) {
            console.error(error);
        }
    };

    const handleDeleteDNSRecord = async (record: any) => {
        try {
            await deleteDNSRecord({ id: code, record, code });
            fetchDNSRecords();
        } catch (error) {
            console.error(error);
        }
    };
    return (
        <>
            <div>
                <nav className="bg-black p-4">
                    <div className="container mx-auto flex justify-between items-center">
                        <h1 className="text-xl font-bold text-white">DNS Records Dashboard</h1>
                    </div>
                </nav>
            </div>
            {!isPopupOpen ?
                <div className="container mx-auto p-4">
                    <div className="rounded-lg overflow-hidden bg-white shadow-lg">
                        <div className="flex flex-col md:flex-row items-center justify-between p-4 border-b border-gray-200">
                            <div className="w-full md:w-1/3 mb-4 md:mb-0">
                                <div className="flex flex-row justify-center md:justify-start space-x-4">
                                    <button
                                        className="bg-black text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                        onClick={() => setIsPopupOpen(true)}
                                    >
                                        Create Record
                                    </button>
                                    <button
                                        className="bg-black text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                        onClick={() => window.location.href = '/'}
                                    >
                                        Back to Zones
                                    </button>
                                </div>
                            </div>
                            <div className="text-2xl text-gray-700 px-2">
                                <h1>{title}</h1>
                            </div>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full table-auto">
                                <thead>
                                    <tr className="bg-gray-100">
                                        {TABLE_HEAD.map((head, index) => (
                                            <th key={index} className="px-4 py-2 text-sm font-semibold text-gray-700">
                                                {head}
                                            </th>
                                        ))}
                                        <th className="px-4 py-2"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {dnsRecords?.length > 0 ? (
                                        dnsRecords.map((record, index) => (
                                            <tr key={index} className="border-b border-gray-200">
                                                {/* @ts-ignore */}
                                                <td className="px-4 py-2">{record.Name}</td>
                                                {/* @ts-ignore */}
                                                <td className="px-4 py-2">{record.Type}</td>
                                                {/* @ts-ignore */}
                                                <td className="px-4 py-2">{record.ResourceRecords[0].Value}</td>
                                                <td className="px-4 py-2">
                                                    <div className="flex items-center space-x-2">
                                                        <button
                                                            onClick={() => {
                                                                setRecordToUpdate(record);
                                                                setIsPopupOpen(true);
                                                            }}
                                                            className="bg-black text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                                        >
                                                            Update
                                                        </button>
                                                        <button
                                                            onClick={() => handleDeleteDNSRecord(record)}
                                                            className="bg-black text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                                        >
                                                            Delete
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan={TABLE_HEAD.length + 1} className="px-4 py-2 text-center text-gray-700">
                                                No DNS records available.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                // @ts-ignore
                : <CreateDNSRecordPopup selectedRecordType={recordToUpdate && recordToUpdate.Type} title={title} setIsPopupOpen={setIsPopupOpen} handleCreateOrUpdateDNSRecord={handleCreateOrUpdateDNSRecord} />}
        </>
    );
}


export default Records;