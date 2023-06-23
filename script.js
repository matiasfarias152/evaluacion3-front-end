

//Funcion para modificar algun item que esté en el localstorage
var modificar = (listadoNuevo)=>{

    
    //Obtiene todos los elementos del formulario, de acuerdo a sus ID'S

    let eNom = document.getElementById("nombre");           //Input tipo text 
    let eFecha = document.getElementById("fecha");          //Input tipo date
    let eHora = document.getElementById("hora");            //Input tipo time
    let eEmail = document.getElementById("email");          //Input tipo email
    let eOpcion1 = document.getElementById("opcion1");      //Input tipo radio
    let eOpcion2 = document.getElementById("opcion2");      //Input tipo radio
    let eDesc = document.getElementById("descripcion");     //Textarea
    let eServicios = document.getElementById("servicios");  //Select
    let eDuracion = document.getElementById("duracion");    //Input tipo number


    //Obtiene todos los valores de los campos del formulario

    let servicio = eServicios.value;
    let duracion = eDuracion.value;
    let nombre = eNom.value;
    let fecha = eFecha.value;
    let hora = eHora.value;
    let email = eEmail.value;
    let presencial = eOpcion1.checked;
    let online = eOpcion2.checked;
    let modalidad = ""                //Variable modalidad vacía para evaluar los radios

    //Condicionales que evaluan que radio se clickeó, si se clickeo presencial, la variable modalidad toma el valor de 'presencial', y viceversa con 'online'
    if (presencial == true){
        modalidad = "presencial"
    }
    else{
        modalidad = "online"
    }
    let descripcion = eDesc.value;

   

    //Añade la clase noerror a los elementos, la cual consta de un borde negro de 1px

    eNom.classList.add("noerror");
    eFecha.classList.add("noerror");
    eEmail.classList.add("noerror");
    eDuracion.classList.add("noerror");
    eDesc.classList.add("noerror");
    eHora.classList.add("noerror");
    eServicios.classList.add("noerror")
    document.getElementById("errorMensaje").textContent = "";


    //Validaciones de los campos del formulario, si contienen valores nulos, vacios o invalidos se les añade la clase 'error' y remueve la clase 'noerror'.
    //También añade un mensaje de alerta para el usuario. No retornan nada, el return está para evitar que se ejecute codigo innecesario.

    //Clases del css error y noerror
    //.error{border: 1px solid red;}
    //.noerror{border: 1px solid black;}
    

    //Validar el input del nombre
       if (nombre.trim() === "") {
        eNom.classList.add("error");
        eNom.classList.remove("noerror")
        document.getElementById("errorMensaje").textContent = "Campo inválido. Por favor, ingrese un nombre.";   
        return;  
    }


    //Validar input de la fecha
    if (fecha.trim() === "") {
        eFecha.classList.add("error");
        eFecha.classList.remove("noerror")
        document.getElementById("errorMensaje").textContent = "Campo inválido. Debe ingresar una fecha.";
        return;
    }
    //Validar el input de la fecha que no sea una fecha pasada
    let fechaActual = new Date();
    let fechaIngresada = new Date(fecha);
    if (fechaIngresada < fechaActual) {
        eFecha.classList.add("error");
        eFecha.classList.remove("noerror")
        document.getElementById("errorMensaje").textContent = "Campo inválido. La fecha debe ser una fecha a futuro.";
        return;
    }

    //Validar el input de la hora
    if (hora.trim() === ""){
        eHora.classList.add("error");
        eHora.classList.remove("noerror");
        document.getElementById("errorMensaje").textContent = "Campo inválido. Por favor, ingresa una hora válida"
        return;
    }
    //Validar el input del email
    if (email.trim() === "") {
        eEmail.classList.add("error");
        eEmail.classList.remove("noerror");
        document.getElementById("errorMensaje").textContent = "Campo inválido. Por favor, ingrese un email.";
        return;
    }

    //Validar radios que se seleccione uno de los radios
    if (!online && !presencial) {
        document.getElementById("errorRadios").style.display = "block";
        return;
    }else{
        document.getElementById("errorRadios").style.display = "none";
    }

    //Validar el input de la hora
    if (servicio.trim() === ""){
        eServicios.classList.add("error");
        eServicios.classList.remove("noerror");
        document.getElementById("errorMensaje").textContent = "Campo inválido. Por favor, selecciona un tipo de servicio"
        return;
    }

    //Validar el input de la duración
    let duraciontest = parseFloat(duracion);
    if (isNaN(duraciontest) || duraciontest <= 0) {
        eDuracion.classList.add("error");
        eDuracion.classList.remove("noerror")
        document.getElementById("errorMensaje").textContent = "Campo inválido. La duración debe ser un número positivo.";
        return;
    }

    //Validar el input de la descripción
    if (descripcion.trim() === "") {
        eDesc.classList.add("error");
        eDesc.classList.remove("noerror")
        document.getElementById("errorMensaje").textContent = "Campo inválido. Por favor, ingrese una descripción.";
        return;
    }



    //Obtiene el indice del item a modificar
    let eBtnEditarUp = document.getElementById('btnEditar');
    let indice = eBtnEditarUp.value;

    //Modifica el item correspondiente del listadoNuevo
    listadoNuevo[indice].nombre = nombre;
    listadoNuevo[indice].fecha = fecha;
    listadoNuevo[indice].hora = hora;
    listadoNuevo[indice].email = email;
    listadoNuevo[indice].modalidad = modalidad;
    listadoNuevo[indice].servicio = servicio;
    listadoNuevo[indice].duracion = duracion;
    listadoNuevo[indice].descripcion = descripcion;

    //Guarda y almacena el listado ya modificado en el localstorage
    localStorage.setItem('solicitudes',JSON.stringify(listadoNuevo));

    //Actualiza la tabla con el listado modificado
    cargarTabla(listadoNuevo)

    //Muestra el mensaje de que la ejecución fue exitosa
    document.getElementById("errorMensaje").textContent = "¡Item modificado con éxito!";
}

