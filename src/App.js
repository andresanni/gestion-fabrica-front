import { BrowserRouter, Route,Routes } from 'react-router-dom';
import './App.css';
import NavBar from './componentes/NavBar';
import ListaInsumos from './componentes/ListaInsumos';
import NuevoInsumoForm from './componentes/NuevoInsumoForm';





function App() {
  return (
    
    <BrowserRouter>

      <div className='app-container'>
        <div className='nav-container'> 
          <NavBar/>
        </div>
        <div className='main-container'>
          <Routes>
             <Route path="/" element={<ListaInsumos/>}/>
             <Route path="/insumos" element={<ListaInsumos/>}/>
             <Route path="/insumos/add" element={<NuevoInsumoForm/>}/>
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
