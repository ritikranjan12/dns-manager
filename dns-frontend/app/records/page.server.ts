export const listHostedZones = async (code : any) => {
    try {
      const zone_id = code
      const response = await fetch(`http://localhost:7002/api/dns-record/${zone_id}`)
      const data = await response.json();
  return data;
    } catch (error: any) {
      console.error(error.message);
      
    }
  }
  
  export const createDNSRecord = async ({dnsRecordData, code}: {dnsRecordData: any, code: any}) => {
    try {
      const response = await fetch('http://localhost:7002/api/dns-record', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          dns_data: dnsRecordData,
          code: code
        })
    })
    const data = await response.json();
  return data;
    } catch (error:any) {
      console.error(error.message);
       
    }
  }
  
  export const updateDNSRecord = async ({id, dnsRecordData, ttl, code}: {id: any, dnsRecordData: any, ttl: any, code: any}) => {
    try {
      if (ttl) {
        dnsRecordData.TTL = ttl;
      }
      console.log('dnsRecordData Updated with id -', id)
      const response = await fetch('http://localhost:7002/api/dns-record', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          dns_data: dnsRecordData,
          code: code
        })
    })
    const data = await response.json();
  return data;
    } catch (error:any) {
      console.error(error.message);
      
    }
  }
  
  export const deleteDNSRecord = async ({id, record, code}: {id: any, record: any, code: any}) => {
    try {
      const response = await fetch(`http://localhost:7002/api/dns-record/${id}?code=${code}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({data: record})
    })
    const data = await response.json();
  return data;
    } catch (error:any) {
      console.error(error.message);
    }
  }