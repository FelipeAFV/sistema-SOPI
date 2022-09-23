# Proyecto Backend para la administración de solicitudes de compras municipales
## Requerimientos
    * Registro de SOPI.
    * Aceptación o rechazo de una SOPI según especificaciones técnicas, presupuesto u otros parámetros.
    * Agrupación de SOPI con ítems comunes en un único proceso de compra
    * Control de estados 
        * Seguimiento e integración de los estados del mercado público
        * Seguimiento de estados internos
    * Asignación de responsables para el proceso de compra.
    * Gestión del proceso de compra
        * Realizar análisis jurídico
         * Registro de bases para proceso de compra pública

## Arquitectura
    La arquitectura seleccionada para el desarrollo es la arquitectura hexagonal, ya que esta permite:
        * Separar las funciones de la app bajo conceptos del dominio (Modularización)
        * Desarrollo de código fácil de mantener, escalar y testear.
        

<img src="https://miro.medium.com/max/1400/1*B7LkQDyDqLN3rRSrNYkETA.jpeg" width=""/>