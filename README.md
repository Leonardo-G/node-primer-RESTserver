# Rest Server
Proyecto de Node en un entorno NEST, donde se creó la API cumpliendo con la arquitectura REST, para leer/crear/actualizar/eliminar.


### Estructura de archivos

```
src
│__ main.ts                     # Archivo principal para la inicialización 
|                                 de la aplicación 
│__ app.module.ts               # Archivo de módulo principal de la aplicación
│__ ...
│   
├─ auth/
│   ├── controller/             
│   │   ├── auth.controller.ts  # Maneja las solicitudes HTTP relacionadas
|   |   |                         con la autenticación.
│   │   └── ...
│   ├── dto/                    # Carpeta para Data Transfer Objects (DTOs)
│   │   ├── auth-return.dto.ts  # Respuesta de autenticación que se devuelve al 
|   |   |                         cliente. status OK
│   │   └── auth.dto.ts         # DTO que se envía desde el cliente al servidor.
│   ├── service/                # Maneja la lógica de autenticación y la interacción 
|   |   |                         con la base de datos.
│   │   ├── auth.service.ts     # Contiene el servicio de autenticación
│   │   └── ...
│   └── auth.module.ts          # Archivo de módulo principal para la autenticación.
│
├─ common/
|   ├── guards/              
│   │   ├── validate-jwt.guard.ts # Guard que se utiliza para proteger las rutas 
|   |   |                         que requieren autenticación.
│   │   └── ...                   # Guard que se utiliza para asegurar sea 
|   |                             un usuario válido.
│   ├── interface/
│   │   └── req-jwt.interface.ts  # Interfaz de usuario de autenticación
│   └── pipes/                    
│       ├── validate-rol.pipe.ts  # Pipe que se utiliza para validar rol del usuario
│       └── validate-id-mongo.pipe.ts # Pipe para validar el MONGO ID
│
├─ global-module/
|   └── global-module.module.ts      # Modulo @Global para configurar la 
|                                 conexión con la base de datos, variables de entorno, etc.
│
├─ categories/
│   ├── controller/             
│   │   ├── categories.controller.ts  # Maneja las solicitudes HTTP relacionadas
|   |   |                              con las categorías.
│   │   └── ...
│   ├── dto/                    
│   │   ├── category.dto.ts         # DTO para categories
│   ├── service/                
│   │   ├── categories.service.ts   # Contiene el servicio de categories.
│   │   └── ...
│   ├── schema/                
│   │   └── category.schema.ts     # schema de Mongoose para el modelo "Category".
│   ├── service/                
│   │   ├── proyecto.service.ts    # Contiene el servicio de proyectos.
│   │   └── ...
│   └── categories.module.ts        # Archivo de módulo principal para las categories.
│
├─ products/
│   ├── controller/             
│   │   ├── products.controller.ts  # Maneja las solicitudes HTTP relacionadas
|   |   |                          con las products.
│   │   └── ...
│   ├── dto/                    
│   │   ├── product.dto.ts        # Respuesta de products que se devuelve al 
|   |   |                          cliente.
│   ├── schema/
│   │   ├── product.schema.ts     # Schema de Mongoose para el modelo "Product".
│   │   └── ...
│   └── service/
│       ├── product.service.ts     # Contiene el servicio de products.
│       └── ...
|
├─ users/
│   ├── controller/             
│   │   ├── users.controller.ts  # Maneja las solicitudes HTTP relacionadas 
|   |   |                          con los usuarios.
│   │   └── ...
│   ├── schema/
│   │   ├── user.schema.ts  # Schema de Mongoose para el modelo "Tarea".
│   │   └── ...
│   ├── service/
│   │   ├── users.service.ts # Contiene el servicio de tareas.
│   │   └── ...
│   └── users.module.ts  # Archivo de módulo principal para los proyectos.
|
├─ app.controller.spec.ts
├─ app.controller.ts
├─ app.module.ts
├─ app.service.ts
└─ main.ts
```

### Herramientas
Herramientas que se utiliza en este proyecto

-Nestjs: Framework de Nodejs, para la creación de aplicaciones del lado del servidor
  - @nestjs/common: v9.0.0
  - @nestjs/config: v2.3.1
  - @nestjs/core: v9.0.0
  - @nestjs/jwt: v10.0.3
  - @nestjs/mongoose: v9.2.2
  - @nestjs/platform-express: v9.0.0
  - @nestjs/swagger: v6.3.0
- bcrypt: Paquete para hashear cadenas de texto: v5.1.0.
- class-validator: biblioteca de validación de datos. v0.12.0
- mongodb: Contrololador de mongodb: v5.2.0
- mongoose: ORM de mongoDB para node. v5.2.0