//Funcion para eliminar items del localstorage(eliminar solicitudes ya ingresadas)
var eliminar = (listadoNuevo)=>{

    let eNom = document.getElementById("nombre");
    let eFecha = document.getElementById("fecha");
    let eHora = document.getElementById("hora");
    let eEmail = document.getElementById("email");
    let eOpcion1 = document.getElementById("opcion1");
    let eOpcion2 = document.getElementById("opcion2");
    let eDesc = document.getElementById("descripcion");
    let eServicios = document.getElementById("servicios");
    let eDuracion = document.getElementById("duracion");
    //Obtiene el indice del item a modificar
    let eBtnEliminarUp = document.getElementById('btnEliminar');
    let indice = eBtnEliminarUp.value;

    //Se filtra al listadoNuevo para eliminar el item que corresponda con el indice 
    lista = listadoNuevo.filter((p)=>p.id!=indice)

    //Reordena/actualiza los indices de los items restantes en el localstorage
    lista = lista.map((p,index)=>{return{...p,'id':index}})
    
    //Guarda el nuevo listado en el localstorage
    localStorage.setItem('solicitudes',JSON.stringify(lista));


    //Vaciar todos los campos del formulario
    eNom.value = "";
    eFecha.value = "";
    eHora.value = "";
    eEmail.value = "";
    eOpcion1.checked = false;
    eOpcion2.checked = false;
    eServicios.selectedIndex = 0;
    eDuracion.value = "";
    eDesc.value = "";


    //Hacer los campos de solo lectura
    eNom.readOnly = false;
    eFecha.readOnly = false;
    eHora.readOnly = false;
    eEmail.readOnly = false;
    eOpcion1.disabled = false;
    eOpcion2.disabled = false;
    eServicios.disabled = false;
    eDuracion.readOnly = false;
    eDesc.readOnly = false;

    //Actualiza la tabla con los nuevos items
    cargarTabla(lista)

    //Muestra el mensaje de que la eliminacion del item fue exitosa
    document.getElementById("errorMensaje").textContent = "¡Item eliminado con éxito!";
}

