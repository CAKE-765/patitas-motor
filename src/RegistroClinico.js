// Datos de ejemplo: cada nombre se relaciona con una lista de atenciones.
const datosIniciales = new Map([
    // Cada atención incluye fecha, motivo, veterinario y costo.
    ["Lola (gata)", [
        { fecha: "02/02", motivo: "Vacunación anual", veterinario: "Dra. Ríos", costo: 85000 },
        { fecha: "15/03", motivo: "Control de peso", veterinario: "Dr. Gómez", costo: 40000 },
        { fecha: "20/05", motivo: "Limpieza dental", veterinario: "Dra. Ríos", costo: 150000 },
    ]],
    // Historial de Toby.
    ["Toby (perro)", [
        { fecha: "10/01", motivo: "Consulta por cojera", veterinario: "Dr. Gómez", costo: 60000 },
        { fecha: "12/01", motivo: "Radiografía de pata", veterinario: "Dr. Gómez", costo: 120000 },
        { fecha: "05/04", motivo: "Vacunación anual", veterinario: "Dra. Ríos", costo: 85000 },
    ]],
    // Historial de Mía.
    ["Mía (gata)", [
        { fecha: "18/02", motivo: "Esterilización", veterinario: "Dra. Ríos", costo: 280000 },
        { fecha: "25/02", motivo: "Control posquirúrgico", veterinario: "Dra. Ríos", costo: 0 },
    ]],
]);

// Permite que ListaEnlazada.js cargue estos datos al crear un registro.
module.exports = datosIniciales;