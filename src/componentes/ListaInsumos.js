import './GlobalFilter';
import { useEffect, useState } from "react";
import { useTable, usePagination, useGlobalFilter } from "react-table";
import React from "react";
import '../estilos/ListaInsumos.css'
import GlobalFilter from './GlobalFilter';

function ListaInsumos(){

    const [insumos,setInsumos]= useState([]); //Hook de insumos

    useEffect(()=>{ //Cuando se monta el componente , se captura la info
        async function fetchInsumos(){
            const response = await fetch ("http://localhost:8080/gestionFabrica/insumos/all");
            const data = await response.json();
            console.log(data)
            setInsumos(data);
        }
        fetchInsumos();
    },[])

    const columns = React.useMemo( //Defino las cabeceras para react table
      ()=>[
            {
              Header: 'Proveedor',
              accessor: 'proveedor.razonSocial',
              filter:'text'
            },
            {
              Header: 'Rubro',
              accessor: 'rubro.descripcion',
              filter:'text'
            },
            {
              Header: 'Articulo',
              accessor: 'articulo',
              filter:'text'
            },
            {
              Header: 'Precio',
              accessor: 'precio'
            },
          ],[]); 

    const data = React.useMemo(()=>insumos, [insumos]); 
    //Guardo la info utilizando el hook useMemo, con la misma variable como dependencia
    

    const tableInstance = useTable({columns,data}, useGlobalFilter,usePagination);
    //Creo una instancia de los datos de la tabla para react table. 
     

    const {
      tableProps,
      tableBodyProps,
      headerGroups,
      rows,
      prepareRow,
      page,
      gotoPage,
      nextPage,
      previousPage,
      canNextPage,
      canPreviousPage,
      pageOptions,
      setPageSize,
      // globalFilter,
      // filteredRows,
      state: {pageIndex, pageSize, pageCount}
    } = tableInstance;
    //Extraigo las variables que voy a utilizar de la instancia que creamos con el useTable

    

    return (
      <div className="contenedor-lista">
        <h2>Lista de Insumos</h2>
        <GlobalFilter filter={tableInstance.state.globalFilter} setFilter={tableInstance.setGlobalFilter}/>
        <table className="lista" {...tableProps}>
          
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((header) => (
                  <th {...header.getHeaderProps()}>
                    {header.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody {...tableBodyProps}>
            {page.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()} key={row.original.id}>
                  {row.cells.map((cell) => {
                    return (
                      <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>

        <div className="paginacion">
          <div className="botones">
            <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
              {"<<"}
            </button>
            <button
              onClick={() => gotoPage(previousPage)}
              disabled={!canPreviousPage}
            >
              {"<"}
            </button>
            <button onClick={() => gotoPage(nextPage)} disabled={!canNextPage}>
              {">"}
            </button>
            <button
              onClick={() => gotoPage(pageOptions.length - 1)}
              disabled={!canNextPage}
            >
              {">>"}
            </button>
            <span>
              Página{" "}
              <strong>
                {pageIndex + 1} de {pageOptions.length}
              </strong>{" "}
            </span>
            <span>
              Ir a la página:
              <select
                value={pageIndex + 1}
                onChange={(e) => {
                  const page = e.target.value - 1;
                  gotoPage(page);
                }}
              >
                {pageOptions.map((page) => (
                  <option key={page} value={page + 1}>
                    {page + 1}
                  </option>
                ))}
              </select>
            </span>{" "}
            <select
              value={pageSize}
              onChange={(e) => {
                setPageSize(Number(e.target.value));
              }}
            >
              {[10, 25, 50, 100].map((pageSize) => (
                <option key={pageSize} value={pageSize}>
                  Mostrar {pageSize}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    );
}

export default ListaInsumos;
