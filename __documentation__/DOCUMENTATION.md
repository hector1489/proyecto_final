# Proyecto Final - Desafíos Latam

#  IT DOJO

## DOCUMENTACIÓN

Proyecto Final para Desafíos Latam. Página web de e-commerce para la venta de productos de oficina.

## Autor

Hector Gonzalez P.

## License

MIT.

# Stack Tecnológico y Setup

## Stack Tecnológico

### Frontend (Proyecto Final)

#### Tecnologías Principales:

- React v18.2.0
- Vite v4.5.0

#### Dependencias Principales:

- `@types/react` v18.2.15
- `@types/react-dom` v18.2.7
- `@vitejs/plugin-react-swc` v3.4.1
- eslint v8.45.0
- eslint-plugin-react v7.32.2
- eslint-plugin-react-hooks v4.6.0
- eslint-plugin-react-refresh v0.4.3

### Backend

#### Tecnologías Principales:

- Node.js v18.16.1
- Express v4.18.2

#### Dependencias Principales:

- bcryptjs v2.4.3
- cors v2.8.5
- dotenv v16.3.1
- jsonwebtoken v9.0.2
- pg v8.11.3

## Setup de la Aplicación

### Frontend (Proyecto Final)

1. **Instalación de Dependencias:**

    ```bash
    npm install
    ```

2. **Desarrollo:**

    ```bash
    npm run dev
    ```

    Esto iniciará el servidor de desarrollo de Vite para el frontend.

3. **Producción:**

    ```bash
    npm run build
    ```

    Esto construirá la aplicación para producción.

### Backend

1. **Instalación de Dependencias:**

    ```bash
    npm install
    ```

2. **Desarrollo con Nodemon:**

    ```bash
    npm run dev
    ```

    Esto iniciará el servidor backend con Nodemon para desarrollo.

3. **Iniciar en Producción:**

    ```bash
    npm start
    ```

    Esto iniciará el servidor en un entorno de producción.

4. **Linter:**

    ```bash
    npm run lint
    ```

    Esto ejecutará el linter para el backend.

> **Nota:** Asegúrate de tener Node.js y npm instalados en tu sistema antes de ejecutar estos comandos.

Con estos pasos, deberías poder configurar y ejecutar tanto el frontend como el backend de tu aplicación de e-commerce.




# REQUERIMIENTOS LATAM :

1. Diseñar un boceto de las vistas del proyecto.

VISITAR :

/__documentation__

    └──  diagrams/
         ├── diagrama_routes1.1.png
         ├── diagramaDB1.png
         ├── flujo_1.png
         ├── flujo_2.png
         ├── flujo_3.png
         └── flujo_login1.png

    └── screenshots/
         ├── pantalla_principal.png
         ├── pantalla_principal2.png
         ├── pantalla_principal3.png
         ├── pantalla_principal4.png
         ├── productos.png
         ├── contacto.png
         ├── Detalle.png
         ├── acceder_registrarse.png
         ├── acceder_user1.png
         ├── acceder_admin1.png
         └── pedidos_admin1.png

2. Definir la navegación entre vistas marcando las públicas y las privadas.

VISITAR :

__documentation__/diagrams/diagrama_routes1.png

diagrama:

/__publicas__

    └──  home/
         ├── products─products
         ├── contact─contact
         ├── cart─cart
         └── login─sugnup.

/__privadas__

    └──  user/
         ├── favorites
         └── orders



    └──  admin/
         ├── users.
         ├── orders.
         └── inventory.

3. Enlistar las dependencias a utilizar en el proyecto.

## Dependencias Front end

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




## Dependencias Backend

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

VISITAR:

/__documentation__

    └──  diagrams/
         └── diagramaDB1.png


## Ejecutable :

CREATE DATABASE itDojo;
\c itDojo;

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
    id              SERIAL,
    id_usuario UUID REFERENCES usuarios(id),
    fecha           TIMESTAMP               DEFAULT CURRENT_TIMESTAMP,
    estado          VARCHAR(50),
    direccion_envio VARCHAR(255),
    PRIMARY KEY(id)
);

/*tabla para los favoritos*/
CREATE TABLE favoritos (
    id              SERIAL,
    id_usuario UUID REFERENCES usuarios(id),
    id_inventario   INT                     REFERENCES inventario(id),
    fecha_agregado  TIMESTAMP               DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY(id)
);

/*tabla para guardar la url de las imagenes*/
CREATE TABLE imagenes_producto (
    id            SERIAL,
    id_inventario INT REFERENCES inventario(id),
    url           VARCHAR(255),
    PRIMARY KEY(id)
);



5. Diseñar el contrato de datos de la API REST.

## Autenticación :

Iniciar Sesión (POST /login).

ENTRADA :

    email: usuario@dominio.com,
    pass: contraseña.


SALIDA EXISTOSA :

    token : token_de_autenticacion.

ERROR:

    code : 401,
    message : Credenciales_inválidas.


## Usuarios :

# Obtener Todos los Usuarios (GET /usuarios)

Requieren Token de Administrador.

SALIDA EXISTOSA :

users :

    id: uuid,
    email: usuario@dominio.com,
    es_admin: false.

ERROR :

    code : 401,
    message : No tienes permisos para realizar esta acción.

# Obtener Usuario por Email (GET /usuarios)

Requiere Token de Administrador.

SALIDA EXISTOSA :

users :

    id: uuid,
    email: usuario@dominio.com,
    es_admin: false.


ERROR :

    code : 401,
    message : No tienes permisos para realizar esta acción.

# Crear Nuevo Usuario (POST /usuarios)

ENTRADA :

    email : usuario@dominio.com,
    pass : contraseña,
    es_admin : false.


SALIDA EXISTOSA :

user:

    id: uuid,
    email: usuario@dominio.com,
    es_admin: false.

ERROR :

    code : 500,
    message : Error interno del servidor.

# Actualizar Usuario (PUT /usuarios/:id)

Requiere Token de Usuario Autenticado o Administrador.

ENTRADA :

    email : nuevo_email@dominio.com,
    pass : nueva_contraseña,
    es_admin : true.

SALIDA EXISTOSA :

user :

    id: uuid,
    email: nuevo_email@dominio.com,
    es_admin: true.

ERROR :

    code: 401,
    message: No tienes permisos para realizar esta acción.


# Eliminar Usuario (DELETE /usuarios/:id)

Requiere Token de Administrador

SALIDA EXISTOSA :

user :

    id : uuid,
    email : usuario_eliminado@dominio.com,
    es_admin : false.

ERROR :

    code : 401,
    message : No tienes permisos para realizar esta acción.



