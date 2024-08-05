const salirImage = document.getElementById('salir');
salirImage.addEventListener('click', function() {
    window.location.href = 'index.html';
});

document.addEventListener('DOMContentLoaded', () => {
    const apiUrl = "https://iquimia-production.up.railway.app/topActual";
    let employees = [];

    const fetchData = async () => {
        try {
            const response = await fetch(apiUrl);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            employees = data;
            employees = sortAndFilterTopEmployees(employees);
            populateTable(employees);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const sortAndFilterTopEmployees = (employees) => {
        return employees
            .sort((a, b) => {
                if (b.puntos === a.puntos) {
                    return b.estrellas - a.estrellas;
                }
                return b.puntos - a.puntos;
            })
            .slice(0, 5);
    };

    const populateTable = (data) => {
        for (let i = 1; i <= 5; i++) {
            const row = document.getElementById(`row${i}`);
            row.style.display = 'none';
            const img = row.querySelector('img');
            if (img) {
                img.style.display = 'none';
            }
        }

        
        data.forEach((employee, index) => {
            const row = document.getElementById(`row${index + 1}`);
            row.style.display = '';
            const img = row.querySelector('img');
            if (img) {
                img.style.display = 'block';
            }
            document.getElementById(`nombre${index + 1}`).innerText = employee.nombre;
            document.getElementById(`puntos${index + 1}`).innerText = employee.puntos;
            document.getElementById(`estrellas${index + 1}`).innerText = employee.estrellas;
        });
    };

    fetchData();
});
