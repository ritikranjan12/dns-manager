import React from 'react'

const DomainNavbar = ({setIsPopupOpen,isPopupOpen,setSearch} : {setIsPopupOpen:any,isPopupOpen:any,setSearch:any}) => {
  return (
    <div>
      <nav className="bg-black p-4">
              <div className="container mx-auto flex justify-between items-center">
                  <h1 className="text-xl font-bold text-white">DNS Dashboard</h1>
                  <div className="items-center hidden md:flex">
                      <input onChange={(e) =>setSearch(e.target.value)} type="text" placeholder="Search" className="text-black p-2 rounded" />
                      <div className="ml-4">
                          <button onClick={() => setIsPopupOpen(!isPopupOpen)} className="bg-green-500 hover:bg-green-700 text-black font-bold py-2 px-4 rounded">
                              Create Domain
                          </button>
                      </div>
                  </div>
                  <div className="items-center flex md:hidden">
                      <div className="ml-2">
                          <button onClick={() => setIsPopupOpen(!isPopupOpen)} className="bg-green-500 hover:bg-green-700 text-black font-bold py-2 px-4 rounded">
                              Create Domain
                          </button>
                      </div>
                  </div>
              </div>
          </nav>
    </div>
  )
}

export default DomainNavbar
