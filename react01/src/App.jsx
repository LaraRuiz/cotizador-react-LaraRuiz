import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Formulario from './components/Formulario';
import Historial from './components/Historial';


const App = () => {
  return (
     <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout/>}>
            <Route index element={<Formulario/>}/>
            <Route path="historial" element={<Historial/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
     </>
  );
};

export default App;
