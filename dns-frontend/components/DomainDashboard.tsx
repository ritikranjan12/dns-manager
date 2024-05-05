import React, { useState, useEffect, useLayoutEffect, useMemo, useCallback } from "react";
import { Table } from "./table";

const HostingZoneDashboard = ({ listDomains, deleteDomain, search }: any) => {
  const TABLE_HEADING = ["Name", "ResourceRecordSetCount"];
  const [domainEntries, setdomainEntries] = useState([]);
  const [isCreateOrUpdateDNSRecordOpen, setIsCreateOrUpdateDNSRecordOpen] =
    useState(false);
  const [recordToUpdate, setRecordToUpdate] = useState(null);

  const fetchDomains = useCallback(async () => {
    try {
      const data = await listDomains()
      if (data.zones.length > 0) {
        if (search != "") {
          const filteredData = data.zones.filter((domain: any) => domain.Name.includes(search));
          setdomainEntries(filteredData);
        } else setdomainEntries(data.zones);
      }
    } catch (error) {
      console.error(error);
    }
  }, [listDomains, search]);

  useMemo(() => {
    fetchDomains();
  }, [fetchDomains]);


  const handleUpdateDNSRecord = (record: any) => {
    setRecordToUpdate(record);
    setIsCreateOrUpdateDNSRecordOpen(true);
  };

  const handleDeleteDomain = async (domainId: any) => {
    try {
      const hostedZoneId = domainId.split("/").pop();
      console.log(hostedZoneId);
      await deleteDomain({ id: hostedZoneId });
      fetchDomains();
    } catch (error) {
      console.error(error);
    }
  };

  const handleViewDnsRecords = ({ hostedZoneId, domainName }: any) => {
    const domainId = hostedZoneId.split("/").pop();
    window.location.href = `/records?code=${encodeURIComponent(domainId)}&title=${domainName}`;
  };
  return (
    <>
      <div className="container mx-auto p-4">
        <div className="h-full w-full">
          <div className="rounded-none">
            <div className="overflow-scroll px-0">
              <table className="mt-4 w-full min-w-max table-auto text-left">
                <thead>
                  <tr>
                    {TABLE_HEADING.map((head) => (
                      <th
                        key={head}
                        className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                      >
                        <span className="font-normal leading-none opacity-70">
                          {head}
                        </span>
                      </th>
                    ))}
                    <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"></th>
                  </tr>
                </thead>

                <tbody>

                  {domainEntries?.length > 0 && <Table domainEntries={domainEntries} handleUpdateDNSRecord={handleUpdateDNSRecord} handleDeleteDomain={handleDeleteDomain} TABLE_HEADING={TABLE_HEADING} handleViewDnsRecords={handleViewDnsRecords} />}

                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default HostingZoneDashboard;
