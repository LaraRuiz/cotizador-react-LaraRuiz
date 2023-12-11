import { Link, Outlet } from "react-router-dom";

const Layout = () => {
    return (
        <>
                <header>
                  <h1>Cotizador de Tattoo</h1>
                  <div class="head">
                    <div class="formulario">
                  <Link to="/" title="Ver Formulario">
                    Formulario
                  </Link>
                    </div>
                    <div class="historial">
                  <Link to="/historial" title="Ver Historial">
                    Historial
                  </Link>
                    </div>
                  </div>
                </header>
                <Outlet />
              </>
    );
};
export default Layout;