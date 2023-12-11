import { useEffect, useState } from "react";


const Historial = () => {
    const [historial, setHistorial] = useState( () => {
        let storage = localStorage.getItem("historial");
        if(storage) return JSON.parse(storage);
        localStorage.setItem("historial", JSON.stringify([]));
        return [];
    });

    useEffect(
        () => localStorage.setItem("historial", JSON.stringify(historial)),
        [historial]
    );

    
    return (
        <>
          <h1>Historial</h1>
          <ul>{historial.map((elemento,index) => (
            <li key={index}> 
              <p>Fecha:{elemento.fecha}</p> 
              <p>Hora:{elemento.time}</p>
              <p>Zona:{elemento.cliente.content}</p>
              <p>Total:${elemento.total}</p>
            </li>
            ))}
          </ul>
        </>
    );
};
export default Historial; 