use sopi;
insert into centros_costo(nombre) values('das');
insert into centros_costo(nombre) values('chiguayante');
insert into centros_costo(nombre) values('pinares');
insert into centros_costo(nombre) values('leonera');
insert into centros_costo(nombre) values('sar_chiguayante');
insert into centros_costo(nombre) values('sapu_leonera');
insert into centros_costo(nombre) values('drogueria');
insert into centros_costo(nombre) values('bienestar');
insert into centros_costo(nombre) values('farmacia_municipal');


insert into perfiles(nombre) values('admin');
insert into perfiles(nombre) values('jefe_compra');
insert into perfiles(nombre) values('gestor_compra');
insert into perfiles(nombre) values('jurídico');
insert into perfiles(nombre) values('referente');
insert into perfiles(nombre) values('solicitante');

insert into financiamientos(nombre) values('convenio');
insert into financiamientos(nombre) values('presupuesto_das');
insert into financiamientos(nombre) values('presupuesto_bienestar');

insert into solicitudes_estado(nombre, nivel_completitud) values('RECHAZADA', 0);
insert into solicitudes_estado(nombre, nivel_completitud) values('INGRESADA', 1);
insert into solicitudes_estado(nombre, nivel_completitud) values('EN_GESTION', 2);
insert into solicitudes_estado(nombre, nivel_completitud) values('PARCIALMENTE_GESTIONADA', 3);
insert into solicitudes_estado(nombre, nivel_completitud) values('COMPLETAMENTE_GESTIONADA', 4);

insert into compras_estado(nombre) values('PREPARANDO');
insert into compras_estado(nombre) values('VINCULADA_CC');
insert into compras_estado(nombre) values('DETENIDA');
insert into compras_estado(nombre) values('CERRADA_CON_ERRORES');
insert into compras_estado(nombre) values('CERRADA_SIN_ERRORES');
insert into compras_estado(nombre) values('COMPLETADA');