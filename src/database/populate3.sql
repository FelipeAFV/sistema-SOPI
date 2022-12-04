insert into permisos(id, nombre) values(1, 'USUARIO_INGRESAR');
insert into permisos(id, nombre) values(2, 'USUARIO_VER');
insert into permisos(id, nombre) values(3, 'USUARIO_EDITAR');
insert into permisos(id, nombre) values(4, 'USUARIO_ACTUALIZAR');
insert into permisos(id, nombre) values(5, 'USUARIO_ELIMINAR');

insert into permisos(id, nombre) values(6, 'SOPI_CREAR');
insert into permisos(id, nombre) values(7, 'SOPI_EDITAR');
insert into permisos(id, nombre) values(8, 'SOPI_EDITAR_ESTADO_RECHAZADA');
insert into permisos(id, nombre) values(9, 'SOPI_EDITAR_ESTADO_REVISION_REFERENTE');
insert into permisos(id, nombre) values(10, 'SOPI_EDITAR_ESTADO_REVISADO_REFERENTE');
insert into permisos(id, nombre) values(11,'SOPI_EDITAR_ESTADO_EN_GESTION');
insert into permisos(id, nombre) values(12,'SOPI_ELIMINAR');
insert into permisos(id, nombre) values(13,'SOPI_VER');
insert into permisos(id, nombre) values(14,'SOPI_VER_CREADAS');


insert into permisos(id, nombre) values(15,'COMPRA_CREAR');
insert into permisos(id, nombre) values(16,'COMPRA_EDITAR');
insert into permisos(id, nombre) values(17,'COMPRA_ELIMINAR');
insert into permisos(id, nombre) values(18,'COMPRA_VER');
insert into permisos(id, nombre) values(19,'COMPRA_VER_RELACIONADO');

insert into permisos(id, nombre) values(20,'TICKET_CREAR');
insert into permisos(id, nombre) values(21,'TICKET_EDITAR');
insert into permisos(id, nombre) values(22,'TICKET_VER');
insert into permisos(id, nombre) values(23,'TICKET_VER_RELACIONADO');

insert into permisos(id, nombre) values(24,'DOC_CREAR');
insert into permisos(id, nombre) values(25,'DOC_ELIMINAR');
insert into permisos(id, nombre) values(26,'DOC_VER');

insert into permisos(id, nombre) values(27,'RESPONSABLE_CREAR');
insert into permisos(id, nombre) values(28,'RESPONSABLE_ELIMINAR');

insert into permisos(id, nombre) values(29,'ACCESOS_EDITAR');
insert into permisos(id, nombre) values(30,'RESPONSABLE_ASIGNABLE');






insert into perfiles(id, nombre) values(1, 'director');
insert into perfiles(id, nombre) values(2, 'jefe_compra');
insert into perfiles(id, nombre) values(3, 'gestor_compra');
insert into perfiles(id, nombre) values(4, 'juridico');
insert into perfiles(id, nombre) values(5, 'referente');
insert into perfiles(id, nombre) values(6, 'solicitante');
insert into perfiles(id, nombre) values(7, 'admin');

insert into accesos(perfil_id, permiso_id) values(1,1);
insert into accesos(perfil_id, permiso_id) values(1,2);
insert into accesos(perfil_id, permiso_id) values(1,3);
insert into accesos(perfil_id, permiso_id) values(1,4);
insert into accesos(perfil_id, permiso_id) values(1,5);
insert into accesos(perfil_id, permiso_id) values(1,6);
insert into accesos(perfil_id, permiso_id) values(1,7);
insert into accesos(perfil_id, permiso_id) values(1,8);
insert into accesos(perfil_id, permiso_id) values(1,9);
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


insert into accesos(perfil_id, permiso_id) values(2,13);
insert into accesos(perfil_id, permiso_id) values(2,15);
insert into accesos(perfil_id, permiso_id) values(2,16);
insert into accesos(perfil_id, permiso_id) values(2,17);
insert into accesos(perfil_id, permiso_id) values(2,18);
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

insert into accesos(perfil_id, permiso_id) values(3,19);
insert into accesos(perfil_id, permiso_id) values(3,23);
insert into accesos(perfil_id, permiso_id) values(3,30);

insert into accesos(perfil_id, permiso_id) values(4,19);
insert into accesos(perfil_id, permiso_id) values(4,23);

insert into accesos(perfil_id, permiso_id) values(5,10);
insert into accesos(perfil_id, permiso_id) values(5,19);
insert into accesos(perfil_id, permiso_id) values(5,23);

insert into accesos(perfil_id, permiso_id) values(6,6);
insert into accesos(perfil_id, permiso_id) values(6,14);

insert into accesos(perfil_id, permiso_id) values(7,29);
insert into accesos(perfil_id, permiso_id) values(7,1);
insert into accesos(perfil_id, permiso_id) values(7,2);
insert into accesos(perfil_id, permiso_id) values(7,3);
insert into accesos(perfil_id, permiso_id) values(7,4);
insert into accesos(perfil_id, permiso_id) values(7,5);



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

