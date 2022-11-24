const formulario = document.getElementById('formulario');
const inputs = document.querySelectorAll('#formulario input');

const expresiones = {
    usuario: /^[a-zA-Z0-9\_\-]{4,16}$/, //Letras, numeros, guion y guion bajo. De 4 a 16 digitos.
    nombre: /^[a-zA-ZÀ-Ý\s]{1,40}$/, //Letras y espacios, pueden llevar acentos.
    password: /^.{4,15}$/, //De 4 a 12 digitos.
    correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    telefono: /^\d{7,14}$/ //De 7 a 14 numeros.
}

const campos = {
    usuario: false,
    nombrepassword: false,
    password: false,
    correo: false,
    telefono: false  //NO se coloca coma (,) al ultimo elemento del objecto.
}


const validarFormulario = (e) => {
    
    switch (e.target.name) {
        
        case 'usuario':
            validarCampo(expresiones.usuario, e.target, 'usuario');
            
            break;
        case 'nombre':
            validarCampo(expresiones.nombre, e.target, 'nombre');
            
            break;
        case 'password':
            validarCampo(expresiones.password, e.target, 'password');
            validarPassword2();
            break;
        case 'password2':
            validarPassword2 ();            
            
            break;
        case 'correo':
            validarCampo(expresiones.correo, e.target, 'correo');
            
            break;
        case 'telefono':
            validarCampo(expresiones.telefono, e.target, 'telefono');
            
            break;
        
    }
    
}


const validarCampo = (expresion, input, campo) => {
    if(expresion.test(input.value)){
        document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-incorrecto');
        document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-correcto');
        document.querySelector(`#grupo__${campo} i`).classList.add('fa-circle-check');
        document.querySelector(`#grupo__${campo} i`).classList.remove('fa-circle-xmark');
        document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.remove('formulario__input-error-activo');
        campos [campo] = true;
        
    } else {
        document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-incorrecto');
        document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-correcto');
        document.querySelector(`#grupo__${campo} i`).classList.add('fa-circle-xmark');
        document.querySelector(`#grupo__${campo} i`).classList.remove('fa-circle-check');
        document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.add('formulario__input-error-activo');
        campos [campo] = false;
    }
}


const validarPassword2 = () => {
    const inputPassword1 = document.getElementById('password');
    const inputPassword2 = document.getElementById('password2');


    if (inputPassword1.value !== inputPassword2.value) {
        document.getElementById(`grupo__password2`).classList.add('formulario__grupo-incorrecto');
        document.getElementById(`grupo__password2`).classList.remove('formulario__grupo-correcto');
        document.querySelector(`#grupo__password2 i`).classList.add('fa-circle-xmark');
        document.querySelector(`#grupo__password2 i`).classList.remove('fa-circle-check');
        document.querySelector(`#grupo__password2 .formulario__input-error`).classList.add('formulario__input-error-activo');
        campos ['password'] = false;              
    } else {
        document.getElementById(`grupo__password2`).classList.remove('formulario__grupo-incorrecto');
        document.getElementById(`grupo__password2`).classList.add('formulario__grupo-correcto');
        document.querySelector(`#grupo__password2 i`).classList.remove('fa-circle-xmark');
        document.querySelector(`#grupo__password2 i`).classList.add('fa-circle-check');
        document.querySelector(`#grupo__password2 .formulario__input-error`).classList.remove('formulario__input-error-activo');
        campos ['password'] = true;              
    }
}



inputs.forEach((input) => {
    input.addEventListener('keyup', validarFormulario); //Ocurre un evento al presionar una tecla dentro del input ("tecla levantada").
    //input.addEventListener('blur', validarFormulario); //Ocurre un evento al presionar fuera del input.

});

formulario.addEventListener('submit', (e) =>{
    e.preventDefault();

    const terminos = document.getElementById('terminos');
    if (campos.usuario && campos.nombre && campos.password && campos.correo && campos.telefono && terminos.checked) {
        formulario.reset();


        document.getElementById('formulario__mensaje-exito').classList.add('formulario__mensaje-exito-activo');
        setTimeout( () => {
            document.getElementById('formulario__mensaje-exito').classList.remove('formulario__mensaje-exito-activo');
        }, 3000);


        document.querySelectorAll('.formulario__grupo-correcto').forEach((icono) => {
            icono.classList.remove('formulario__grupo-correcto');
        });

    } else {
        document.getElementById('formulario__mensaje').classList.add('formulario__mensaje-activo');
        //console.log('Estoy aqui');
        setTimeout( () => {
            document.getElementById('formulario__mensaje').classList.remove('formulario__mensaje-activo');
            //console.log('Hola');
        }, 3000);
    }

});