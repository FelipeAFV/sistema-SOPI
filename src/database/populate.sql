insert into centros_costo(nombre) values('das');
insert into centros_costo(nombre) values('chiguayante');
insert into centros_costo(nombre) values('pinares');
insert into centros_costo(nombre) values('leonera');
insert into centros_costo(nombre) values('sar_chiguayante');
insert into centros_costo(nombre) values('sapu_leonera');
insert into centros_costo(nombre) values('drogueria');
insert into centros_costo(nombre) values('bienestar');
insert into centros_costo(nombre) values('farmacia_municipal');


insert into perfiles(id, nombre) values(1, 'director');
insert into perfiles(id, nombre) values(2, 'jefe_compra');
insert into perfiles(id, nombre) values(3, 'gestor_compra');
insert into perfiles(id, nombre) values(4, 'juridico');
insert into perfiles(id, nombre) values(5, 'referente');
insert into perfiles(id, nombre) values(6, 'solicitante');
insert into perfiles(id, nombre) values(7, 'admin');

insert into financiamientos(nombre) values('convenio');
insert into financiamientos(nombre) values('presupuesto_das');
insert into financiamientos(nombre) values('presupuesto_bienestar');

insert into solicitudes_estado(nombre, nivel_completitud) values('RECHAZADA', 0);
insert into solicitudes_estado(nombre, nivel_completitud) values('INGRESADA', 1);
insert into solicitudes_estado(nombre, nivel_completitud) values('REVISION_REFERENTE', 2);
insert into solicitudes_estado(nombre, nivel_completitud) values('REVISADO_REFERENTE', 3);
insert into solicitudes_estado(nombre, nivel_completitud) values('EN_GESTION', 4);
insert into solicitudes_estado(nombre, nivel_completitud) values('PARCIALMENTE_GESTIONADA', 5);
insert into solicitudes_estado(nombre, nivel_completitud) values('COMPLETAMENTE_GESTIONADA', 6);

insert into compras_estado(nombre) values('PREPARANDO');
insert into compras_estado(nombre) values('VINCULADA_CC');
insert into compras_estado(nombre) values('DETENIDA');
insert into compras_estado(nombre) values('CERRADA_CON_ERRORES');
insert into compras_estado(nombre) values('CERRADA_SIN_ERRORES');
insert into compras_estado(nombre) values('COMPLETADA');

insert into permisos(id, nombre) values(1, 'SOPI_EDITAR_ESTADO_RECHAZADA');
insert into permisos(id, nombre) values(2, 'SOPI_EDITAR_ESTADO_REVISION_REFERENTE');
insert into permisos(id, nombre) values(3, 'SOPI_EDITAR_ESTADO_REVISADO_REFERENTE');
insert into permisos(id, nombre) values(4, 'SOPI_EDITAR_ESTADO_EN_GESTION');
insert into permisos(id, nombre) values(5, 'USUARIO_INGRESAR');
insert into permisos(id, nombre) values(6, 'USUARIO_EDITAR');
insert into permisos(id, nombre) values(7, 'USUARIO_ACTUALIZAR');
insert into permisos(id, nombre) values(8, 'USUARIO_ELIMINAR');


insert into accesos(perfil_id, permiso_id) values(5,3);
insert into accesos(perfil_id, permiso_id) values(1,1);
insert into accesos(perfil_id, permiso_id) values(1,2);
insert into accesos(perfil_id, permiso_id) values(1,3);
insert into accesos(perfil_id, permiso_id) values(1,4);

insert into accesos(perfil_id, permiso_id) values(1,5);
insert into accesos(perfil_id, permiso_id) values(1,6);
insert into accesos(perfil_id, permiso_id) values(1,7);
insert into accesos(perfil_id, permiso_id) values(1,8);

insert into accesos(perfil_id, permiso_id) values(7,5);
insert into accesos(perfil_id, permiso_id) values(7,6);
insert into accesos(perfil_id, permiso_id) values(7,7);
insert into accesos(perfil_id, permiso_id) values(7,8);

insert into usuarios(usuario, contrasena, nombre, apellido, perfil_id, creacion, ultima_actualizacion) values('director', '$2b$05$PqLQrRPX3V0SOF8BVOcxCuj0t3oour0x2ppw2luiZBPmA.ijmaXDK', 'director', 'director', 1, '2022-10-10', '2022-10-10');
insert into usuarios(usuario, contrasena, nombre, apellido, perfil_id, creacion, ultima_actualizacion) values('admin', '$2b$05$MJLV7V5v9ZsCzytVt/ElneN16ZFnVG1/31ZJ3b4iYVrt.Wa.Rax2O', 'admin', 'admin', 7, '2022-10-10', '2022-10-10');