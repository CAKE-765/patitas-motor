# Patitas Motor

Proyecto de consola para organizar y consultar el historial clínico de mascotas. Cada historial se representa con una lista enlazada y el registro agrupa las listas por nombre de mascota.

## Requisitos

- Node.js instalado.
- No requiere paquetes externos.

## Cómo ejecutarlo

Desde la carpeta raíz del proyecto:

```bash
node src/reporte.js
```

El reporte muestra las atenciones de cada mascota, su última vacunación (o indica que no hay registro), el número de atenciones y el costo total.

Para ejecutar el ejemplo de lista enlazada:

```bash
node pruebas/listas.js
```

## Estructuras de datos

- **Nodo:** contiene una atención y la referencia al siguiente nodo.
- **ListaEnlazada:** lista simplemente enlazada con referencias a cabeza y cola. Permite agregar, recorrer, buscar y eliminar datos.
- **Map:** asocia el nombre de cada mascota con sus atenciones iniciales; el registro crea una lista enlazada para cada mascota.
- **Arreglos:** se usan para agrupar los datos iniciales de cada mascota y como ejemplo de comparación con la lista enlazada.