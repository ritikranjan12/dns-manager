import React, { useState } from "react";


const CreateDNSRecordPopup = ({ selectedRecordType, title, handleCreateOrUpdateDNSRecord,setIsPopupOpen }: any) => {
    const [recordType, setRecordType] = useState(selectedRecordType);
    const [recordValue, setRecordValue] = useState("");
    const handleRecordTypeChange = (event: any) => {
        const selectedType = event.target.value;
        setRecordType(selectedType);
        switch (selectedType) {
            case "A":
                setRecordValue("192.0.2.1");
                break;
            case "AAAA":
                setRecordValue("2001:0db8:85a3:0000:0000:8a2e:0370:7334");
                break;
            case "CNAME":
                setRecordValue("example.com");
                break;
            case "MX":
                setRecordValue("10 mail.example.com");
                break;
            case "NS":
                setRecordValue("ns1.example.com");
                break;
            case "PTR":
                setRecordValue("example.com");
                break;
            case "SOA":
                setRecordValue("ns1.example.com hostmaster.example.com 2022032801 7200 3600 1209600 3600");
                break;
            case "SRV":
                setRecordValue("0 5 5269 xmpp-server.example.com");
                break;
            case "TXT":
                setRecordValue("sample text");
                break;
            case "DNSSEC":
                setRecordValue("true");
                break;
            default:
                setRecordValue("");
        }
    };


    const handleSubmit = () => {
        const newDNSRecord = {
            domainName: title,
            recordType,
            recordValue,
        };
        handleCreateOrUpdateDNSRecord({recordData:newDNSRecord, ttl: 3600});
    };

    return (
        <>
            <main className="bg-black flex items-center justify-center h-screen">
                <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
                    <div className="flex flex-col items-center">
                        <div className="text-2xl font-semibold mb-2"> {selectedRecordType !=null ? 'Update DNS Record' : 'Create DNS Record'}</div>
                    </div>
                    <div className="flex flex-col items-center">
                        <div className="text-lg font-semibold mb-2">Domain - ${title}</div>
                    </div>
                    <div className="mb-4"> 
                        <label htmlFor="username" className="block text-zinc-700 text-sm font-bold mb-2">Record Type</label>

                        <select value={recordType} onChange={handleRecordTypeChange} name="recordType" id="recordType">
                            <option value="A">A (Address)</option>
                            <option value="AAAA">AAAA (IPv6 Address)</option>
                            <option value="CNAME">CNAME (Canonical Name)</option>
                            <option value="MX">MX (Mail Exchange) Record</option>
                            <option value="NS">NS (Name Server) Record</option>
                            <option value="PTR">PTR (Pointer) Record</option>
                            <option value="SOA">SOA (Start of Authority) Record</option>
                            <option value="SRV">SRV (Service) Record</option>
                            <option value="TXT">TXT (Text) Record</option>
                            <option value="DNSSEC">DNSSEC</option>
                        </select>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="username" className="block text-zinc-700 text-sm font-bold mb-2">Record Value </label>
                        <input value={recordValue} onChange={(e) => setRecordValue(e.target.value)} type="text" id="recordValue" name="recordValue" required className="shadow appearance-none border rounded w-full py-2 px-3 text-zinc-700 leading-tight focus:outline-none focus:shadow-outline" />
                    </div>
                    <div>
                    </div>
                    <div className='flex '>
              <div className="flex items-center justify-between mb-6 mx-2">
                <button onClick={handleSubmit} className="bg-black text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                    Submit
                </button>
              </div>
              <div className="flex items-center justify-between mb-6">
                <button onClick={() => setIsPopupOpen(false)} className="bg-black text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                    Cancel
                </button>
              </div>

              </div>
                </div>
            </main>

        </>
    );
};

export default CreateDNSRecordPopup;
