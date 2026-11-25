// Importa la clase que permite agregar, eliminar, deshacer y rehacer.
const Editor = require("../src/Editor");
// Importa el registro clínico que guarda las atenciones de las mascotas.
const { RegistroClinico } = require("../src/ListaEnlazada");

// Este ejemplo trabajará con el historial de Luna.
const mascota = "Luna";
// Crea un registro vacío para que el ejemplo empiece sin datos anteriores.
const editor = new Editor(new RegistroClinico(new Map()));

// Busca y muestra las atenciones actuales de Luna.
function mostrarHistorial(titulo) {
    const historial = editor.registro.obtenerHistorial(mascota);
    // El título indica qué acción acabamos de probar.
    console.log(`\n${titulo}`);
    // Convierte la lista enlazada a un arreglo para verla fácilmente.
    // Si Luna no tiene historial, muestra un arreglo vacío.
    console.log(historial ? historial.aArreglo() : []);
}

// Agrega dos atenciones al historial de Luna.
editor.agregar(mascota, { fecha: "24/11", motivo: "Vacunación", costo: 85000 });
editor.agregar(mascota, { fecha: "24/11", motivo: "Control", costo: 40000 });
mostrarHistorial("Después de agregar dos atenciones:");

// Quita la última acción realizada: agregar el control.
editor.deshacer();
mostrarHistorial("Después de deshacer:");

// Vuelve a realizar la acción que acabamos de deshacer.
editor.rehacer();
mostrarHistorial("Después de rehacer:");

// Elimina la atención cuyo motivo es "Vacunación".
// La función revisa cada atención y devuelve true cuando encuentra esa.
editor.eliminar(mascota, (atencion) => atencion.motivo === "Vacunación");
mostrarHistorial("Después de eliminar la vacunación:");

// Recupera la atención que acabamos de eliminar.
editor.deshacer();
mostrarHistorial("Después de deshacer la eliminación:");

// Elimina de nuevo la vacunación.
editor.rehacer();
mostrarHistorial("Después de rehacer la eliminación:");

// Deshace la eliminación y luego agrega una atención nueva.
// Esa acción nueva borra la posibilidad de rehacer la eliminación anterior.
editor.deshacer();
editor.agregar(mascota, { fecha: "25/11", motivo: "Consulta nueva", costo: 50000 });
mostrarHistorial("Después de una acción nueva:");
// Debe mostrar false: ya no queda ninguna acción para rehacer.
console.log("¿Se puede rehacer la acción anterior?", editor.rehacer());
