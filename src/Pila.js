class Pila {
    constructor() {
        // "tope" apunta al dato más reciente; null significa que no hay datos.
        this.tope = null;
        // Guardamos el tamaño para consultarlo sin recorrer los nodos.
        this.cantidad = 0;
    }

    apilar(dato) {
        // El nodo nuevo queda arriba y apunta al antiguo tope.
        this.tope = { dato, siguiente: this.tope };
        this.cantidad++;
    }

    desapilar() {
        // No hay nada que sacar si la pila está vacía.
        if (this.estaVacia()) return null;

        const dato = this.tope.dato;
        // El siguiente nodo pasa a ser el nuevo tope.
        this.tope = this.tope.siguiente;
        this.cantidad--;
        return dato;
    }

    verTope() {
        // Devuelve el dato de arriba sin quitarlo.
        return this.tope ? this.tope.dato : null;
    }

    estaVacia() {
        // Una pila vacía tiene cero elementos.
        return this.cantidad === 0;
    }

    tamanio() {
        // El tamaño se devuelve directamente, sin recorrer la pila.
        return this.cantidad;
    }
}

module.exports = Pila;
