import '../estilos/NavBar.css';
import { NavLink } from 'react-router-dom';
function NavBar(){
    return (
        
            <nav id="navbar">
               <NavLink to="/insumos"> Insumos</NavLink>
               <NavLink to="/insumos/add"> Agregar Insumo</NavLink>
            </nav>
        
    );
}

export default NavBar;