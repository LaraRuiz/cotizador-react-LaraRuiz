import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const Formulario = () => {
    const [historial, setHistorial] = useState( () => {
        let storage = localStorage.getItem("historial");
        if(storage) return JSON.parse(storage);
        localStorage.setItem("historial", JSON.stringify([]));
        return [];
    });

    const [load, setLoad] = useState(false);
    const [listOne, setListOne] = useState([]);
    const [listTwo, setListTwo] = useState([]);
    const [optionOne, setOptionOne] = useState(null);
    const [optionTwo, setOptionTwo] = useState(null);
    const [value, setValue] = useState(null);
    const [total, setTotal] = useState(null);


    useEffect(() => {
        setLoad(true);
        fetch("/data.json")
          .then(res => res.json())
          .then(datos => {
            setListOne(datos.filter(({type}) => type == "client"));
            setListTwo(datos.filter(({type}) => type == "proyect"));
          })
          .catch((error) => console.error(error))
          .finally(() => setLoad(false));

    }, []);


    useEffect(
        () => localStorage.setItem("historial", JSON.stringify(historial)),
        [historial]
    );

    const cotizar = (e) => {
        e.preventDefault();
        if(value <= 0 || optionOne == null || optionTwo == null){
          return Swal.fire("","Completa todos los datos", "error");
        }
        setLoad(true);
        setTimeout(() => {
            setTotal(200 * parseFloat(value) * optionOne * optionTwo);
            setLoad(false);
            e.target.reset();
        }, 3000);
    };

    const guardar = () => {
        setHistorial([...historial,
            {
              fecha:new Date().toLocaleDateString("es-mx"), 
              time: new Date().toLocaleTimeString("es-mx"),
              cliente: listOne.find(({id}) => id == optionOne),
              proyecto: listTwo.find(({id}) => id == optionTwo),
              total: total.toFixed(2),
            },
        ]);
        setTotal(null);
        return Swal.fire("","Actualizaste el historial", "success");
    };

    return (
        <>
          <h1>Formulario</h1>
          {load && (
          <>
          <div className="load">
          <div className="spinner">
            <div className="spinner1"></div>
          </div>
          </div>
          </>
          )}
          {!load &&(
            <form onSubmit={cotizar}>
                <fieldset>
                    <label htmlFor="cliente">Cliente</label>
                    <select 
                      name="cliente" 
                      id="cliente" 
                      defaultValue={0} 
                      onChange={({target}) => setOptionOne(target.value)}>
                        <option value={0} disabled>
                            Seleccionar parte del cuerpo
                        </option>
                        {listOne.map(({id,content}) => (
                        <option key={id} value={id}>
                            {content}
                        </option> 
                        ))}
                    </select>
                </fieldset>
                <fieldset>
                    <label htmlFor="proyecto">Proyecto</label>
                    <select 
                      name="proyecto" 
                      id="proyecto" 
                      defaultValue={0} 
                      onChange={({target}) => setOptionTwo(target.value)}>
                        <option value={0} disabled>
                            Seleccionar opción
                        </option>
                        {listTwo.map(({id,content}) => (
                        <option key={id} value={id}>
                            {content}
                        </option> 
                        ))}
                    </select>
                </fieldset>
                <fieldset>
                    <label htmlFor="tamaño">
                        Tamaño en Cm <span>{value}</span> 
                    </label>
                    <input 
                      type="range" 
                      name="tamaño" 
                      id="tamaño" 
                      className="range-field"
                      min={2} 
                      max={10} 
                      step={0.5}
                      defaultValue={2}
                      onInput={({target}) => setValue(target.value)}
                    />
                </fieldset>
                <button className="btn" type="submit">
                  <svg height="24" width="24" fill="#FFFFFF" viewBox="0 0 24 24" data-name="Layer 1" id="Layer_1" class="sparkle">
                  <path d="M10,21.236,6.755,14.745.264,11.5,6.755,8.255,10,1.764l3.245,6.491L19.736,11.5l-6.491,3.245ZM18,21l1.5,3L21,21l3-1.5L21,18l-1.5-3L18,18l-3,1.5ZM19.333,4.667,20.5,7l1.167-2.333L24,3.5,21.667,2.333,20.5,0,19.333,2.333,17,3.5Z"></path>
                  </svg>
                  <span className="text">Cotizar</span>
                </button>
            </form>
          )}
          {total && (
            <form onSubmit={(e) => e.preventDefault()}>
                <h2>El costo del tatuaje es ${total.toFixed(2)}</h2>
                <button type="button" onClick={guardar}>Guardar</button>
            </form>
          )}
        </>
    );
};
export default Formulario;