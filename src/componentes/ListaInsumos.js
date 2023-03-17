import { useEffect, useState } from "react";
import { useTable, usePagination } from "react-table";
import React from "react";
import '../estilos/ListaInsumos.css'

function ListaInsumos(){

    const [insumos,setInsumos]= useState([]);

    useEffect(()=>{
        async function fetchInsumos(){
            const response = await fetch ("http://localhost:8080/gestionFabrica/insumos/all");
            const data = await response.json();
            console.log(data)
            setInsumos(data);
        }
        fetchInsumos();
    },[])

    const columns = React.useMemo(
      ()=>[
            {
              Header: 'Proveedor',
              accessor: 'proveedor.razonSocial'
            },
            {
              Header: 'Rubro',
              accessor: 'rubro.descripcion'
            },
            {
              Header: 'Articulo',
              accessor: 'articulo'
            },
            {
              Header: 'Precio',
              accessor: 'precio'
            },
          ],[]); 

    const data = React.useMemo(()=>insumos, [insumos]);
    const tableInstance = useTable({columns,data}, usePagination);

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
      state: {pageIndex, pageSize, pageCount}
    } = tableInstance;
    

    return(
    <div className = "contenedor-lista">
        <h2>Lista de Insumos</h2>
      
      
      <table className="lista" {...tableProps}>
        <thead>
          {
            headerGroups.map
            (
              (headerGroup)=>
              (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {
                    headerGroup.headers.map
                    (
                      (header)=>
                      (
                        <th {...header.getHeaderProps()}>
                          {header.render("Header")}
                        </th>
                      )
                    )   
                  }
                </tr>
              )
            )
          }
        </thead>

        <tbody {...tableBodyProps}>          
          {
            page.map
            (
              (row)=>
              {
                prepareRow(row);
                return(
                  <tr {...row.getRowProps} key={row.original.id}>
                    {
                      row.cells.map
                      (
                        (cell)=>
                        {
                          return(
                            <td {...cell.getCellProps()}>
                              {cell.render("Cell")}
                            </td>
                          )
                        }
                      )
                    }
                  </tr>
                )
              }
            )
          }
        </tbody>
      </table>    
    
      <div className="paginacion">
          <div className ="botones">          
            <button onClick={()=>gotoPage(0)} disabled={!canPreviousPage}>
              {"<<"}
            </button>
            <button onClick={()=>gotoPage(previousPage)} disabled={!canPreviousPage}>
              {"<"}
            </button>
            <button onClick={()=>gotoPage(nextPage)} disabled={!canNextPage}>
              {">"}
            </button>
            <button onClick={()=>gotoPage(pageOptions.length-1)} disabled={!canNextPage}>
              {">>"}
            </button>

            <span>
              Página{" "}
              <strong>
               {pageIndex + 1} de {pageOptions.length}
              </strong>{" "}
            </span>

            <span>
              Ir a la página:{" "}
              <select
              value={pageIndex + 1}
              onChange={(e) => {
                const page = e.target.value ? Number(e.target.value) - 1 : 0;
                gotoPage(page);
              }}
              >
                {pageOptions.map((page) => (
                <option key={page} value={page}>
                  {page +1}
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
    </div>);
}

export default ListaInsumos;