//Funcion para cargar el render de la tabla con las solicitudes
var cargarTabla = (listadoNuevo)=>{

    //Variables que contienen los elementos del formulario
    
    let eNom = document.getElementById("nombre");
    let eFecha = document.getElementById("fecha");
    let eHora = document.getElementById("hora");
    let eEmail = document.getElementById("email");
    let eOpcion1 = document.getElementById("opcion1");
    let eOpcion2 = document.getElementById("opcion2");
    let eDesc = document.getElementById("descripcion");
    let eServicios = document.getElementById("servicios");
    let eDuracion = document.getElementById("duracion");


    //Variable que obtiene el div donde se creará la tabla
    let eContenedorTabla = document.getElementById("contenedorTabla");

    //Genera el codigo HTML de la tabla con sus respectivos encabezados con un ciclo for
    //El ciclo for  recorre los elementos del localstorage/listadoNuevo y por cada uno de ellos genera una fila, con sus valores correspondientes, también agrega los botones
    //Editar y Eliminar para cada una de las filas, y les asigna un ID

    render = "<table>"
    render+= "<tr><th>Nombre</th><th>Fecha</th><th>Hora</th><th>Email</th><th>Modalidad</th><th>Servicio</th><th>Duracion</th><th>Descripcion</th><th>Accion</th></tr>"
    for (let i = 0; i < listadoNuevo.length; i++) {
        const element = listadoNuevo[i];
        render+="<tr>"
        render+="<td>"+element.nombre+"</td>"
        render+="<td>"+element.fecha+"</td>"
        render+="<td>"+element.hora+"</td>"
        render+="<td>"+element.email+"</td>"
        render+="<td>"+element.modalidad+"</td>"
        render+="<td>"+element.servicio+"</td>"
        render+="<td>"+element.duracion+"</td>"
        render+="<td>"+element.descripcion+"</td>"
        render+="<td>"
        render+="<button id='btnEditar"+i+"'>Editar</button>"
        render+="<button id='btnEliminar"+i+"'>Eliminar</button>"
        render+="</td>"
        render+="</tr>"
    }
    render += "</table>";


    //Almacena la tabla en el contenedor declarado antes
    eContenedorTabla.innerHTML = render;

    //Asigna los eventos a cada uno de los botones Editar y Eliminar
    for (let i = 0; i < listadoNuevo.length; i++) {
        var eBtn = document.getElementById("btnEditar"+i); 
        var eBtn2 = document.getElementById("btnEliminar"+i);
        let element = listadoNuevo[i]

        //Evento para el boton Editar
        eBtn.addEventListener("click",()=>{

            //Coloca los valores del elemento que seleccionó en los campos del formulario
            eNom.value = element.nombre;
            eFecha.value = element.fecha;
            eHora.value = element.hora;
            eEmail.value = element.email;
            if (element.modalidad == "presencial"){
                eOpcion1.checked = true
            }
            else{
                eOpcion2.checked = true
            }
            eServicios.value = element.servicio;
            eDuracion.value = element.duracion;
            eDesc.value = element.descripcion;

            //Hacer los campos editables
            eNom.readOnly = false;
            eFecha.readOnly = false;
            eHora.readOnly = false;
            eEmail.readOnly = false;
            eOpcion1.disabled = false;
            eOpcion2.disabled = false;
            eServicios.disabled = false;
            eDuracion.readOnly = false;
            eDesc.readOnly = false;
            
            //Se agrega el boton Editar al lado del boton Enviar 
            let sEditar = "<button type='button' id='btnEditar' value='"+i+"'>Editar</button>";
             
            //Se obtiene el contenedor de dónde estará el boton Editar nuevo
            let contenedorBoton = document.getElementById('contenedorBtnExtra');
            contenedorBoton.innerHTML = sEditar;

            //Se obtiene el id del botón que se selecciono, dependiendo la fila y se le agrega el evento. Al clickearlo se llama a la funcion modificar
            let eBtnEditarUp = document.getElementById('btnEditar');
            eBtnEditarUp.addEventListener('click',()=>modificar(listadoNuevo))
        })

        //Se añade el evento para el boton Eliminar
        eBtn2.addEventListener("click",()=>{

            //Coloca los valores del elemento que seleccionó en los campos del formulario
            eNom.value = element.nombre;
            eFecha.value = element.fecha;
            eHora.value = element.hora;
            eEmail.value = element.email;

            //Condicional para devolver el estado del botón que se había guardado. En otras palabras interpretar lo que estaba en modalidad con los radios.
            if (element.modalidad == "presencial"){
                eOpcion1.checked = true
            }
            else{
                eOpcion2.checked = true
            }
            eServicios.value = element.servicio;
            eDuracion.value = element.duracion;
            eDesc.value = element.descripcion;

            //Hacer los campos de solo lectura
            eNom.readOnly = true;
            eFecha.readOnly = true;
            eHora.readOnly = true;
            eEmail.readOnly = true;
            eOpcion1.disabled = true;
            eOpcion2.disabled = true;
            eServicios.disabled = true;
            eDuracion.readOnly = true;
            eDesc.readOnly = true;

            //Agrega el boton de eliminar arriba
            let sEliminar = "<button type='button' id='btnEliminar' value='"+i+"'>Eliminar</button>";
            let contenedorBoton = document.getElementById('contenedorBtnExtra');
            contenedorBoton.innerHTML = sEliminar;

            //Asignar el evento al boton eliminar, el cual al clickearlo se llama a la funcion eliminar
            let eBtnEliminarUp = document.getElementById('btnEliminar');
            eBtnEliminarUp.addEventListener('click',()=>eliminar(listadoNuevo))
            
            
            
        })
    }
}


