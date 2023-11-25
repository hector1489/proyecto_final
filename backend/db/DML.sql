-- Para la tabla usuarios
INSERT INTO usuarios (id, email, pass, es_admin)
VALUES
    (DEFAULT, 'usuario1@example.com', '123456', true),
    (DEFAULT, 'usuario2@example.com', '123456', true);

-- Insertar algunos datos en la tabla pedidos
INSERT INTO pedidos (id_usuario, estado, direccion_envio)
VALUES
    ('3fbc85f3-e3ab-46b5-827d-780cc0aa8c0a', 'En proceso', 'santiago'),
    ('3fbc85f3-e3ab-46b5-827d-780cc0aa8c0a', 'Entregado', 'santiago');

-- Para la tabla inventario
INSERT INTO inventario (id, nombre, categoria, envio, precio, stock, id_usuario, id_pedido)
VALUES
    (DEFAULT, 'Silla Reclinable', 'sillas', 'santiago', 50000 , 2, '3fbc85f3-e3ab-46b5-827d-780cc0aa8c0a', 1),
    (DEFAULT, 'Mause Pad', 'mausepad', 'santiago', 15000 , 10, '3fbc85f3-e3ab-46b5-827d-780cc0aa8c0a', 2),
    (DEFAULT, 'Escritorio', 'escritorio', 'santiago', 10000 , 2, '3fbc85f3-e3ab-46b5-827d-780cc0aa8c0a', 2);

-- Insertar registros en la tabla de imágenes
INSERT INTO imagenes_producto (id_inventario, url)
VALUES
    ((SELECT id FROM inventario WHERE nombre = 'silla' limit 1), 'src/assets/img/silla1.jpg');

INSERT INTO imagenes_producto (id_inventario, url)
VALUES
    ((SELECT id FROM inventario WHERE nombre = 'Escritorio'), 'src/assets/img/escritorio-gamer.jpg');