insert into usuarios(usuario, contrasena, nombre, apellido, perfil_id, creacion, ultima_actualizacion, activo, mail) values('director', '$2b$05$PqLQrRPX3V0SOF8BVOcxCuj0t3oour0x2ppw2luiZBPmA.ijmaXDK', 'director', 'director', 1, '2022-10-10', '2022-10-10',1, 'director@correo.com');
insert into usuarios(usuario, contrasena, nombre, apellido, perfil_id, creacion, ultima_actualizacion, activo, mail) values('admin', '$2b$05$MJLV7V5v9ZsCzytVt/ElneN16ZFnVG1/31ZJ3b4iYVrt.Wa.Rax2O', 'admin', 'admin', 7, '2022-10-10', '2022-10-10',1,'admin@correo.com');
insert into usuarios(usuario, contrasena, nombre, apellido, perfil_id, creacion, ultima_actualizacion, activo, mail) values('jefe_compra', '$2b$05$KEGVhafRLScLkhyLgKLKXOY/CAyW7PjGFgAmRDOSsRaaipXIshZUW', 'jefe_compra', 'jefe_compra', 2, '2022-10-10', '2022-10-10',1,'jefeCompra@correo.com');
insert into usuarios(usuario, contrasena, nombre, apellido, perfil_id, creacion, ultima_actualizacion, activo, mail) values('gestor_compra', '$2b$05$qBX3zQtU/CLPbS5iHJ/Sn.WwCknICfR.zCl8S0ZXbTzB9.ZwEqdDy', 'gestor_compra', 'gestor_compra', 3, '2022-10-10', '2022-10-10',1,'gestorCompra@correo.com');
insert into usuarios(usuario, contrasena, nombre, apellido, perfil_id, creacion, ultima_actualizacion, activo, mail) values('referente', '$2b$10$Jco9BCyd3hu8GkoE8mS9FuaZf6la.7ge0/Go6RhDNMnlHHlka/nOy', 'referente', 'referente', 5, '2022-10-10', '2022-10-10',1,'referente@correo.com');
insert into usuarios(usuario, contrasena, nombre, apellido, perfil_id, creacion, ultima_actualizacion, activo, mail) values('juridico', '$2b$10$cHDUjwS7SfMco.GJR9SMueba45vqYBFxSji6tEKYKCibizbPYzMTS', 'juridico', 'juridico', 4, '2022-10-10', '2022-10-10',1,'juridico@correo.com');
insert into usuarios(usuario, contrasena, nombre, apellido, perfil_id, creacion, ultima_actualizacion, activo, mail) values('solicitante', '$2b$10$n/drnSboPaK6Gmwww79fveeS8w8BSRZ0X4u1ttUTirFxj7/j9GylW', 'solicitante', 'solicitante', 6, '2022-10-10', '2022-10-10',1,'solicitante@correo.com');

insert into ticket_status (id,estado) values (1,'PENDIENTE');
insert into ticket_status (id,estado) values (2,'COMPLETADO');
insert into ticket_status (id,estado) values (3,'CANCELADO');
insert into ticket_status (id,estado) values (4,'ATRASADO');


insert into compras_tipo(id, nombre, valor_minimo, valor_maximo) values(1, 'L1', 1, 99);
insert into compras_tipo(id, nombre, valor_minimo, valor_maximo) values(2, 'LE', 101, 999);
insert into compras_tipo(id, nombre,  valor_minimo, valor_maximo) values(3, 'LP', 1000, 999999999);

insert into categorias(nombre, createdAt, updatedAt) values ('Físico', '2022-10-10', '2022-10-10');
insert into categorias(nombre, createdAt, updatedAt) values ('Natural', '2022-10-10', '2022-10-10');
insert into categorias(nombre, createdAt, updatedAt) values ('Servicio', '2022-10-10', '2022-10-10');

insert into insumos(nombre, caracteristicas, precio,createdAt, updatedAt, categoria_id) values('Mesa','Mueble de una o más patas que puede ser de madera u otro material',1900,'2022-10-10', '2022-10-10', 1);
insert into insumos(nombre, caracteristicas, precio,createdAt, updatedAt, categoria_id) values('Lápiz','Implemento para escribir, es un tubo hueco con tinta viscosa que sale por la punta',600,'2022-10-10', '2022-10-10', 1);
insert into insumos(nombre, caracteristicas, precio,createdAt, updatedAt, categoria_id) values('Papel higiénico','Papel higiénico ',600,'2022-10-10', '2022-10-10', 1);
insert into insumos(nombre, caracteristicas, precio,createdAt, updatedAt, categoria_id) values('Traslado de insumos','Servicio para trasladar insumos',15000,'2022-10-10', '2022-10-10', 3);