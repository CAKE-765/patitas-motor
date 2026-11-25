// Cada nodo guarda un dato y una referencia al siguiente nodo.
class Nodo {
    constructor(dato) {
        this.dato = dato;
        this.siguiente = null;
    }
}

// Cola atiende en orden FIFO: primero en entrar, primero en salir.
class Cola {
    constructor() {
        // frente es el próximo en salir; final es el último que llegó.
        this.frente = null;
        this.final = null;
        this.cantidad = 0;
    }
    encolar(dato) {
        // Crea un nodo nuevo y lo conecta al final de la fila.
        const nuevo = new Nodo(dato);
        if (this.final) this.final.siguiente = nuevo;
        else this.frente = nuevo;
        this.final = nuevo;
        this.cantidad++;
    }
    // Saca y devuelve el dato del frente, o null si está vacía
    desencolar() {
        if (!this.frente) return null;
        const dato = this.frente.dato;
        // El siguiente nodo pasa a ser el primero de la fila.
        this.frente = this.frente.siguiente;
        // Si ya no hay primero, la fila quedó vacía y no tiene final.
        if (!this.frente) this.final = null;
        this.cantidad--;
        return dato;
    }
    verFrente() {
        // Mira quién sigue sin quitarlo de la fila.
        return this.frente ? this.frente.dato : null;
    }
    tamanio() {
        // Devuelve la cantidad de datos que esperan.
        return this.cantidad;
    }
}

// Permite que otros archivos creen colas.
module.exports = Cola;