//Función para registrar una nueva solicitud en el localstorage
var registrar = () =>{

    //Variables con los elementos del formulario
    let eNom = document.getElementById("nombre");
    let eFecha = document.getElementById("fecha");
    let eHora = document.getElementById("hora");
    let eEmail = document.getElementById("email");
    let eOpcion1 = document.getElementById("opcion1");
    let eOpcion2 = document.getElementById("opcion2");
    let eDesc = document.getElementById("descripcion");
    let eServicios = document.getElementById("servicios");
    let eDuracion = document.getElementById("duracion");

    //Reiniciar estilos y mensajes de error
    eNom.classList.add("noerror");
    eFecha.classList.add("noerror");
    eEmail.classList.add("noerror");
    eDuracion.classList.add("noerror");
    eDesc.classList.add("noerror");
    eHora.classList.add("noerror");
    eServicios.classList.add("noerror")
    document.getElementById("errorMensaje").textContent = "";


    

    //Obtiene  los valores de los campos del formulario
    let servicio = eServicios.value;
    let duracion = eDuracion.value;
    let nombre = eNom.value;
    let fecha = eFecha.value;
    let hora = eHora.value;
    let email = eEmail.value;
    let presencial = eOpcion1.checked;
    let online = eOpcion2.checked;
    let descripcion = eDesc.value;

    let modalidad = ""
    
    //Verificar la modalidad que se seleccionó
    if (presencial == true){
        modalidad = "presencial"
    }
    else{
        modalidad = "online"
    }

    
    //Validaciones de los campos del formulario, si contienen valores nulos, vacios o invalidos se les añade la clase 'error' y remueve la clase 'noerror'.
    //También añade un mensaje de alerta para el usuario. No retornan nada, el return está para evitar que se ejecute codigo innecesario.

    //Clases del css error y noerror
    //.error{border: 1px solid red;}
    //.noerror{border: 1px solid black;}



    //Validar el input del nombre
    if (nombre.trim() === "") {
        eNom.classList.add("error");
        eNom.classList.remove("noerror")
        document.getElementById("errorMensaje").textContent = "Campo inválido. Por favor, ingrese un nombre.";
        return;
    }


    //Validar input de la fecha
    if (fecha.trim() === "") {
        eFecha.classList.add("error");
        eFecha.classList.remove("noerror")
        document.getElementById("errorMensaje").textContent = "Campo inválido. Debe ingresar una fecha.";
        return;
    }
    //Validar el input de la fecha que no sea una fecha pasada
    let fechaActual = new Date();
    let fechaIngresada = new Date(fecha);
    if (fechaIngresada < fechaActual) {
        eFecha.classList.add("error");
        eFecha.classList.remove("noerror")
        document.getElementById("errorMensaje").textContent = "Campo inválido. La fecha debe ser una fecha a futuro.";
        return;
    }

    //Validar el input de la hora
    if (hora.trim() === ""){
        eHora.classList.add("error");
        eHora.classList.remove("noerror");
        document.getElementById("errorMensaje").textContent = "Campo inválido. Por favor, ingresa una hora válida"
        return;
    }
    //Validar el input del email
    if (email.trim() === "") {
        eEmail.classList.add("error");
        eEmail.classList.remove("noerror");
        document.getElementById("errorMensaje").textContent = "Campo inválido. Por favor, ingrese un email.";
        return;
    }

    //Validar radios de modalidad
    if (!online && !presencial) {
        document.getElementById("errorRadios").style.display = "block";
        return;
    }else{
        document.getElementById("errorRadios").style.display = "none";
    }

    //Validar el input del email
    if (servicio.trim() === "") {
        eServicios.classList.add("error");
        eServicios.classList.remove("noerror");
        document.getElementById("errorMensaje").textContent = "Campo inválido. Por favor, selecciona un tipo de servicio.";
        return;
    }


    //Validar el input de la duración
    let duraciontest = parseFloat(duracion);
    if (isNaN(duraciontest) || duraciontest <= 0) {
        eDuracion.classList.add("error");
        eDuracion.classList.remove("noerror")
        document.getElementById("errorMensaje").textContent = "Campo inválido. La duración debe ser un número positivo.";
        return;
    }

    //Validar el input de la descripción
    if (descripcion.trim() === "") {
        eDesc.classList.add("error");
        eDesc.classList.remove("noerror")
        document.getElementById("errorMensaje").textContent = "Campo inválido. Por favor, ingrese una descripción.";
        return;
    }

    //Obtiene el listado de solicitudes que está almacenado en el localstorage
    let listadosolicitud = localStorage.getItem('solicitudes');
    let listadoAntiguo = JSON.parse(listadosolicitud);

    //Crea la solicitud y la ingresa. Dependiendo si el listado está nulo o no, para ajustar el ID
    if (listadoAntiguo==null){
        let solicitud = {"id":0,"nombre":nombre,"fecha":fecha,"hora":hora,"email":email,"modalidad":modalidad,"servicio":servicio,"duracion":duracion,"descripcion":descripcion}
        listadoNuevo = [solicitud]
        localStorage.setItem('solicitudes',JSON.stringify(listadoNuevo));
      
    }else{
        let solicitud = {"id": listadoAntiguo.length, "nombre":nombre,"fecha":fecha,"hora":hora,"email":email,"modalidad":modalidad,"servicio":servicio,"duracion":duracion,"descripcion":descripcion}
        listadoNuevo = [...listadoAntiguo,solicitud]
        localStorage.setItem('solicitudes',JSON.stringify(listadoNuevo));
       
    }
    //Mostrar/actualizar la tabla con los nuevos items
    cargarTabla(listadoNuevo)
    
    //Vaciar todos los campos del formulario
    eNom.value = "";
    eFecha.value = "";
    eHora.value = "";
    eEmail.value = "";
    eOpcion1.checked = false;
    eOpcion2.checked = false;
    eServicios.selectedIndex = 0;
    eDuracion.value = "";
    eDesc.value = "";

    //Mostrar mensaje de éxito
    document.getElementById("errorMensaje").textContent = "¡Formulario enviado con éxito!";

};
//Funcion para cargar los datos apenas cargue la pagina
var cargarDatos = ()=>{
    
    //Obtiene los items del localstorage
    let listadosolicitud = localStorage.getItem('solicitudes');

    //Convierte la cadena en un objeto JS
    let listadoAntiguo = JSON.parse(listadosolicitud);

    //Carga la tabla con los datos
    cargarTabla(listadoAntiguo)
}

