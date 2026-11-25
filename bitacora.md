## Prueba: enlace perdido en la lista enlazada

### Diagrama original

```text
cabeza
  |
  v
+------+     siguiente     +------+     siguiente     +------+     siguiente
| n1   | ----------------> | n2   | ----------------> | n3   | ----------->
| dato |                    | dato |                    | dato |
+------+                    +------+                    +------+
  02/02                      15/03                      20/05
  vacunación                 control de peso            limpieza dental
  Dra. Ríos                  Dr. Gómez                  Dra. Ríos
  $85.000                    $40.000                    $150.000
```

### Enlace perdido

Si se asigna `null` al siguiente del primer nodo, `n1` deja de apuntar a `n2`:

```js
n1.siguiente = null;
```

El diagrama queda así:

```text
cabeza
  |
  v
+------+     siguiente
| n1   | ----------------> null
| dato |
+------+

n2 y n3 siguen existiendo en memoria, pero ya no forman parte de la cadena que comienza en `cabeza`.
```

### Qué ocurre con el recorrido

El recorrido `while` comienza en `cabeza`, que ahora es `n1`, procesa el dato de `n1` y luego pasa a `n1.siguiente`, que vale `null`.

```js
let actual = cabeza;

while (actual !== null) {
    console.log(actual.dato);
    actual = actual.siguiente;
}
```

Como `actual` pasa a `null`, el ciclo termina. Solo se muestra la atención del 02/02. Las atenciones de `n2` y `n3` no aparecen, aunque los objetos sigan creados.

En el recorrido del costo total ocurre lo mismo: solo se suma el costo de `n1`.

```text
Resultado del costo total: $85000
```

Esto ocurre porque una lista enlazada no busca los nodos por posición: para llegar a `n2`, el recorrido necesita seguir la referencia `n1.siguiente`. Al reemplazarla por `null`, se rompe la ruta hacia `n2` y `n3`.

## Referencias al agregar nodos

En los diagramas, `cabeza` apunta al primer nodo y `cola` al último. La flecha `siguiente` muestra la referencia entre nodos.

### Agregar al final

**Lista vacía**

Antes:

```text
cabeza -> null
cola   -> null
```

Después de crear `nuevo`:

```text
cabeza ─┐
        v
      [nuevo | siguiente -> null]
        ^
cola ───┘
```

Cambian `cabeza` y `cola`: ambas apuntan a `nuevo`. Su `siguiente` queda en `null`.

**Lista con un nodo**

Antes:

```text
cabeza, cola
     |
     v
   [A | siguiente -> null]
```

Después:

```text
cabeza             cola
   |                 |
   v                 v
 [A | siguiente] -> [nuevo | siguiente -> null]
```

Cambia `A.siguiente`, que apunta a `nuevo`, y `cola`, que pasa a apuntar a `nuevo`. `cabeza` no cambia.

**Lista con varios nodos**

Antes:

```text
cabeza                         cola
   |                             |
   v                             v
 [A | siguiente] -> [B | siguiente] -> [C | siguiente -> null]
```

Después:

```text
cabeza                                      cola
   |                                          |
   v                                          v
 [A | siguiente] -> [B | siguiente] -> [C | siguiente] -> [nuevo | siguiente -> null]
```

Cambia `C.siguiente`, que apunta a `nuevo`, y `cola`, que pasa a apuntar a `nuevo`. `cabeza` no cambia.

### Agregar al inicio

**Lista vacía**

Antes:

```text
cabeza -> null
cola   -> null
```

Después de crear `nuevo`:

```text
cabeza ─┐
        v
      [nuevo | siguiente -> null]
        ^
cola ───┘
```

Cambian `cabeza` y `cola`: ambas apuntan a `nuevo`. Su `siguiente` queda en `null`.

**Lista con un nodo**

Antes:

```text
cabeza, cola
     |
     v
   [A | siguiente -> null]
```

Después:

```text
cabeza             cola
   |                 |
   v                 v
 [nuevo | siguiente] -> [A | siguiente -> null]
```

Cambia `nuevo.siguiente`, que apunta al antiguo primer nodo `A`, y `cabeza`, que pasa a apuntar a `nuevo`. `cola` sigue apuntando a `A`.

**Lista con varios nodos**

Antes:

```text
cabeza                                          cola
   |                                              |
   v                                              v
 [A | siguiente] -> [B | siguiente] -> [C | siguiente -> null]
```

