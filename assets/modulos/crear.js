import { accionesCliente } from "./cliente-service.js";

(function () {
    const $formularioAdd = document.querySelector(".addformulario__container");
    const $inpuAddtUrl = document.querySelector("[data-url]");
    const $inputAddCategoria = document.querySelector("[data-categoria]");
    const $inputAddNombre = document.querySelector("[data-nombre]");
    const $inputAddPrecio = document.querySelector("[data-precio]");
    const $inputAddCodigo = document.querySelector("[data-codigo]");
    const $inputAddDescripcion = document.querySelector("[data-descripcion]");
    const $errorCategoria = document.querySelector(".addformulario__error--categoria");
    $errorCategoria.innerHTML = "";

    // Función para validar los inputs del formulario
    const ValidarInputsAddProductos = () =>{
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
        
            const regexNombre = /^.{2,20}$/gm;
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
                } else if (!regexNombre.test(clickEvent.value)){
                    errorProducto.innerHTML = "Mín 2 y max 20 digitos";
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
                    errorCodigo.innerHTML = "Campo no puede estar vacío o valor en cero. Inserte un código numérico.";
                } else if(!regexCodigo.test(clickEvent.value)) {
                    errorCodigo.innerHTML = "No es un número";
                };
            };

            if(clickEvent.matches("[data-descripcion]")){
                if(clickEvent.value == ""){
                    errorDescripcion.innerHTML = "Campo no puede estar vacío";
                } else if(!regexDescripcion.test(clickEvent.value)) {
                    errorDescripcion.innerHTML = "Campo debe tener mínimo 10 caracteres.";
                };
            };
        });
        
        $inputAddCategoria.addEventListener("blur", () =>{
            if($inputAddCategoria.value == ""){
                $errorCategoria.innerHTML = "Seleccione categoría";
            } else {
                $errorCategoria.innerHTML = "";
            };
        });
    };



    // Llamada de función
    ValidarInputsAddProductos();


    // Función para obtener los datos del formulario, datos que vamos a enviar al servidor para realizar la modificación
    const obtenerDatosFormulario = () => {
        let datos = new FormData($formularioAdd);
        let datosProcesados = Object.fromEntries(datos.entries());
        return datosProcesados;
    };



    // Función para validar el envío del formulario y enviar sus datos para su creación.
    const validaryCrearProducto = () =>{
        $formularioAdd.addEventListener("submit", (evento) =>{
            let nuevoUsuario = obtenerDatosFormulario();
            let $formularioRespuesta = document.querySelector(".addformulario__respuesta");
            evento.preventDefault();
            if((($inpuAddtUrl.value != "" && $inputAddCategoria.value != "" ) && ( $inputAddNombre.value != "" && $inputAddPrecio.value != "")) && ($inputAddCodigo.value != "" && $inputAddDescripcion != "")){
                obtenerDatosFormulario();
                if(confirm("¿Desea crear producto?") == true){
                    accionesCliente.postProducto(nuevoUsuario)
                    $formularioRespuesta.innerHTML = "Producto creado con éxito!"
                    setTimeout(()=>{
                        $formularioRespuesta.innerHTML = "Redigiriendo a página de productos..."
                    }, 1500);
                    setTimeout(() => {
                        window.location.href = "productos.html";
                    }, 1500);
                };
            };
            
        });
    };

    validaryCrearProducto();

})();