//Al boton Registrar le agrega el evento que al clickearlo se llame a la función registrar
document.getElementById("btn").addEventListener("click",registrar);

//Listener para que cuando cargue la pagina se llame a la funcion cargarDatos
addEventListener('load',cargarDatos)


//Cambiar el contraste de la página de blanco a negro y viceversa
var contraste=()=>{
    //Variable la cual tiene el botón que cambiará el contraste
    let btn = document.getElementById('btnContraste');


    //Condicional que evalua si el valor del boton es '0', obtiene y guarda en una variable todos los elementos que tengan la clase 'blanco'
    //Para luego añadirle la clase 'negro' y eliminar la clase 'blanco'. Al final cambia el valor del boton a '1'
    //Los valores del boton funcionan para saber en que estado se encuentra, diferenciar los colores del contraste. 
    //Cuando el botón tiene valor '1' se hace lo mismo de antes pero quitando la clase 'negro' y agregando la 'blanco'
    if(btn.value == '0'){

        //Cambia el fondo a color negro
        let elements = document.getElementsByClassName('blanco');
        elements[0].classList.add('negro')
        elements[0].classList.remove('blanco')
        btn.value = '1';
    }
    else if(btn.value == '1'){

        //Cambia el fondo a color blanco
        let elements = document.getElementsByClassName('negro');
        elements[0].classList.add('blanco');
        elements[0].classList.remove('negro');
        btn.value = '0';
    }
}


