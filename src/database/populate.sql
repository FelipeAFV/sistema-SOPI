insert into centros_costo(nombre) values('das');
insert into centros_costo(nombre) values('chiguayante');
insert into centros_costo(nombre) values('pinares');
insert into centros_costo(nombre) values('leonera');
insert into centros_costo(nombre) values('sar_chiguayante');
insert into centros_costo(nombre) values('sapu_leonera');
insert into centros_costo(nombre) values('drogueria');
insert into centros_costo(nombre) values('bienestar');
insert into centros_costo(nombre) values('farmacia_municipal');




insert into financiamientos(nombre) values('convenio');
insert into financiamientos(nombre) values('presupuesto_das');
insert into financiamientos(nombre) values('presupuesto_bienestar');

insert into solicitudes_estado(nombre, nivel_completitud) values('RECHAZADA', 0);
insert into solicitudes_estado(nombre, nivel_completitud) values('INGRESADA', 1);
insert into solicitudes_estado(nombre, nivel_completitud) values('APROBADA', 2);
insert into solicitudes_estado(nombre, nivel_completitud) values('REVISION_REFERENTE', 3);
insert into solicitudes_estado(nombre, nivel_completitud) values('REVISADO_REFERENTE', 4);
insert into solicitudes_estado(nombre, nivel_completitud) values('EN_GESTION', 5);
insert into solicitudes_estado(nombre, nivel_completitud) values('PARCIALMENTE_GESTIONADA', 6);
insert into solicitudes_estado(nombre, nivel_completitud) values('COMPLETAMENTE_GESTIONADA', 7);

insert into compras_estado(nombre) values('PREPARANDO');
insert into compras_estado(nombre) values('VINCULADA_CC');
insert into compras_estado(nombre) values('DETENIDA');
insert into compras_estado(nombre) values('CERRADA_CON_ERRORES');
insert into compras_estado(nombre) values('CERRADA_SIN_ERRORES');
insert into compras_estado(nombre) values('COMPLETADA');

insert into permisos(id, nombre) values(1, 'USUARIO_INGRESAR');
insert into permisos(id, nombre) values(2, 'USUARIO_EDITAR');
insert into permisos(id, nombre) values(3, 'USUARIO_ACTUALIZAR');
insert into permisos(id, nombre) values(4, 'USUARIO_ELIMINAR');

insert into permisos(id, nombre) values(5, 'SOPI_CREAR');
insert into permisos(id, nombre) values(6, 'SOPI_EDITAR');
insert into permisos(id, nombre) values(7, 'SOPI_EDITAR_ESTADO_RECHAZADA');
insert into permisos(id, nombre) values(8, 'SOPI_EDITAR_ESTADO_REVISION_REFERENTE');
insert into permisos(id, nombre) values(9, 'SOPI_EDITAR_ESTADO_REVISADO_REFERENTE');
insert into permisos(id, nombre) values(10, 'SOPI_EDITAR_ESTADO_EN_GESTION');
insert into permisos(id, nombre) values(11,'SOPI_ELIMINAR');
insert into permisos(id, nombre) values(12,'SOPI_VER');
insert into permisos(id, nombre) values(45,'SOPI_VER_CREADOR');
insert into permisos(id, nombre) values(13,'SOPI_VER_ESTADO_INGRESADA');
insert into permisos(id, nombre) values(14,'SOPI_VER_ESTADO_APROBADA');
insert into permisos(id, nombre) values(15,'SOPI_VER_ESTADO_RECHAZADA');
insert into permisos(id, nombre) values(16,'SOPI_VER_ESTADO_EN_GESTION');
insert into permisos(id, nombre) values(17,'SOPI_VER_ESTADO_REVISION_REFERENTE');
insert into permisos(id, nombre) values(18,'SOPI_VER_ESTADO_REVISADO_REFERENTE');
insert into permisos(id, nombre) values(19,'SOPI_VER_ESTADO_COMPLETAMENTE_GESTIONADA');
insert into permisos(id, nombre) values(20,'SOPI_VER_ESTADO_PARCIALMENTE_GESTIONADA');

