
// Función  anónima autoejecutable
(function () {

    // Declaración de variables con las que vamos a trabajar
    const inputEmail = document.querySelector("[data-email]");
    const inputPass = document.querySelector("[data-password]");
    const formularioLogin = document.querySelector(".formulario__container");
    const mensajeError = document.querySelector(".formulario__error--formulario")

    const servidor = "https://64b6e945df0839c97e164270.mockapi.io/santos/usuario";

    // GET : Obteniendo usuario administrador del fetch
    const obtenerUsuario = async () => {
        try{
            let respuesta = await fetch(`${servidor}/1`);
            let respuestaJson = await respuesta.json();
            validarInicioSesion(respuestaJson);
        } catch (error){
            let alertaError = error.statusText || "Ocurrió un error"
            alert(alertaError);
        }
    };

    // Llamada Obtener Usuario
    obtenerUsuario();



    // Función para validar correo y contraseña mientras escribe
    const validarInputs = () => {
        inputEmail.addEventListener("keyup", () => {
            let regexEmail = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g;
            let errorEmail = document.querySelector(".formulario__error--email");
            errorEmail.innerHTML = "";
    
            if(inputEmail.value == ""){
                errorEmail.innerHTML = "Campo no puede estra vacío";
            } else if (!regexEmail.test(inputEmail.value)) {
                errorEmail.innerHTML = "Correo inválido.<br>Formato: usuario@dominio.com";
            };
        });
    
        inputPass.addEventListener("keyup", () => {
            let regexPass = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,}$/gm;
            let errorPass = document.querySelector(".formulario__error--password");
            errorPass.innerHTML = "";
    
            if(inputPass.value == ""){
                errorPass.innerHTML = "Campo no puede estar vacío";
            } else if (!regexPass.test(inputPass.value)) {
                errorPass.innerHTML = "Mínimo 6 digitos, 1 número, 1 letra mayúscula y minúscula.";
            };
        });
    };

    // Llamada validar inputs
    validarInputs();


    // Función para validar inicio sesión
    const validarInicioSesion = (respuesta) => {
        formularioLogin.addEventListener("submit", evento =>{
            evento.preventDefault();
            mensajeError.innerHTML = "";
            let alertas = "";
            let validar = false;
        
            if(inputEmail.value != respuesta.email){
                alertas += `Correo incorrecto. <br>`;
                validar = true;
            };
        
            if(inputPass.value != respuesta.password){
                alertas += `Contraseña incorrecta. <br>`;
                validar = true;
            };
        
            if(validar){
                mensajeError.innerHTML = alertas;
            }
            
            if((inputEmail.value == respuesta.email) && ( inputPass.value == respuesta.password)){
                location.href = "productos.html";
            };
        
        });
    };

})();
