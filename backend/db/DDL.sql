CREATE DATABASE itDojo;

CREATE TABLE inventario (
    id         SERIAL,
    nombre     VARCHAR(100),
    categoria  VARCHAR(100),
    envio      VARCHAR(150),
    precio     INT,
    stock      INT,
    PRIMARY KEY(id)
    );

CREATE TABLE usuarios (
    id    UUID DEFAULT uuid_generate_v4()   NOT NULL,
    email      VARCHAR(50)                  NOT NULL       UNIQUE,
    pass       VARCHAR                      NOT NULL,
    PRIMARY KEY(id)
)



