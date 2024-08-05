let chart1;
let chart2;
let chart3; 
let chart4;

document.addEventListener('DOMContentLoaded', () => {
  const datalist = document.getElementById('datalistOptions');
  const emailInput = document.getElementById('exampleDataList');

  var myHeaders = new Headers();
  fetch("https://iquimia-production.up.railway.app/perfiles", {
      method: 'GET',
      headers: myHeaders
  })
  .then(response => response.json())
  .then((result) => {
      populateDatalist(result);
  })
  .catch(error => console.log('error', error));
  updateChart1(5, 8); 
  updateChart2(5, 8); 
  updateChart3(5, 6, 9); 
  updateChart4(10,9,5);

  emailInput.addEventListener('input', () => {
      const correo = emailInput.value; 
      if (correo) {
          fetchInformeTiempoyPartidas(correo);
          fetchInformeAcertadasIncorrectas(correo);
          fetchInformeCategorias(correo);
          fetchInformePorcentajeCategorias(correo);
      } else {
          updateChart1(5, 8); 
          updateChart2(5, 8); 
          updateChart3(5, 6, 9); 
          updateChart4(10,9);
      }
  });
});


function populateDatalist(users) {
  try {
      let content = ``;
      users.forEach(user => {
          content += `<option value="${user.Correo}"></option>`; 
      });
      document.querySelector("#datalistOptions").innerHTML = content;
  } catch (ex) {
      alert(ex);
  }
}

function fetchInformeTiempoyPartidas(correo) {
  fetch(`http://localhost:23578/informe/tiempopartida/${correo}`)
      .then(response => response.json())
      .then(data => {
          const datos1 = data[0].Tiempo;
          const datos2 = data[0].Cantidad_Partidas;

          const data1 = Number(datos1);
          const data2 = Number(datos2);

          updateChart1(data1, data2);
      })
      .catch(error => console.error('Error fetching informe data:', error));
}

function fetchInformeAcertadasIncorrectas(correo) {
  fetch(`https://iquimia-production.up.railway.app/informe/acertadasincorrectas/${correo}`)
      .then(response => response.json())
      .then(data => {
          const datos1 = data[0].Cantidad_Acertadas;
          const datos2 = data[0].Cantidad_Fallidas;

          const data1 = Number(datos1);
          const data2 = Number(datos2);

          updateChart2(data1, data2);
      })
      .catch(error => console.error('Error fetching informe data:', error));

}

function fetchInformeCategorias(correo) {
  fetch(`http://localhost:23578/informe/categorias/${correo}`)
    .then(response => response.json())
    .then(data => {
      let cantidadJS = 0;
      let cantidadJE = 0;
      let cantidadJV = 0;

      data.forEach(item => {
        switch (item.descripción) {
          case "Símbolos":
            cantidadJS += item.cantidad;
            break;
          case "Elementos":
            cantidadJE += item.cantidad;
            break;
          case "Valencias":
            cantidadJV += item.cantidad;
            break;
        }
      });

      updateChart3(cantidadJS, cantidadJE, cantidadJV);
    })
    .catch(error => console.error('Error fetching informe categorias data:', error));
}

function fetchInformePorcentajeCategorias(correo) {
  fetch(`https://iquimia-production.up.railway.app/informe/porcentajecategorias/${correo}`)
    .then(response => response.json())
    .then(data => {
      let cantidadPorcentajeJS = 0;
      let cantidadPorcentajeJE = 0;
      let cantidadPorcentajeJV = 0;

      data.forEach(item => {
        switch (item.descripción) {
          case "Símbolos":
            cantidadPorcentajeJS += item.récord_porcentaje;
            break;
          case "Elementos":
            cantidadPorcentajeJE += item.récord_porcentaje;
            break;
          case "Valencias":
            cantidadPorcentajeJV += item.récord_porcentaje;
            break;
        }
      });

      updateChart4(cantidadPorcentajeJS, cantidadPorcentajeJE, cantidadPorcentajeJV);
    })
    .catch(error => console.error('Error fetching informe categorias data:', error));
}


function updateChart1(data1, data2) {
  const barra1 = document.getElementById('barra1');

  if (!chart1) {
    chart1 = new Chart(barra1, {
      type: 'bar',
      data: {
        labels: ['Tiempo', 'Partidas'],
        datasets: [{
          label: 'Cantidad',
          data: [data1, data2],
          backgroundColor: ['rgb(255, 99, 132)', 'rgb(54, 162, 235)'],
          borderWidth: 1
        }]
      },
      options: {
        plugins: {
          legend: {
            labels: {
              usePointStyle: true,
              pointStyle: 'line'
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  } else {
    chart1.data.datasets[0].data = [data1, data2];
    chart1.update();
  }
}

function updateChart2(data1, data2) {
  const barra2 = document.getElementById('barra2');

  if (!chart2) {
    chart2 = new Chart(barra2, {
      type: 'bar',
      data: {
        labels: ['Acertadas', 'Incorrectas'],
        datasets: [{
          label: 'Cantidad',
          data: [data1, data2],
          backgroundColor: ['rgb(255, 99, 132)', 'rgb(54, 162, 235)'],
          borderWidth: 1
        }]
      },
      options: {
        plugins: {
          legend: {
            labels: {
              usePointStyle: true,
              pointStyle: 'line'
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  } else {
    chart2.data.datasets[0].data = [data1, data2];
    chart2.update();
  }
}


function updateChart3(cantidadJS, cantidadJE, cantidadJV) {
  const barra3 = document.getElementById('barra3');

  if (!chart3) {
    chart3 = new Chart(barra3, {
      type: 'doughnut',
      data: {
        labels: ['Símbolos', 'Elementos', 'Valencias'],
        datasets: [{
          label: 'Cantidad de veces jugadas',
          data: [cantidadJS, cantidadJE, cantidadJV],
          backgroundColor: [
            'rgb(255, 99, 132)', 
            'rgb(54, 162, 235)', 
            'rgb(255, 205, 86)'
          ],
          hoverOffset: 4
        }]
      },
      options: {
        responsive: true, 
        plugins: {
          legend: {
            display: true,
            position: 'top',
          },
          tooltip: {
            enabled: true,
          }
        }
      }
    });
  } else {
    chart3.data.datasets[0].data = [cantidadJS, cantidadJE, cantidadJV];
    chart3.update();
  }
}


function updateChart4(cantidadPorcentajeJS, cantidadPorcentajeJE, cantidadPorcentajeJV) {
  const barra4 = document.getElementById('barra4');

  if (!chart4) {
    chart4 = new Chart(barra4, {
      type: 'doughnut',
      data: {
        labels: ['Símbolos', 'Elementos', 'Valencias'],
        datasets: [{
          label: '%',
          data: [cantidadPorcentajeJS, cantidadPorcentajeJE, cantidadPorcentajeJV],
          backgroundColor: [
            'rgb(255, 99, 132)', 
            'rgb(54, 162, 235)', 
            'rgb(255, 205, 86)'
          ],
          hoverOffset: 4
        }]
      },
      options: {
        responsive: true, 
        plugins: {
          legend: {
            display: true,
            position: 'top',
          },
          tooltip: {
            enabled: true,
          }
        }
      }
    });
  } else {
    chart4.data.datasets[0].data = [cantidadPorcentajeJS, cantidadPorcentajeJE, cantidadPorcentajeJV];
    chart4.update();
  }
}