insert into permisos(id, nombre) values(21,'COMPRA_CREAR');
insert into permisos(id, nombre) values(22,'COMPRA_EDITAR');
insert into permisos(id, nombre) values(23,'COMPRA_ELIMINAR');
insert into permisos(id, nombre) values(24,'COMPRA_ACTUALIZAR');
insert into permisos(id, nombre) values(25,'COMPRA_VER');
insert into permisos(id, nombre) values(43,'COMPRA_VER_TICKET');
insert into permisos(id, nombre) values(44,'COMPRA_VER_GESTOR');
insert into permisos(id, nombre) values(26,'COMPRA_VER_ESTADO_PREPARANDO');
insert into permisos(id, nombre) values(27,'COMPRA_VER_ESTADO_VINCULADA_CC');
insert into permisos(id, nombre) values(28,'COMPRA_VER_ESTADO_DETENIDA');
insert into permisos(id, nombre) values(29,'COMPRA_VER_ESTADO_CERRADA_CON_ERRORES');
insert into permisos(id, nombre) values(30,'COMPRA_VER_ESTADO_CERRADA_SIN_ERRORES');
insert into permisos(id, nombre) values(31,'COMPRA_VER_ESTADO_COMPLETADA');

insert into permisos(id, nombre) values(32,'TICKET_CREAR');
insert into permisos(id, nombre) values(33,'TICKET_EDITAR');
insert into permisos(id, nombre) values(34,'TICKET_ELIMINAR');
insert into permisos(id, nombre) values(35,'TICKET_RESPONDER');
insert into permisos(id, nombre) values(36,'TICKET_VER');

insert into permisos(id, nombre) values(37,'DOC_CREAR');
insert into permisos(id, nombre) values(38,'DOC_ELIMINAR');
insert into permisos(id, nombre) values(39,'DOC_VER');
insert into permisos(id, nombre) values(40,'DOC_DESCARGAR');

insert into permisos(id, nombre) values(41,'RESPONSABLE_CREAR');
insert into permisos(id, nombre) values(42,'RESPONSABLE_ELIMINAR');


insert into perfiles(id, nombre) values(1, 'director');
insert into perfiles(id, nombre) values(2, 'jefe_compra');
insert into perfiles(id, nombre) values(3, 'gestor_compra');
insert into perfiles(id, nombre) values(4, 'juridico');
insert into perfiles(id, nombre) values(5, 'referente');
insert into perfiles(id, nombre) values(6, 'solicitante');
insert into perfiles(id, nombre) values(7, 'admin');

insert into accesos(perfil_id, permiso_id) values(7,1);
insert into accesos(perfil_id, permiso_id) values(7,2);
insert into accesos(perfil_id, permiso_id) values(7,3);
insert into accesos(perfil_id, permiso_id) values(7,4);

insert into accesos(perfil_id, permiso_id) values(1,1);
insert into accesos(perfil_id, permiso_id) values(1,2);
insert into accesos(perfil_id, permiso_id) values(1,3);
insert into accesos(perfil_id, permiso_id) values(1,4);
insert into accesos(perfil_id, permiso_id) values(1,5);
insert into accesos(perfil_id, permiso_id) values(1,7);
insert into accesos(perfil_id, permiso_id) values(1,8);
insert into accesos(perfil_id, permiso_id) values(1,10);
insert into accesos(perfil_id, permiso_id) values(1,11);
insert into accesos(perfil_id, permiso_id) values(1,12);
insert into accesos(perfil_id, permiso_id) values(1,13);
insert into accesos(perfil_id, permiso_id) values(1,14);
insert into accesos(perfil_id, permiso_id) values(1,15);
insert into accesos(perfil_id, permiso_id) values(1,16);
insert into accesos(perfil_id, permiso_id) values(1,17);
insert into accesos(perfil_id, permiso_id) values(1,18);
insert into accesos(perfil_id, permiso_id) values(1,19);
insert into accesos(perfil_id, permiso_id) values(1,20);
insert into accesos(perfil_id, permiso_id) values(1,21);
insert into accesos(perfil_id, permiso_id) values(1,22);
insert into accesos(perfil_id, permiso_id) values(1,23);
insert into accesos(perfil_id, permiso_id) values(1,24);
insert into accesos(perfil_id, permiso_id) values(1,25);
insert into accesos(perfil_id, permiso_id) values(1,26);
insert into accesos(perfil_id, permiso_id) values(1,27);
insert into accesos(perfil_id, permiso_id) values(1,28);
insert into accesos(perfil_id, permiso_id) values(1,29);
insert into accesos(perfil_id, permiso_id) values(1,30);
insert into accesos(perfil_id, permiso_id) values(1,31);
insert into accesos(perfil_id, permiso_id) values(1,32);
insert into accesos(perfil_id, permiso_id) values(1,33);
insert into accesos(perfil_id, permiso_id) values(1,34);
insert into accesos(perfil_id, permiso_id) values(1,35);
insert into accesos(perfil_id, permiso_id) values(1,36);
insert into accesos(perfil_id, permiso_id) values(1,37);
insert into accesos(perfil_id, permiso_id) values(1,38);
insert into accesos(perfil_id, permiso_id) values(1,39);
insert into accesos(perfil_id, permiso_id) values(1,40);
insert into accesos(perfil_id, permiso_id) values(1,41);
insert into accesos(perfil_id, permiso_id) values(1,42);


