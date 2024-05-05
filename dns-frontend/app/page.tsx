"use client"
import DomainPopup from "@/components/DomainPopup";
import Navbar from "@/components/Navbar";
import { useEffect, useMemo, useState } from "react";
import {
    createDomain, 
    listDomains,
    deleteDomain
} from "./page.server";
import HostingZoneDashboard from "@/components/DomainDashboard";

export default function Home() {
    const [isPopupOpen, setIsPopupOpen] = useState(false)
    const [search, setSearch] = useState("");
    return (
        <>
            <main className="bg-white text-black">
                <Navbar isPopupOpen={isPopupOpen} setIsPopupOpen={setIsPopupOpen} setSearch={setSearch} />
                {!isPopupOpen ? (
                    <HostingZoneDashboard
                    listDomains={listDomains}
                    deleteDomain={deleteDomain}
                    search={search}
                    />
                ) : (
                    <DomainPopup createDomain={createDomain} setIsPopupOpen={setIsPopupOpen} />
                )}
            </main>
        </>
    );
}
