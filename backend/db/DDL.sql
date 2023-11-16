CREATE DATABASE itDojo;

CREATE TABLE usuarios (
    id    UUID DEFAULT uuid_generate_v4()   NOT NULL,
    email      VARCHAR(100)                 NOT NULL       UNIQUE,
    pass       VARCHAR(100)                 NOT NULL,
    es_admin   BOOLEAN                      DEFAULT        false,
    PRIMARY KEY(id)
);

CREATE TABLE inventario (
    id         SERIAL,
    nombre     VARCHAR(100),
    categoria  VARCHAR(100),
    envio      VARCHAR(150),
    precio     INT,
    stock      INT,
    id_usuario UUID REFERENCES usuarios(id),
    id_orden   REFERENCES ordenes(id),
    PRIMARY KEY(id)
);

/*tabla para las ordenes*/
CREATE TABLE ordenes (
    id SERIAL,
    id_usuario UUID REFERENCES usuarios(id),
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    estado VARCHAR(50),
    direccion_envio VARCHAR(255),
    PRIMARY KEY(id)
);

/*tabla para los favoritos*/
CREATE TABLE favoritos (
    id SERIAL,
    id_usuario UUID REFERENCES usuarios(id),
    id_inventario INT REFERENCES inventario(id),
    fecha_agregado TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY(id)
);

/*tabla para guardar la url de las imagenes*/
CREATE TABLE imagenes_producto (
    id SERIAL,
    id_inventario INT REFERENCES inventario(id),
    url VARCHAR(255),
    PRIMARY KEY(id)
);