Después:

```text
cabeza                                                        cola
   |                                                            |
   v                                                            v
 [nuevo | siguiente] -> [A | siguiente] -> [B | siguiente] -> [C | siguiente -> null]
```

Cambia `nuevo.siguiente`, que apunta al antiguo primer nodo `A`, y `cabeza`, que pasa a apuntar a `nuevo`. `cola` y `C.siguiente` no cambian.

## Comparación: lista enlazada y arreglo

Complejidades para una lista simplemente enlazada que conserva referencias a `cabeza` y `cola`, y para un arreglo dinámico de JavaScript. `k` representa una posición.

| Operación | Lista enlazada | Arreglo |
|---|---:|---:|
| Agregar al final | O(1) | O(1) amortizado* |
| Agregar al inicio | O(1) | O(n) |
| Acceder a la atención número k | O(n) | O(1) |
| Buscar una atención | O(n) | O(n) |
| Eliminar la primera atención | O(1) | O(n) |

En la lista enlazada, agregar al final es O(1) porque se mantiene la referencia `cola`; agregar al inicio y eliminar el primer nodo solo requieren actualizar `cabeza`. Para acceder a la posición k o buscar un dato, se recorre la cadena desde el inicio. En un arreglo, el acceso por índice es directo, pero agregar o eliminar al inicio desplaza los demás elementos.

*El agregado al final de un arreglo es O(1) amortizado; ocasionalmente puede ser O(n) si necesita redimensionarse.*

## Comparación: Cola y arreglo con 100.000 turnos

Se encolaron y desencolaron 100.000 turnos con la clase `Cola` y con un arreglo de JavaScript (`push` y `shift`). Los objetos de turno se crearon antes de medir. Se hicieron cinco ejecuciones por implementación y se tomó la mediana. Los tiempos corresponden solo a encolar o desencolar, no a crear los turnos.

**Entorno:** Node.js v24.2.0.

| Implementación | Encolar 100.000 turnos | Desencolar 100.000 turnos |
|---|---:|---:|
| `Cola` (`encolar` / `desencolar`) | 3,40 ms | 0,96 ms |
| Arreglo (`push` / `shift`) | 1,55 ms | 9.382,75 ms |

Los tiempos pueden variar según el equipo y la carga del sistema; en este caso se compara la mediana de cinco ejecuciones.

### Complejidad por operación

| Operación | `Cola` | Arreglo |
|---|---:|---:|
| Encolar al final | `encolar`: O(1) | `push`: O(1) amortizado |
| Desencolar del frente | `desencolar`: O(1) | `shift`: O(n) |

La cola enlazada conserva referencias al frente y al final. Por eso, para encolar solo enlaza un nodo y para desencolar avanza la referencia al frente: ambas operaciones toman tiempo constante. `push` también agrega al final en tiempo constante amortizado, aunque ocasionalmente el arreglo debe crecer. `shift` elimina el primer elemento y debe reorganizar los índices de los demás; por eso una sola llamada puede tomar O(n).

Al desencolar todos los turnos, la cola enlazada tarda O(n) en total, mientras que repetir `shift` n veces puede tardar O(n²). Esto explica por qué el arreglo fue algo más rápido al encolar, pero mucho más lento al desencolar en esta medición.

## Estructuras del motor Patitas (v0.2)

| Estructura | Principio | Uso en Patitas | Complejidad de operaciones principales |
|---|---|---|---|
| Colas de urgencias y consultas (`Cola`) | FIFO | Mantienen los turnos por tipo; recepción prioriza urgencias y respeta el orden de llegada dentro de cada fila. | Encolar, desencolar y consultar el tamaño: O(1). |
| Pilas de deshacer y rehacer (`Pila`) | LIFO | El editor revierte o reaplica la acción más reciente sobre un historial. | Apilar, desapilar, consultar el tope y el tamaño: O(1). |
| Listas enlazadas (`ListaEnlazada`) | Secuencial | Guardan las atenciones de cada mascota en orden y permiten recorrer su historial. | Agregar al inicio o al final: O(1); buscar, eliminar, insertar después de buscar y recorrer: O(n). |
| Mapa (`Map`) | Clave-valor | Relaciona el identificador de cada mascota con su historial clínico. | Obtener, insertar y comprobar una clave: O(1) promedio. |