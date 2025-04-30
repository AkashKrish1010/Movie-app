import React from 'react'

const Search = ({searchTerm,setSearchTerm}) => {
  return (
    <div className="search">
        <div>
            <img src='/Movie-app/search.svg' alt="search"/>
            <input 
            type='text' placeholder='Search some movies' value={searchTerm}
            onChange={(e)=>setSearchTerm(e.target.value)} 
            />
        </div>
    </div>
  )
}

export default Search