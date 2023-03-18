import React from "react";
import '../estilos/GlobalFilter.css'

function GlobalFilter({filter, setFilter}){

    return(
        <span className="contenedor-buscador">
        Buscar: {" "}
        <input 
        value={filter || ""}
        onChange= {(e)=>{ setFilter(e.target.value || undefined)}}        
        />
        </span>
    )

}

export default GlobalFilter;