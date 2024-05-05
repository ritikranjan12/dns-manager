
"use client"
import React from 'react'

const DomainPopup = ({createDomain, setIsPopupOpen} : {createDomain:any, setIsPopupOpen:any
}) => {
    const [domainName, setdomainName] = React.useState('')
    const [description, setDescription] = React.useState('')

    const handleCreateDomain = async () => {
        try {
            let prarams = {
                domain_name: domainName,
                description: description
            }
            const data = await createDomain(prarams)
            window.location.href = '/'
        } catch (error) {
            console.error(error)
        }
    }
  return (
    
    <main className="bg-black flex items-center justify-center h-screen">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
            <div className="flex flex-col items-center">
              <div className="text-2xl font-semibold mb-2">Create Domain</div>
            </div>
            <div>
              <div className="mb-4">
                <label htmlFor="username" className="block text-zinc-700 text-sm font-bold mb-2">Domain Name </label>
                <input onChange={(e) => setdomainName(e.target.value)} type="text" id="domainName" name="domainName" required className="shadow appearance-none border rounded w-full py-2 px-3 text-zinc-700 leading-tight focus:outline-none focus:shadow-outline" />
              </div>
              <div className="mb-6">
                <label htmlFor="password" className="block text-zinc-700 text-sm font-bold mb-2">Description </label>
                <input onChange={(e) => setDescription(e.target.value)} type="text" id="description" name="description" required className="shadow appearance-none border rounded w-full py-2 px-3 text-zinc-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"/>
              </div>
              <div className='flex '>
              <div className="flex items-center justify-between mb-6 mx-2">
                <button onClick={handleCreateDomain} className="bg-black text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
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
          </div>
        </main>
  )
}

export default DomainPopup
