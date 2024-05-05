export const Table = ({domainEntries,handleUpdateDNSRecord,handleDeleteDomain,TABLE_HEADING,handleViewDnsRecords}: {
    domainEntries: any;
    handleUpdateDNSRecord: any;
    handleDeleteDomain: any;
    TABLE_HEADING: any;
    handleViewDnsRecords: any;
}) => {
    console.log("domainEntries in", domainEntries)
    let tableRows = [];

    if (domainEntries.length > 0) {
        for (let i = 0; i < domainEntries.length; i++) {
            const record = domainEntries[i];
            tableRows.push(
                <tr key={i + ' ' + record?.Name + ' ' + record?.CallerReference}>
                    <td className="p-4">{record?.Name}</td>
                    <td className="p-4">{record?.ResourceRecordSetCount}</td>

                    <td className="flex gap-2 p-4">
                        {record?.ResourceRecordSetCount <= 2 ? (
                            <div className="mt-4 gap-2">
                                <button
                                    onClick={() => handleUpdateDNSRecord(record)}
                                    className="bg-black text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                >
                                    Update
                                </button>
                                <button
                                    onClick={() => handleDeleteDomain(record.Id)}
                                    className="text-red-700 hover:text-red-900 font-semibold py-2 px-4 rounded-md"
                                >
                                    Delete
                                </button>
                            </div>
                        ) : (
                            <h2 className="mt-4 gap-2">
                                Delete Records Then Domain
                            </h2>
                        )}
                        <div className="p-4">
                            <button
                                onClick={() => handleViewDnsRecords({hostedZoneId:record.Id, domainName:record.Name})} 
                                className="bg-black text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            >
                                View Records
                            </button>
                        </div>
                    </td>
                </tr>
            );
        }
    } else {
        tableRows.push(
            <tr key="no-records">
                <td colSpan={TABLE_HEADING.length + 1} className="p-4">
                    <span className="font-normal">
                        No DNS records available.
                    </span>
                </td>
            </tr>
        );
    }

    return (
        <>
            {tableRows}
        </>
    );
}