import { accionesCliente } from "./cliente-service.js";

// Función autoejecutable
(function (){

    // Declaramos variables con las que vamos a trabajar
    const $inputEditdUrl = document.querySelector("[data-url]");
    const $inputEditCategoria = document.querySelector("[data-categoria]");
    const $inputEditNombre = document.querySelector("[data-nombre]");
    const $inputEditPrecio = document.querySelector("[data-precio]");
    const $inputEditCodigo = document.querySelector("[data-codigo]");
    const $inputEditDescripcion = document.querySelector("[data-descripcion]");
    const errorCategoria = document.querySelector(".addformulario__error--categoria");
    errorCategoria.innerHTML = "";

    // Variable para editar
    const url = new URL(window.location);
    const idUrl = url.searchParams.get("id");
    const $formularioEditar = document.querySelector(".addformulario__container");

    // Función para obtener y mostrar datos del servidor en los inputs
    const mostrarDatos = () => {
            accionesCliente.getProducto(idUrl).then((data) => {
                try{
                    if(idUrl == data.id){
                        $inputEditdUrl.value = data.urlimagen;
                        $inputEditCategoria.value = data.categoria;
                        $inputEditNombre.value = data.nombre;
                        $inputEditPrecio.value = data.precio;
                        $inputEditCodigo.value = data.codigo;
                        $inputEditDescripcion.value = data.descripcion;
                    } else {
                        location.href = "productos.html"
                    };
                } catch (error) {
                    alert(error || "Ocurrió un error");
                };
            });
    };

    mostrarDatos();

    // Función para validar los inputs del formulario
    const ValidarInputsEditProducto = () =>{
        document.addEventListener("keyup", evento =>{
            const clickEvent = evento.target;
            const errorUrl = document.querySelector(".addformulario__error--url");
            errorUrl.innerHTML = "";
            const errorProducto = document.querySelector(".addformulario__error--producto");
            errorProducto.innerHTML = "";
            const errorPrecio = document.querySelector(".addformulario__error--precio");
            errorPrecio.innerHTML = "";
            const errorCodigo = document.querySelector(".addformulario__error--codigo");
            errorCodigo.innerHTML = "";
            const errorDescripcion = document.querySelector(".addformulario__error--descripcion");
            errorDescripcion.innerHTML = "";
        
            const regexProducto = /^.{2,20}$/gm;
            const regexAddUrl = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/g;
            const regexPrecio = /^([1-9]\d*(\.)\d*|0?(\.)\d*[1-9]\d*|[1-9]\d*)$/gm;
            const regexCodigo = /^([1-9]\d*(\.)\d*|0?(\.)\d*[1-9]\d*|[1-9]\d*)$/gm;
            const regexDescripcion = /^.{9,140}$/gm;
        
        
            if(clickEvent.matches("[data-url]")){
                if(clickEvent.value == ""){
                    errorUrl.innerHTML = "Campo no puede estar vacío";
                } else if(!regexAddUrl.test(clickEvent.value)) {
                    errorUrl.innerHTML = "No es un URL";
                };
            };
        
            if(clickEvent.matches("[data-nombre]")){
                if(clickEvent.value == ""){
                    errorProducto.innerHTML = "Campo no puede estar vacío";
                } else if (!regexProducto.test(clickEvent.value)){
                    errorProducto.innerHTML = "No puede superar los 20 caracteres";
                };
            };
        
            if(clickEvent.matches("[data-precio]")){
                if(clickEvent.value == "" || clickEvent.value <= 0){
                    errorPrecio.innerHTML = "Campo no puede estar vacío o valor en cero. Inserte un monto.";
                } else if(!regexPrecio.test(clickEvent.value)) {
                    errorPrecio.innerHTML = "No es un número";
                };
            };

            if(clickEvent.matches("[data-codigo]")){
                if(clickEvent.value == "" || clickEvent.value <= 0){
                    errorCodigo.innerHTML = "Campo no puede estar vacío o en cero. Inserte un código numérico.";
                } else if(!regexCodigo.test(clickEvent.value)) {
                    errorCodigo.innerHTML = "No es un número";
                };
            };
        
            if(clickEvent.matches("[data-descripcion]")){
                if(clickEvent.value == ""){
                    errorDescripcion.innerHTML = "Campo no puede estar vacío";
                } else if(!regexDescripcion.test(clickEvent.value)) {
                    errorDescripcion.innerHTML = "Min 10 y max 140 caracteres.";
                };
            };
        });
        
        $inputEditCategoria.addEventListener("blur", () =>{
            if($inputEditCategoria.value == ""){
                errorCategoria.innerHTML = "Seleccione categoría";
            } else {
                errorCategoria.innerHTML = "";
            };
        });
    };


    // Llamada de función
    ValidarInputsEditProducto();

    // Función para obtener los datos del formulario, datos que vamos a enviar al servidor para realizar la modificación
    const obtenerDatosFormulario = () => {
        let datos = new FormData($formularioEditar);
        let datosProcesados = Object.fromEntries(datos.entries());
        return datosProcesados;
    };

    // Función para validar que los campos no estén vacíos. De cumplirse esta condición, procede a enviar los datos al servidor para proceder con su edición. Al finalizar nos redirige a la página de productos.
    const validacionYEdicionProducto = () =>{
        $formularioEditar.addEventListener("submit", (evento) =>{
            let $formularioRespuesta = document.querySelector(".addformulario__respuesta");
            let nuevoUsuario = obtenerDatosFormulario();    
            evento.preventDefault();
            if((($inputEditdUrl.value != "" && $inputEditCategoria.value != "") && ($inputEditNombre.value != "" && $inputEditPrecio.value != "")) && ($inputEditCodigo.value != "" && $inputEditDescripcion.value != "")){
                obtenerDatosFormulario();
                if(confirm("¿Desea editar producto?") == true) {
                    accionesCliente.editProducto(idUrl, nuevoUsuario)
                    $formularioRespuesta.innerHTML = "Producto editado con éxito!"
                    setTimeout(()=>{
                        $formularioRespuesta.innerHTML = "Redigiriendo a página de productos..."
                    }, 1500);
                    setTimeout(() => {
                    window.location.href = "productos.html";
                    }, 1500);
                };
                
            } else{
                $formularioRespuesta.innerHTML = "Hay campos por rellenar."
            };
            
        });
    };

    validacionYEdicionProducto();

})();