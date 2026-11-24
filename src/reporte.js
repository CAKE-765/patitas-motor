const { RegistroClinico } = require("./ListaEnlazada");
const registro = new RegistroClinico();


for(const [mascota, historiales] of registro.historiales){
    let costoTotal = 0;

    console.log(`\nHistoriales de ${mascota}: `);

    historiales.recorrer((atencion) => {
        console.log(`${atencion.fecha} - ${atencion.motivo} - ${atencion.veterinario} - ${atencion.costo}`);
        costoTotal += atencion.costo;
    });

    const ultimaVacunacion = historiales.buscar((atencion) =>
        atencion.motivo.toLowerCase().includes("vacunación")
    );
    if(ultimaVacunacion){
        console.log(`Ultima vacunacion : ${ultimaVacunacion.fecha} - ${ultimaVacunacion.motivo}`);
    }else{
        console.log("Ultima vacunacion: sin registro");
    }
    console.log(`Numero de atencionnes: ${historiales.obtenerTamanio()}`);
    console.log(`Costo total: ${costoTotal}`);
}