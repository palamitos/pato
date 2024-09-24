let originalTeams = [
    "Equipo 1A", "Equipo 2A", "Equipo 3A", "Equipo 4A",
    "Equipo 1B", "Equipo 2B", "Equipo 3B", "Equipo 4B",
    "Equipo 1C", "Equipo 2C", "Equipo 3C", "Equipo 4C",
    "Equipo 1D", "Equipo 2D", "Equipo 3D", "Equipo 4D"
];

function allowDrop(event) {
    event.preventDefault();
}

function drag(event) {
    event.dataTransfer.setData("text/plain", event.target.innerHTML);
    event.dataTransfer.setData("sourceId", event.target.parentNode.id);
}

function drop(event) {
    event.preventDefault();
    const data = event.dataTransfer.getData("text/plain");
    const sourceId = event.dataTransfer.getData("sourceId");
    const targetElement = event.target;

    // Asegurarse de que se está soltando en un grupo o un bombo
    if (targetElement.classList.contains("grupo") || targetElement.classList.contains("bombo")) {
        // Limitar a 4 equipos por grupo
        if (targetElement.classList.contains("grupo") && targetElement.children.length >= 4) {
            alert("Este grupo ya tiene 4 equipos.");
            return;
        }

        // Comprobar si el equipo ya está en el grupo
        const existingTeam = [...targetElement.children].find(child => child.innerHTML === data);
        if (existingTeam) {
            alert("Este equipo ya está en el grupo.");
            return;
        }

        // Crear un nuevo elemento para el equipo
        const newElement = document.createElement("div");
        newElement.className = "equipo";
        newElement.draggable = true;
        newElement.ondragstart = (e) => drag(e);
        newElement.innerHTML = data;

        // Agregar el equipo al grupo o al bombo
        targetElement.appendChild(newElement);

        // Eliminar el equipo original del bombo o del grupo
        const sourceElement = document.querySelector(`#${sourceId} .equipo`);
        const teamToRemove = [...sourceElement.parentNode.children].find(child => child.innerHTML === data);
        if (teamToRemove) {
            teamToRemove.remove();
        }
    }
}

// Resetear el sorteo
document.getElementById("resetButton").addEventListener("click", () => {
    document.querySelectorAll('.grupo .equipo').forEach(equipo => {
        equipo.remove();
    });
    
    // Reagregar equipos al bombo original
    const bombos = document.querySelectorAll('.bombo');
    bombos.forEach((bombo, index) => {
        bombo.innerHTML = `<h2>Bombo ${index + 1}</h2>`; // Reiniciar el contenido de cada bombo
        originalTeams.slice(index * 4, (index + 1) * 4).forEach(equipo => {
            const newElement = document.createElement("div");
            newElement.className = "equipo";
            newElement.draggable = true;
            newElement.ondragstart = (e) => drag(e);
            newElement.innerHTML = equipo;
            bombo.appendChild(newElement);
        });
    });
});
