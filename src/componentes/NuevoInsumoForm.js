import { useState,useEffect } from "react";
import '../estilos/NuevoInsumoForm.css'

function NuevoInsumoForm(){

    //Hooks
    const [proveedores, setProveedores] = useState([]);
    const[rubros, setRubros] = useState([]);
    const [showSuccessMessage, setShowSuccesMessage] = useState(false);
    const[error, setError] = useState(false);    
    const [formValues, setFormValues] = useState({
        proveedor: '',
        rubro:'',
        articulo:'',
        precio:''
    })

    //Carga de desplegables
    useEffect(()=>{
        async function fetchProveedores(){
            const response = await fetch('http://localhost:8080/gestionFabrica/proveedor/all');
            const data = await response.json();
            setProveedores(data);
        }

        async function fetchRubros(){
            const response = await fetch('http://localhost:8080/gestionFabrica/rubro_insumo/all');
            const data = await response.json();
            setRubros(data);
        }

        fetchRubros();
        fetchProveedores();
    }
    ,[]);



    //Cambio en los campos
    const handleChange = (event)=>{
        const {name,value} = event.target; //Creo un objeto con las propiedades name y value del evento
        const updatedValues = { ...formValues };

        if(name==="rubro"||name==="proveedor"){ //Si el nombre de la propiedad es RUbro o Proveedor, nuestras claves foraneas, las parseo a INT
            updatedValues[name] = parseInt(value)
        }
        else{
            updatedValues[name] = value; //Para el resto de campos, asginar el valor
        }       
        
        setFormValues(updatedValues);        
    }

    //Guardar
    const handleSubmit = async (event) => {
        event.preventDefault();
       
        try{
        const response = await fetch('http://localhost:8080/gestionFabrica/insumos/save', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formValues)
        });
        const data = await response.json();
        console.log(data);
        console.log(JSON.stringify(formValues));
        setShowSuccesMessage(true);
        setError(false);
    }
        catch(error){
            console.error(error);
            setShowSuccesMessage(false);
            setError(true);
        }
    };

    return (        
        <div className="contenedor-formulario">
            <form className="formulario" onSubmit={handleSubmit}>
                
                <label htmlFor="select-proveedor">Proveedor:</label>
                <select id="select-proveedor" name="proveedor" defaultValue="" onChange={handleChange} >
                <option value="" disabled >Seleccione en la lista</option>
                    {proveedores.map( proveedor=>{ return(
                         <option key = {proveedor.id} value = {proveedor.id}>{proveedor.razonSocial}</option>)
                    })}                           
                </select>
                
                <label htmlFor="select-rubro">Rubro:</label>
                <select id="select-rubro" name="rubro" onChange={handleChange} defaultValue="">
                    <option value="" disabled>Seleccione en la lista</option>

                    {rubros.map( rubro =>{ return (
                        <option key= {rubro.id} value = {rubro.id}>{rubro.descripcion}</option>
                    )})
                    }
                </select>

                <label htmlFor="input-articulo">Articulo:</label>
                <input id="input-articulo" type="text" name="articulo" onChange={handleChange}/>
                
                <label htmlFor="input-precio">Precio:</label>
                <input id="input-precio" type="number" name="precio" onChange={handleChange}/>

                <input type="submit" value="Guardar" />
            </form>
            
            {showSuccessMessage&& <p>Registro guardado exitosamente</p>}
            {error&& <p>Ocurrió un error al guardar el registro</p>}
        </div>
    );

}

export default NuevoInsumoForm;