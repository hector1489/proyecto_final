-- Para la tabla usuarios
INSERT INTO usuarios (id, email, pass, es_admin)
VALUES
    (DEFAULT, 'usuario1@example.com', '$2a$10$3och3OWK/WWmr7wQvyJwU.YA/QeIOZJxOt9hVa3TV1qeUA9IyqbsK', true);


-- Para la tabla inventario
INSERT INTO inventario (id, nombre, categoria, envio, precio, stock)
VALUES
    (DEFAULT, 'Silla Reclinable', 'sillas', 'pais', 20000 , 2),
    (DEFAULT, 'Silla AURUS', 'sillas', 'pais', 15000 , 5),
    (DEFAULT, 'Mause Pad', 'mausepad', 'pais', 12000 , 10),
    (DEFAULT, 'Mause Lug', 'mause', 'pais', 25000 , 4),
    (DEFAULT, 'Microfono Inalambrico', 'microfono', 'pais', 30000 , 4),
    (DEFAULT, 'Escritorio', 'escritorio', 'pais', 40000 , 2);
