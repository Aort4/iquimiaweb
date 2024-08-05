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
            populateTable(employees);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    function mostrarFecha(fechaHora) {
        
        const datePart = fechaHora.split('T')[0]; 
        const dateParts = datePart.split("-");
        if (dateParts.length === 3) {
            const year = dateParts[0];
            const month = dateParts[1].padStart(2, "0"); 
            const day = dateParts[2].padStart(2, "0"); 
            return `${day}-${month}-${year}`;
        }
        return fechaHora;
    }

    const populateTable = (data) => {
        const tableBody = document.getElementById('tabla');
        tableBody.innerHTML = ''; 

        data.forEach((employee, index) => {
            const row = document.createElement('tr');
    
            row.innerHTML = `
                <td>${index + 1}</td>
                 <td>${employee.correo}</td>
                <td>${employee.nombre}</td>
                <td>${employee.puntos}</td>
                <td>${employee.estrellas}</td>
                <td>${mostrarFecha(employee.fecha)}</td>
            `;

            tableBody.appendChild(row);
        });
    };

    const searchEmployees = () => {
        const searchTerm = document.getElementById('search-input').value.toLowerCase();
        if (searchTerm === "") {
            populateTable(employees); 
        } else {
            const filteredEmployees = employees.filter(employee =>
                employee.nombre.toLowerCase().includes(searchTerm) ||
                employee.correo.toLowerCase().includes(searchTerm)
            );
            populateTable(filteredEmployees);
        }
    };

    document.getElementById('search-button').addEventListener('click', searchEmployees);
    document.getElementById('search-input').addEventListener('keyup', searchEmployees);

    fetchData();
});
