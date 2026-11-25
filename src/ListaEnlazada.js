// Cada nodo guarda un dato y la conexión con el siguiente.
const Nodo = require("./Nodo")

// ListaEnlazada mantiene los datos conectados en orden.
class ListaEnlazada {
    constructor() {
        // cabeza es el primer nodo y cola es el último.
        this.cabeza = null;
        this.cola = null;
        // Guarda el número de nodos para conocer el tamaño rápidamente.
        this.tamanio = 0;
    }


    agregarAlFinal(dato) {
        // Crea el nuevo nodo, que quedará al final.
        const nuevo = new Nodo(dato);
        // Si no había datos, el nuevo nodo será también la cabeza.
        if (!this.cabeza) this.cabeza = nuevo;
        // Si ya había datos, el último apunta al nuevo.
        else this.cola.siguiente = nuevo;
        this.cola = nuevo;
        this.tamanio++;
    }


    agregarAlInicio(dato) {
        // El nodo nuevo apunta al que antes era el primero.
        const nuevo = new Nodo(dato);
        nuevo.siguiente = this.cabeza;
        this.cabeza = nuevo;
        // Si la lista estaba vacía, el nuevo nodo también es la cola.
        if (!this.cola) this.cola = nuevo;
        this.tamanio++;
    }

    aArreglo() {
        // Copia los datos en un arreglo para poder mostrarlos fácilmente.
        const datos = [];
        let actual = this.cabeza;
        while (actual) {
            datos.push(actual.dato);
            actual = actual.siguiente;
        }
        return datos;
    }

    recorrer(callback) {
        // Visita cada nodo desde la cabeza y ejecuta la función recibida.
        let actual = this.cabeza;
        while (actual) {
            callback(actual.dato);
            actual = actual.siguiente;
        }
    }

    estaVacia() {
        // Si el tamaño es cero, no hay nodos.
        return this.tamanio === 0;
    }

    obtenerTamanio() {
        // Devuelve el contador actualizado al agregar o eliminar nodos.
        return this.tamanio;
    }

    buscar(condicion) {
        // Revisa los datos en orden y devuelve el primero que cumple la condición.
        let actual = this.cabeza;
        while (actual) {
            if (condicion(actual.dato)) return actual.dato;
            actual = actual.siguiente;
        }
        return null;
    }

    // Elimina el primer nodo que cumple la condición y devuelve su dato (o null)
    eliminar(condicion) {
        if (!this.cabeza) return null;
        // Si el dato está al inicio, mueve la cabeza al siguiente nodo.
        if (condicion(this.cabeza.dato)) {
            const dato = this.cabeza.dato;
            this.cabeza = this.cabeza.siguiente;
            if (!this.cabeza) this.cola = null;
            this.tamanio--;
            return dato;
        }
        // Si no está al inicio, busca el nodo anterior al que se va a quitar.
        let anterior = this.cabeza;
        while (anterior.siguiente) {
            if (condicion(anterior.siguiente.dato)) {
                const dato = anterior.siguiente.dato;
                anterior.siguiente = anterior.siguiente.siguiente;
                if (!anterior.siguiente) this.cola = anterior; // eliminamos la cola
                this.tamanio--;
                return dato;
            }
            anterior = anterior.siguiente;
        }
        return null;
    }
    insertarDespuesDe(condicion, dato) {
    // Busca el dato que cumple la condición para insertar otro justo después.
    let actual = this.cabeza;

    while (actual) {
        if (condicion(actual.dato)) {
            const nuevo = new Nodo(dato);
            nuevo.siguiente = actual.siguiente;
            actual.siguiente = nuevo;

            // Si insertamos después del último, el nuevo se convierte en la cola.
            if (actual === this.cola) {
                this.cola = nuevo;
            }

            this.tamanio++;
            return true;
        }

        actual = actual.siguiente;
    }

    return false;
}
}
// Estos son los datos iniciales que usa el registro clínico.
const datosIniciales = require("./RegistroClinico");

// RegistroClinico guarda una lista enlazada para cada mascota.
class RegistroClinico {
    constructor(datos = datosIniciales) {
        this.historiales = new Map();

        // Carga cada atención inicial usando el mismo método de registro.
        for (const [mascota, atenciones] of datos) {
            for (const atencion of atenciones) {
                this.registrarAtencion(mascota, atencion);
            }
        }
    }

    registrarAtencion(mascota, atencion) {
        // Si la mascota aún no tiene historial, crea una lista para ella.
        if (!this.historiales.has(mascota)) {
            this.historiales.set(mascota, new ListaEnlazada());
        }

        // Agrega la atención al final de la lista de esa mascota.
        this.historiales.get(mascota).agregarAlFinal(atencion);
    }

    obtenerHistorial(mascota) {
        // Devuelve la lista de la mascota o null si todavía no existe.
        return this.historiales.get(mascota) || null;
    }
}

// Exporta las dos clases para que puedan usarse desde otros archivos.
module.exports = {ListaEnlazada, RegistroClinico};