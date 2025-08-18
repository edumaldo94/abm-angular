# abm

## Propósito

**abm** es una aplicación web desarrollada con Angular para la gestión de entidades, permitiendo realizar operaciones de alta, baja y modificación (ABM) sobre productos y, potencialmente, usuarios. El objetivo es facilitar la administración y visualización de datos de manera sencilla y eficiente.

## Tecnologías utilizadas

- **Angular** (con componentes standalone)
- **TypeScript**
- **RxJS**
- **SCSS**
- **LocalStorage** (persistencia de datos en el navegador)

## Estructura del proyecto

```
src/
  app/
    core/                  # Servicios globales (ejemplo: StorageService)
    shared/                # Componentes y modelos reutilizables
      components/
      models/
    features/
      products/            # Funcionalidad de productos
        pages/
        components/
        services/
      users/               # Funcionalidad de usuarios (si se agrega)
        pages/
        components/
        services/
  assets/
  environments/
```

## Instalación

1. Clona el repositorio:
   ```
   git clone https://github.com/tu-usuario/abm-angular.git
   cd abm-angular/abm
   ```
2. Instala las dependencias:
   ```
   npm install
   ```
3. Inicia la aplicación:
   ```
   ng serve
   ```
   Accede a [http://localhost:4200](http://localhost:4200) en tu navegador.

## Uso

- Accede a la sección de productos para listar, crear, editar y eliminar productos.
- Si agregas la funcionalidad de usuarios, podrás gestionarlos desde la sección correspondiente.

## Contribución

1. Haz un fork del repositorio.
2. Crea una rama (`git checkout -b feature/nueva-funcionalidad`).
3. Realiza tus cambios y haz commit.
4. Haz un pull request.

## Licencia

Este proyecto está bajo la licencia

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
