"use client"
import DomainPopup from "@/components/DomainPopup";
import Navbar from "@/components/Navbar";
import { useEffect, useMemo, useState } from "react";
import { Suspense } from 'react'
import {
    createDomain, 
    listDomains,
    deleteDomain,
    BulkDomainUpdate,
    BulkDNSUpdate
} from "./page.server";
import HostingZoneDashboard from "@/components/DomainDashboard";
import DomainBulkPopup from "@/components/DomainBulk";
import DnsBulkPopup from "@/components/DnsBulk";
import Link from "next/link";

export default function Home() {
    const [isPopupOpen, setIsPopupOpen] = useState(false)
    const [isBulkDomainOpen, setIsBulkDomainOpen] = useState(false)
    const [isBulkDNSOpen, setIsBulkDNSOpen] = useState(false)
    const [search, setSearch] = useState("");
    return (
        <Suspense>
            <main className="bg-white text-black">
                <Navbar isPopupOpen={isPopupOpen} setIsPopupOpen={setIsPopupOpen} setSearch={setSearch} />
                <div className="rounded-lg overflow-hidden bg-white shadow-lg">
                        <div className="flex flex-col md:flex-row items-center justify-between p-4 border-b border-gray-200">
                            <div className="w-full md:w-1/3 mb-4 md:mb-0">
                                <div className="flex flex-row justify-center md:justify-start space-x-4">
                                    <button
                                        className="bg-black text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                        onClick={() => setIsBulkDomainOpen(true)}
                                    >
                                        Upload Domains
                                    </button>
                                    <button
                                        className="bg-black text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                        onClick={() => setIsBulkDNSOpen(true)}
                                    >
                                        Upload DNS Records
                                    </button>
                                </div>
                            </div>
                            <div className="w-full md:w-1/3 mb-4 md:mb-0">
                                <div className="flex flex-row justify-center md:justify-start space-x-4">
                                <Link
                                        className="bg-black text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                        href="/domain.csv"
                                    >
                                       Download Domain Sample
                                    </Link>
                                    <Link href="/dns.csv"
                                        className="bg-black text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                    >
                                       Download DNS Sample
                                    </Link>
                                </div>
                            </div>
                        </div>
                </div>
                {isBulkDomainOpen ? 
                <DomainBulkPopup  BulkDomainUpdate={BulkDomainUpdate} setIsBulkDomainOpen={setIsBulkDomainOpen} /> 
                : isBulkDNSOpen ? <DnsBulkPopup setIsBulkDNSOpen={setIsBulkDNSOpen} BulkDNSUpdate={BulkDNSUpdate} /> : !isPopupOpen ? (
                    <HostingZoneDashboard
                    listDomains={listDomains}
                    deleteDomain={deleteDomain}
                    search={search}
                    />
                ) : (
                    <DomainPopup createDomain={createDomain} setIsPopupOpen={setIsPopupOpen} />
                )}
            </main>
        </Suspense>
    );
}
