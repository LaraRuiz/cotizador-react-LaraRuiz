Holi!!
Este es mi proyecto final, un "Cotizador de Tattoo" ya que uno de mis hobbies es tatuar, lleve
el proyecto para ese lado :)

-Lo primero que hice fue crear mi .JSON para almacenar alli los datos que se verian en mi formulario.

//
    {"id": 1, 
     "type": "client", 
     "content": "Brazo", 
     "increment": 1.2 },

//

-En el App.jsx: 

Añadi las rutas de acceso al formulario y al historial para poder navegar mejor por mi pagina.

//

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout/>}>
            <Route index element={<Formulario/>}/>
            <Route path="historial" element={<Historial/>}/>
          </Route>
        </Routes>
      </BrowserRouter>

//

**En el archivo Formulario.jsx:**

Inicie con una funcion en el **useState** que me proporciona la posibilidad de brindarme los valores guardados dentro de mi **localStorage**

//
    const [historial, setHistorial] = useState( () => {
        let storage = localStorage.getItem("historial");
        if(storage) return JSON.parse(storage);
        localStorage.setItem("historial", JSON.stringify([]));
        return [];
    });

//

Y el **useEffect** para que el historial cada vez que cambie, se actualice.

//

    useEffect(
        () => localStorage.setItem("historial", JSON.stringify(historial)),
        [historial]
    );

//

(**Estas mismas dos funciones las copie para el archivo Historial.jsx ya que necesitaba que cumplan la misma funcion**)

-Genere los **estados** que se van a ir actualizando de acuerdo a lo que vaya cargando el usuario:

//

    const [load, setLoad] = useState(false);
    const [listOne, setListOne] = useState([]);
    const [listTwo, setListTwo] = useState([]);
    const [optionOne, setOptionOne] = useState(null);
    const [optionTwo, setOptionTwo] = useState(null);
    const [value, setValue] = useState(null);
    const [total, setTotal] = useState(null);

//

-Con esos estados, lo que hice fue primero llamar a mi .JSON para que me proporcione la info que 
cree para el usuario.

-Luego "filtre" con el estado **setListOne** y **setListTwo** los tipos de datos que iba a traer cada uno del .JSON.

//

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

//

-En el **return** basicamente lo que hice fue darle los valores necesarios a cada objeto del formulario para que todo funcione: 

//

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

//

-Con el **defaultValue={0}** lo que hace es  que se haga un reset la opcion y no quede la ultima que fue seleccionada.

-Llamando al **setOptionOne(target.value)** le estoy diciendo que va a ser la opcion Uno, y por ende va a ejecutar lo que esa funcion marque.
Es decir, va a hacer un **mapeo** por los "client" (que es el type que se le dio a esta lista) y los que coincidan con el "id" me los va a devolver en pantalla.

//

          {listOne.map(({id,content}) => (
          <option key={id} value={id}>
              {content}
          </option> 
          ))}

//

-Y lo mismo se repite para la opcion dos:

//

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

//

-Luego genere la constante para realizar la cuenta de la cotizacion:

//

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

//

En la cuan basicamernte dice que si la opcion 1 y la opcion 2 son menor o igual a 0 (es decir que no estan completas), nos salta una advertencia de **sweetalert** de que hay que completar los datos. 
Y si es mayor (es decir que se completaron esos datos), me devuelve la cuenta que es una multiplicacion entre las opciones.

-Y por ultimo en el **Formulario.jsx** realice la funcion para guardar lo seleccionado, en el historial:

//

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

//

Que lo primero que hace es fijarse lo que hay dentro del *Historial* y copiarlo y se agrega:

*La fecha en la que fue guardado.
*La hora.
*Lo que se haya seleccionado de **listOne**.
*Lo que se haya seleccionado de **listTwo**.
*Y por ultimo la multiplicacion que da el total **$**.

Para finalizar, nos devuelve una alerta tambien de **sweetalert** donde nos diga que se actualizo la info.

**En el achivo Historial.jsx**

-Lo ultimo que agregue ademas de lo ya mencionado, es lo que se va a ver en pantalla:

//

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

//

Que lo que hace es un mapeo por los elementos que se guardaron como seleccionados y los agrega filtrandolos por los items proporcionados como:

*Fecha:{elemento.fecha}.
*Hora:{elemento.time}.
*Zona:{elemento.cliente.content}.
*Total:${elemento.total}.