insert into accesos(perfil_id, permiso_id) values(3,12);
insert into accesos(perfil_id, permiso_id) values(3,16);
insert into accesos(perfil_id, permiso_id) values(3,19);
insert into accesos(perfil_id, permiso_id) values(3,20);
insert into accesos(perfil_id, permiso_id) values(3,22);
insert into accesos(perfil_id, permiso_id) values(3,25);
insert into accesos(perfil_id, permiso_id) values(3,26);
insert into accesos(perfil_id, permiso_id) values(3,27);
insert into accesos(perfil_id, permiso_id) values(3,28);
insert into accesos(perfil_id, permiso_id) values(3,29);
insert into accesos(perfil_id, permiso_id) values(3,30);
insert into accesos(perfil_id, permiso_id) values(3,31);
insert into accesos(perfil_id, permiso_id) values(3,32);
insert into accesos(perfil_id, permiso_id) values(3,33);
insert into accesos(perfil_id, permiso_id) values(3,34);
insert into accesos(perfil_id, permiso_id) values(3,35);
insert into accesos(perfil_id, permiso_id) values(3,36);
insert into accesos(perfil_id, permiso_id) values(3,37);
insert into accesos(perfil_id, permiso_id) values(3,38);
insert into accesos(perfil_id, permiso_id) values(3,39);
insert into accesos(perfil_id, permiso_id) values(3,40);
insert into accesos(perfil_id, permiso_id) values(3,44);

insert into accesos(perfil_id, permiso_id) values(4,25);
insert into accesos(perfil_id, permiso_id) values(4,26);
insert into accesos(perfil_id, permiso_id) values(4,27);
insert into accesos(perfil_id, permiso_id) values(4,35);
insert into accesos(perfil_id, permiso_id) values(4,36);
insert into accesos(perfil_id, permiso_id) values(4,39);
insert into accesos(perfil_id, permiso_id) values(4,40);
insert into accesos(perfil_id, permiso_id) values(4,43);

insert into accesos(perfil_id, permiso_id) values(5,9);
insert into accesos(perfil_id, permiso_id) values(5,25);
insert into accesos(perfil_id, permiso_id) values(5,26);
insert into accesos(perfil_id, permiso_id) values(5,27);
insert into accesos(perfil_id, permiso_id) values(5,35);
insert into accesos(perfil_id, permiso_id) values(5,36);
insert into accesos(perfil_id, permiso_id) values(5,39);
insert into accesos(perfil_id, permiso_id) values(5,40);
insert into accesos(perfil_id, permiso_id) values(5,43);

insert into accesos(perfil_id, permiso_id) values(6,5);
insert into accesos(perfil_id, permiso_id) values(6,12);
insert into accesos(perfil_id, permiso_id) values(6,13);
insert into accesos(perfil_id, permiso_id) values(6,14);
insert into accesos(perfil_id, permiso_id) values(6,16);
insert into accesos(perfil_id, permiso_id) values(6,17);
insert into accesos(perfil_id, permiso_id) values(6,18);
insert into accesos(perfil_id, permiso_id) values(6,19);
insert into accesos(perfil_id, permiso_id) values(6,20);
insert into accesos(perfil_id, permiso_id) values(6,25);
insert into accesos(perfil_id, permiso_id) values(6,26);
insert into accesos(perfil_id, permiso_id) values(6,27);
insert into accesos(perfil_id, permiso_id) values(6,28);
insert into accesos(perfil_id, permiso_id) values(6,29);
insert into accesos(perfil_id, permiso_id) values(6,30);
insert into accesos(perfil_id, permiso_id) values(6,31);

