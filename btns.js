document.addEventListener('DOMContentLoaded', function() {
    
    const boton = document.getElementById('BotonV1');
    boton.addEventListener('click', function() {
      window.location.href = 'ranking.html';
    });
  
    const boton2 = document.getElementById('BotonV2');
    boton2.addEventListener('click', function() {
      VerificarAdmin()
    });

    const boton3 = document.getElementById('BotonV3');
    boton3.addEventListener('click', function() {
      window.location.href = 'estadisticas.html';
    });
  
  });

  function VerificarAdmin() {
    const userRole = localStorage.getItem('rol');  
  
    if (userRole === 'Administrador') {
      window.location.href = 'tablausuarios.html'; 
    } else {
      alert('No tienes permisos para acceder a esta sección.');
    }
  }
