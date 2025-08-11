# Abm

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.2.15.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.

Sistema de Gestión de Tareas y Proyectos (tipo "Trello" simplificado)

Este proyecto es ideal porque:

Permite ABM (Alta, Baja, Modificación) en varias entidades → Usuarios, Proyectos, Tareas.

Involucra relaciones entre datos → cada tarea pertenece a un proyecto, cada proyecto a un usuario.

Usa LocalStorage como persistencia en esta primera etapa.

Te permite practicar componentes, servicios, formularios reactivos y por template, pipes, directivas, ruteo, y hasta módulos si querés escalar.

Entidades mínimas
Usuario

id

nombre

email

Proyecto

id

nombre

descripción

idUsuario (dueño)

Tarea

id

título

descripción

estado (pendiente, en progreso, completada)

fecha límite

idProyecto (a qué proyecto pertenece)

Módulos / Funcionalidades que podrías incluir
ABM básico

CRUD de usuarios, proyectos y tareas usando LocalStorage.

Listados filtrados y ordenados

Filtrar tareas por estado, fecha límite o proyecto (practicar pipes personalizados).

Ruteo y navegación

Vista de lista, vista de detalle, formulario de edición.

Formularios reactivos y validaciones

Campos requeridos, email válido, fecha mínima, etc.

Directivas personalizadas

Ej: resaltar en rojo las tareas vencidas.

Componentes reutilizables

Ej: CardComponent, ButtonComponent, ModalComponent.

Persistencia

Todo en LocalStorage por ahora (JSON.parse / JSON.stringify).

Comunicación entre componentes

@Input() y @Output() para pasar datos y eventos.

Servicios

Un service por entidad (UsuarioService, ProyectoService, TareaService).

Etapas sugeridas
Etapa 1 (tu momento actual) → Solo una entidad (ej. Producto o Tarea) con CRUD en LocalStorage.

Etapa 2 → Agregar una segunda entidad relacionada (Proyectos con Tareas).

Etapa 3 → Agregar ruteo, componentes separados y filtros.

Etapa 4 → Mejorar UI y agregar validaciones avanzadas.

Etapa 5 → Simular API con json-server o pasar a backend real.
├── core/                # Código central y singleton
│   ├── guards/           # Route Guards (auth, permisos)
│   ├── interceptors/     # Interceptores HTTP
│   ├── services/         # Servicios globales (AuthService, StorageService)
│   └── core.module.ts
│
├── shared/               # Reutilizable en todo el proyecto
│   ├── components/       # Componentes genéricos (botones, modales)
│   ├── directives/       # Directivas personalizadas
│   ├── pipes/            # Pipes reutilizables
│   └── models/           # Interfaces y clases (ej: Producto, Usuario)
│
├── features/             # Módulos de negocio (agrupan CRUD y vistas)
│   ├── products/         # Todo lo relacionado a Productos
│   │   ├── components/   # Componentes específicos de productos
│   │   ├── pages/        # Vistas completas (listado, detalle, edición)
│   │   ├── services/     # ProductService
│   │   ├── products.module.ts
│   │   └── models/       # Modelo Producto
│   │
│   └── tasks/            # Todo lo relacionado a Tareas
│       ├── ...
│
├── app-routing.module.ts
└── app.component.ts
Capas que deberías implementar
Modelos (Models)

Interfaces o clases que definen la estructura de tus datos.

Ej: product.model.ts
export interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
}
Servicios (Services)

Encapsulan la lógica de negocio y acceso a datos.

En esta fase, los servicios usan LocalStorage.

Ej: ProductService con métodos getAll(), create(), update(), delete().

Componentes (Components)

Solo manejan la vista y delegan la lógica al servicio.

Se dividen en:

Pages (pantallas completas para ruteo, ej: ProductListPage).

Components (partes reutilizables, ej: ProductForm).

Módulos (Modules)

Agrupan páginas, componentes y servicios de un mismo dominio.

Evitan que todo quede en app.module.ts.

Shared/Core

Shared: código reutilizable en todo el proyecto.

Core: servicios y configuraciones únicas (singleton).


src/app/
│
├── core/
│   ├── services/
│   │   └── storage.service.ts     # Servicio genérico para manejar LocalStorage
│   └── core.module.ts             # (Por si después añadimos interceptores, guards, etc.)
│
├── shared/
│   ├── models/
│   │   └── product.model.ts       # Interface Product
│
├── features/
│   └── products/
│       ├── pages/
│       │   └── product-list/      # Pantalla principal del CRUD
│       │       ├── product-list.component.ts
│       │       ├── product-list.component.html
│       │       ├── product-list.component.scss
│       │
│       ├── components/
│       │   └── product-form/      # Formulario de producto
│       │       ├── product-form.component.ts
│       │       ├── product-form.component.html
│       │       ├── product-form.component.scss
│       │
│       ├── services/
│       │   └── product.service.ts # CRUD específico de productos
│       │
│       └── products.module.ts     # Módulo del feature
│
└── app-routing.module.ts