//Cambiar el tamaño de la fuente del contenido de la página
var fuente = ()=>{
    //Variable la cual tiene el botón que cambiará la fuente
    let btn = document.getElementById('btnFuente');


    //Condicional que evalua en que estado se encuentra la fuente, donde el valor del boton especifica eso.
    //Obtiene los elementos que contienen los distintos tipos de clases de fuentes.
    //.small-letras{font-size: 8px;}
    //.medium-letras{font-size: 12px;}
    //.large-letras{font-size: 16px;}


    //Se define la constante largo, tomando en cuenta todos los elementos que tienen las clases correspondientes.
    //El ciclo for lo que hace es recorrer todos esos elementos y a cada uno añadir el nuevo tamaño de fuente y remover el anterior.
    //Para finalmente cambiar el valor del botón al siguiente.
    if(btn.value == '0'){

        //Cambiar el tamaño de la fuente a medio
        let elements = document.getElementsByClassName('small-letras');
        const largo = elements.length;
        for (let i = 0; i < largo; i++){
            const element = elements[0]
            element.classList.add('medium-letras')
            element.classList.remove('small-letras')

        }
        btn.value = '1';
    }
    else if (btn.value == '1'){

        //Cambiar el tamaño de la fuente a grande
        let elements = document.getElementsByClassName('medium-letras');
        const largo = elements.length;
        for (let i = 0; i < largo; i++){
            const element = elements[0];
            element.classList.add('large-letras')
            element.classList.remove('medium-letras')
        }
        btn.value = '2';
    }
    else if (btn.value == '2'){

        //Devuelve el tamaño de la fuente a pequeña
        let elements = document.getElementsByClassName('large-letras');
        const largo = elements.length
        for (let i = 0; i < largo; i++){
            const element = elements[0];
            element.classList.add('small-letras')
            element.classList.remove('large-letras')
        }
        btn.value = '0'
    }
}

//Asigna el evento de clickear al boton contraste para que al clickearlo llame a la funcion contraste
document.getElementById('btnContraste').addEventListener('click',contraste)

//Asigna el evento de clickear el boton fuente para que al clickearlo llame a la funcion fuente
document.getElementById('btnFuente').addEventListener('click',fuente)


