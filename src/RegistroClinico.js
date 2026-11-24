const datosIniciales = new Map([
    ["Lola (gata)", [
        { fecha: "02/02", motivo: "Vacunación anual", veterinario: "Dra. Ríos", costo: 85000 },
        { fecha: "15/03", motivo: "Control de peso", veterinario: "Dr. Gómez", costo: 40000 },
        { fecha: "20/05", motivo: "Limpieza dental", veterinario: "Dra. Ríos", costo: 150000 },
    ]],
    ["Toby (perro)", [
        { fecha: "10/01", motivo: "Consulta por cojera", veterinario: "Dr. Gómez", costo: 60000 },
        { fecha: "12/01", motivo: "Radiografía de pata", veterinario: "Dr. Gómez", costo: 120000 },
        { fecha: "05/04", motivo: "Vacunación anual", veterinario: "Dra. Ríos", costo: 85000 },
    ]],
    ["Mía (gata)", [
        { fecha: "18/02", motivo: "Esterilización", veterinario: "Dra. Ríos", costo: 280000 },
        { fecha: "25/02", motivo: "Control posquirúrgico", veterinario: "Dra. Ríos", costo: 0 },
    ]],
]);

module.exports = datosIniciales;