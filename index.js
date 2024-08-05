const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
const container = document.querySelector(".container");

sign_up_btn.addEventListener("click", () => {
  container.classList.add("sign-up-mode");
});

sign_in_btn.addEventListener("click", () => {
  container.classList.remove("sign-up-mode");
});

function validarCamposLogin() {
  var user = document.getElementById('usuario').value;
  var pass = document.getElementById('password').value;

  if (user === "" || pass === "") {
    alert("Por favor, completa todos los campos.");
    return false;
  }
  return true;
}


function validarCamposRegistro() {
  var user = document.getElementById('registro-usuario').value;
  var pass = document.getElementById('registro-password').value;

  if (user === "" || pass === "") {
    alert("Por favor, completa todos los campos.");
    return false;
  }
  return true;
}

const topButton = document.getElementById('topfive');
const loginButton = document.getElementById('iniciarsesion');
const registerButton = document.getElementById('registrarse');

topButton.addEventListener('click', (e) => {
  e.preventDefault();
  window.location.href = 'top.html'; 
});

loginButton.addEventListener('click', async (e) => {
  e.preventDefault();
  if (!validarCamposLogin()) return;

  const usuario = document.querySelector('#usuario').value;
  const contraseña = document.querySelector('#password').value;

  // Encriptar la contraseña
  const contraseñaEncriptada = CryptoJS.SHA256(contraseña).toString();

  const requestOptions = {
    method: "GET",
    redirect: "follow"
  };

  fetch(`https://iquimia-production.up.railway.app/login/${usuario}`, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      if (result.length > 0 && result[0].password === contraseñaEncriptada) {
        localStorage.setItem('nombreUsuario', usuario);  // Guarda el nombre de usuario en localStorage
        localStorage.setItem('rol',result[0].rol);  // Guarda el nombre de rol en localStorage
        window.location.href = 'dashboard.html';
      } else {
        alert("Contraseña incorrecta. Por favor, intenta nuevamente.");
      }
    })
    .catch((error) => console.error(error));
});

registerButton.addEventListener('click', async (e) => {
  e.preventDefault();
  if (!validarCamposRegistro()) return;

  const usuario = document.querySelector('#registro-usuario').value;
  const contraseña = document.querySelector('#registro-password').value;

  // Encriptar la contraseña
  const contraseñaEncriptada = CryptoJS.SHA256(contraseña).toString();

  const requestOptions = {
    method: "GET",
    redirect: "follow"
  };

  fetch(`https://iquimia-production.up.railway.app/login/${usuario}`, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      if (result.length > 0) {
        alert("El usuario ya posee una cuenta. Por favor, inicia sesión.");
      } else {
        
        const registerOptions = {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            usuario: usuario,
            password: contraseñaEncriptada
          }),
          redirect: "follow"
        };

        fetch(`https://iquimia-production.up.railway.app/register`, registerOptions)
          .then((response) => response.json())
          .then((data) => {
            if (data.success) {
              alert("Cuenta creada exitosamente. Ahora puedes iniciar sesión.");
              container.classList.remove("sign-up-mode");
            } else {
              alert("Hubo un error al crear la cuenta. Por favor, intenta nuevamente.");
            }
          })
          .catch((error) => console.error(error));
      }
    })
    .catch((error) => console.error(error));
});
