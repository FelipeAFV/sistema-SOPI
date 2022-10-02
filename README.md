# Proyecto Backend para la administración de solicitudes de compras municipales
## Requerimientos
    * Registro de SOPI.
    
    * Seguimiento / Visualización del estado de la SOPI
    
    * Aceptación o rechazo de una SOPI según especificaciones técnicas, presupuesto u otros parámetros, previo a la creación del proceso de compra.

    * Creación de proceso de compra con o sin agrupación de SOPI con ítems comunes en para apoyar órdenes de compras

    * Asignación de responsables para el proceso de compra.
    
    * Asociación de documentos a un proceso de compra
    
    * Visualización de los datos del proceso de compra
    
    * Seguimiento e integración de los estados del mercado público
    
    * Tareas del proceso de compra
        + Registro y seguimiento del análisis jurídico y generación de tickets
        + Registro de bases para proceso de compra pública
        + Generar respuesta a ticket para apoyar el proceso de compra


## Arquitectura
    La arquitectura seleccionada para el desarrollo es la arquitectura hexagonal, ya que esta permite:
        * Separar las funciones de la app bajo conceptos del dominio (Modularización)
        * Desarrollo de código fácil de mantener, escalar y testear.
        

<img src="https://miro.medium.com/max/1400/1*B7LkQDyDqLN3rRSrNYkETA.jpeg" width=""/>