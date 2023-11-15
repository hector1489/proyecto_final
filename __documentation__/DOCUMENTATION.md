# Proyecto Final - Desafíos Latam

# proyecto :  IT DOJO

## DOCUMENTACIÓN

Proyecto Final para Desafíos Latam. Página web de e-commerce para la venta de productos de oficina.

## Autor

Hector Gonzalez P.

1. Diseñar un boceto de las vistas del proyecto.

/__documentation__

    └──  diagrams/
         ├── flujo_1.png
         ├── flujo_2.png
         └── flujo_3.png

    └── screenshots/
         ├── pantalla_principal.png
         ├── pantalla_principal2.png
         ├── pantalla_principal3.png
         ├── pantalla_principal4.png
         ├── all_products.png
         ├── contacts.png
         ├── Details.png
         └── perfil.png

2. Definir la navegación entre vistas marcando las públicas y las privadas.

/__navegation__

    └──  pantalla_principal/
         ├── home─detail
         ├── products─products
         ├── contact─contact
         ├── cart─cart
         ├── signup─signup─dashboard
         └── login─login─dashboard.

3. Enlistar las dependencias a utilizar en el proyecto.

## Front end

Description :

    name : proyecto-final,
    private : true,
    version : 0.0.0,
    type : module.


Dependencies :

    react : 18.2.0,
    react-dom : 18.2.0.

Dev-Dependencies :

    types/react : 18.2.15,
    types/react-dom: 18.2.7,
    vitejs/plugin-react-swc : 3.4.1,
    eslint : 8.45.0,
    eslint-plugin-react : 7.32.2,
    eslint-plugin-react-hooks : 4.6.0,
    eslint-plugin-react-refresh : 0.4.3,
    vite : 4.5.0.




## Backend

Description :

    name : backend,
    version : 1.0.0,
    description : backend,
    main : index.js.

Dev-Dependencies :

    nodemon : 3.0.1,
    standard : 17.1.0.

Dependencies :

    cors : 2.8.5,
    dotenv : 16.3.1,
    express : 4.18.2,
    jsonwebtoken : 9.0.2,
    pg : 8.11.3.



4. Diseñar las tablas de la base de datos y sus relaciones.

##  Base de Datos :

CREATE DATABASE itDojo;

## Tablas :

CREATE TABLE usuarios :

    id    UUID DEFAULT uuid_generate_v4()   NOT NULL,
    email      VARCHAR(50)                  NOT NULL       UNIQUE,
    pass       VARCHAR                      NOT NULL,
    PRIMARY KEY(id).


CREATE TABLE inventario :

    id         SERIAL,
    nombre     VARCHAR(100),
    categoria  VARCHAR(100),
    envio      VARCHAR(150),
    precio     INT,
    stock      INT,
    id_usuario UUID REFERENCES usuarios(id),
    PRIMARY KEY(id).





5. Diseñar el contrato de datos de la API REST.


