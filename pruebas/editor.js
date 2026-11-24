const Editor = require("../src/Editor");
const { RegistroClinico } = require("../src/ListaEnlazada");

const mascota = "Luna";
const editor = new Editor(new RegistroClinico(new Map()));

function mostrarHistorial(titulo) {
    const historial = editor.registro.obtenerHistorial(mascota);
    console.log(`\n${titulo}`);
    console.log(historial ? historial.aArreglo() : []);
}

editor.agregar(mascota, { fecha: "24/11", motivo: "Vacunación", costo: 85000 });
editor.agregar(mascota, { fecha: "24/11", motivo: "Control", costo: 40000 });
mostrarHistorial("Después de agregar dos atenciones:");

editor.deshacer();
mostrarHistorial("Después de deshacer:");

editor.rehacer();
mostrarHistorial("Después de rehacer:");

editor.eliminar(mascota, (atencion) => atencion.motivo === "Vacunación");
mostrarHistorial("Después de eliminar la vacunación:");

editor.deshacer();
mostrarHistorial("Después de deshacer la eliminación:");

editor.rehacer();
mostrarHistorial("Después de rehacer la eliminación:");

editor.deshacer();
editor.agregar(mascota, { fecha: "25/11", motivo: "Consulta nueva", costo: 50000 });
mostrarHistorial("Después de una acción nueva:");
console.log("¿Se puede rehacer la acción anterior?", editor.rehacer());
