import React from "react";

function GlobalFilter({filter, setFilter}){

    return(
        <span>
        Buscar: {" "}
        <input 
        value={filter || ""}
        onChange= {(e)=>{ setFilter(e.target.value || undefined)}}        
        />
        </span>
    )

}

export default GlobalFilter;