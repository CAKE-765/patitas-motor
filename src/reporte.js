// Importa la clase que arma los historiales de las mascotas.
const { RegistroClinico } = require("./ListaEnlazada");
// Crea el registro usando los datos iniciales.
const registro = new RegistroClinico();

// Recorre cada mascota y su lista de atenciones.
for(const [mascota, historiales] of registro.historiales){
    // Aquí sumaremos el costo de todas sus atenciones.
    let costoTotal = 0;

    console.log(`\nHistoriales de ${mascota}: `);

    // Visita cada atención para mostrarla y sumar su costo.
    historiales.recorrer((atencion) => {
        console.log(`${atencion.fecha} - ${atencion.motivo} - ${atencion.veterinario} - ${atencion.costo}`);
        costoTotal += atencion.costo;
    });

    // Busca una atención cuyo motivo mencione una vacunación.
    const ultimaVacunacion = historiales.buscar((atencion) =>
        atencion.motivo.toLowerCase().includes("vacunación")
    );
    // Muestra la atención encontrada o avisa que no hay una.
    if(ultimaVacunacion){
        console.log(`Ultima vacunacion : ${ultimaVacunacion.fecha} - ${ultimaVacunacion.motivo}`);
    }else{
        console.log("Ultima vacunacion: sin registro");
    }
    // Al final muestra cuántas atenciones hay y cuánto cuestan en total.
    console.log(`Numero de atencionnes: ${historiales.obtenerTamanio()}`);
    console.log(`Costo total: ${costoTotal}`);
}