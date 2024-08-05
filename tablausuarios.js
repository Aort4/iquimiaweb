var myHeaders = new Headers();
fetch("https://iquimia-production.up.railway.app/login", opciones("GET", myHeaders))
    .then(response => response.json())
    .then((result) => {
        mostrar(result);
        list(result);
    })
    .catch(error => console.log('error', error));

function mostrar(users) {
    try {
        let content = ``;
        users.forEach((user, index) => {
            content += `
                <tr id="${index + 1}">
                    <td data-label="Usuario">${user.usuario}</td>
                    <td data-label="Contraseña"><input type="password" id="contra" value="${user.password}" readonly></td>
                </tr>`;
        });
        document.querySelector("#tabla").innerHTML = content;
    } catch (ex) {
        alert(ex);
    }
}

function formatoNumeros(index) {
    if (index + 1 < 10) {
        return `00${index + 1}`;
    } else if (index + 1 < 100) {
        return `0${index + 1}`;
    } else {
        return `${index + 1}`;
    }
}

const $select1 = document.getElementById('usuarios');
const $select2 = document.getElementById('usuarios1');

function User(ventana, ventana2, ventana3) {
    if (document.querySelector(ventana).style.display == "block") {
        document.querySelector(ventana).style.display = "none";
    } else {
        document.querySelector(ventana).style.display = "block";
        document.querySelector(ventana2).style.display = "none";
        document.querySelector(ventana3).style.display = "none";
    }
}

elegirOpc($select1);

function elegirOpc(opc) {
    opc.addEventListener('change', function () {
        var selectedOption = this.options[opc.selectedIndex];
        localStorage.setItem("eliminar", selectedOption.value);
    });
}

function eliminarUser() {
    fetch(`https://iquimia-production.up.railway.app/login/${localStorage.getItem("eliminar")}`, opciones("DELETE", myHeaders))
        .then(response => response.text())
        .then(result => {
            console.log(result);
            window.location.href = 'tablausuarios.html';
        })
        .catch(error => console.log('error', error));
    document.querySelector("#Vent").style.display = "none";
}

async function registrar() {
    try {
        const usuario = document.getElementById('Usuario1').value;
        const contraseña = document.getElementById('Contraseña1').value;

        // Validar que los campos no estén vacíos
        if (usuario.trim() === '' || contraseña.trim() === '') {
            window.alert("Por favor, ingrese usuario y contraseña válidos.");
            return;
        }

        // Encriptar la contraseña
        const Encriptada = CryptoJS.SHA256(contraseña).toString();

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "usuario": usuario,
            "password": Encriptada
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        const usuarioExiste = await validarUsuario(usuario);
        if (!usuarioExiste) {
            const response = await fetch("https://iquimia-production.up.railway.app/login", requestOptions);
            const result = await response.json();
            console.log(result);
            window.alert("Usuario Registrado.");
            window.location.href = 'tablausuarios.html';
        } else {
            window.alert("La persona posee una cuenta.");
        }
    } catch (error) {
        console.error("Error durante el registro:", error);
        window.alert("Error: " + error.message);
    }
}

async function validarUsuario(usuario) {
    var myHeaders = new Headers();
    var status = false;
    try {
        const response = await fetch("https://iquimia-production.up.railway.app/login", opciones("GET", myHeaders));
        const result = await response.json();
        for (let index = 0; index < result.length; index++) {
            if (result[index].usuario == usuario) {
                status = true;
                break;
            }
        }
    } catch (error) {
        console.log('error', error);
    }
    return status;
}

elegirOpc2($select2);

function elegirOpc2(opc) {
    const contraseña = document.querySelector("#Contraseña");
    opc.addEventListener('change', function () {
        var selectedOption = this.options[opc.selectedIndex];
        localStorage.setItem("actualizar", selectedOption.value);
    });
}

function actualiza() {
    const contraseña = document.querySelector("#Contraseña").value;

    // Validar que el campo no esté vacío
    if (contraseña.trim() === '') {
        window.alert("Por favor, ingrese una contraseña válida.");
        return;
    }

    // Encriptar la contraseña
    const contraseñaEncriptada = CryptoJS.SHA256(contraseña).toString();

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var raw = JSON.stringify({
        "usuario": localStorage.getItem("actualizar"),
        "password": contraseñaEncriptada,
    });
    var requestOptions = {
        method: 'PUT',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };
    fetch(`https://iquimia-production.up.railway.app/login`, requestOptions)
        .then(response => response.text())
        .then(result => {
            console.log(result);
            window.location.href = 'tablausuarios.html';
        })
        .catch(error => console.log('error', error));
    document.querySelector("#Vent2").style.display = "none";
}

function opciones(metodo, validar) {
    var requestOptions = {
        method: metodo,
        headers: validar,
        redirect: 'follow'
    };
    return requestOptions;
}

function list(array) {
    for (let index = 0; index < array.length; index++) {
        const $option = document.createElement("option");
        $option.value = array[index].usuario;
        $option.innerHTML = array[index].usuario;
        const $option2 = document.createElement("option");
        $option2.value = array[index].usuario;
        $option2.innerHTML = array[index].usuario;
        $select2.appendChild($option2);
        $select1.appendChild($option);
    }
}

function salir() {
    window.location.href = 'dashboard.html';
}



