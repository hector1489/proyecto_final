CREATE DATABASE itDojo;

CREATE TABLE usuarios (
    id    UUID DEFAULT uuid_generate_v4()   NOT NULL,
    email      VARCHAR(50)                  NOT NULL       UNIQUE,
    pass       VARCHAR                      NOT NULL,
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
    PRIMARY KEY(id)
);