insert into accesos(perfil_id, permiso_id) values(2,12);
insert into accesos(perfil_id, permiso_id) values(2,14);
insert into accesos(perfil_id, permiso_id) values(2,16);
insert into accesos(perfil_id, permiso_id) values(2,19);
insert into accesos(perfil_id, permiso_id) values(2,20);
insert into accesos(perfil_id, permiso_id) values(2,21);
insert into accesos(perfil_id, permiso_id) values(2,22);
insert into accesos(perfil_id, permiso_id) values(2,23);
insert into accesos(perfil_id, permiso_id) values(2,24);
insert into accesos(perfil_id, permiso_id) values(2,25);
insert into accesos(perfil_id, permiso_id) values(2,26);
insert into accesos(perfil_id, permiso_id) values(2,27);
insert into accesos(perfil_id, permiso_id) values(2,28);
insert into accesos(perfil_id, permiso_id) values(2,29);
insert into accesos(perfil_id, permiso_id) values(2,30);
insert into accesos(perfil_id, permiso_id) values(2,31);
insert into accesos(perfil_id, permiso_id) values(2,32);
insert into accesos(perfil_id, permiso_id) values(2,33);
insert into accesos(perfil_id, permiso_id) values(2,34);
insert into accesos(perfil_id, permiso_id) values(2,35);
insert into accesos(perfil_id, permiso_id) values(2,36);
insert into accesos(perfil_id, permiso_id) values(2,37);
insert into accesos(perfil_id, permiso_id) values(2,38);
insert into accesos(perfil_id, permiso_id) values(2,39);
insert into accesos(perfil_id, permiso_id) values(2,40);
insert into accesos(perfil_id, permiso_id) values(2,41);
insert into accesos(perfil_id, permiso_id) values(2,42);






insert into usuarios(usuario, contrasena, nombre, apellido, perfil_id, creacion, ultima_actualizacion) values('director', '$2b$05$PqLQrRPX3V0SOF8BVOcxCuj0t3oour0x2ppw2luiZBPmA.ijmaXDK', 'director', 'director', 1, '2022-10-10', '2022-10-10');
insert into usuarios(usuario, contrasena, nombre, apellido, perfil_id, creacion, ultima_actualizacion) values('admin', '$2b$05$MJLV7V5v9ZsCzytVt/ElneN16ZFnVG1/31ZJ3b4iYVrt.Wa.Rax2O', 'admin', 'admin', 7, '2022-10-10', '2022-10-10');
insert into usuarios(usuario, contrasena, nombre, apellido, perfil_id, creacion, ultima_actualizacion) values('jefe_compra', '$2b$05$KEGVhafRLScLkhyLgKLKXOY/CAyW7PjGFgAmRDOSsRaaipXIshZUW', 'jefe_compra', 'jefe_compra', 2, '2022-10-10', '2022-10-10');
insert into usuarios(usuario, contrasena, nombre, apellido, perfil_id, creacion, ultima_actualizacion) values('gestor_compra', '$2b$05$qBX3zQtU/CLPbS5iHJ/Sn.WwCknICfR.zCl8S0ZXbTzB9.ZwEqdDy', 'gestor_compra', 'gestor_compra', 3, '2022-10-10', '2022-10-10');

--Proceso para borrar tablar de tiempo
begin;
alter table compras_tipo drop column createdAt;
alter table compras_tipo drop column updatedAt;
commit;

insert into compras_tipo(id, nombre, valor_minimo, valor_maximo) values(1, 'L1', 1, 99);
insert into compras_tipo(id, nombre, valor_minimo, valor_maximo) values(2, 'LE', 101, 999);
insert into compras_tipo(id, nombre,  valor_minimo, valor_maximo) values(3, 'LP', 1000, 999999999);