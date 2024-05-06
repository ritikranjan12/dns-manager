
export const createDomain = async (data: any) => {
    const response = await fetch('http://localhost:7002/api/create-domain', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    const data1= await response.json();
  return data1;
}

export const listDomains = async () => {
  const response = await fetch('http://localhost:7002/api/domain');
  const data = await response.json();
  return data;
}

export const deleteDomain = async ({id} : any) => {
  const response = await fetch(`http://localhost:7002/api/delete-domain/${id}`, {
    method: 'DELETE',
  });
  const data = await response.json();
  return data;
}

export const BulkDomainUpdate = async (file: any) => {
  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch('http://localhost:7002/api/bulk-domain', {
        method: 'POST',
        body: formData,
    })
    const data1= await response.json();
  return data1;
}

export const BulkDNSUpdate = async (file: any) => {
  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch('http://localhost:7002/api/dns-record/upload', {
        method: 'POST',
        body: formData,
    })
    const data1= await response.json();
  return data1;
}