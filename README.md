# Rent a Car

Este proyecto es una aplicación para la gestión de alquiler de automóviles. Permite a los usuarios administrar clientes, autos y rentas de manera eficiente. La aplicación está diseñada para ser fácil de usar y escalable.

---

## Tecnologías utilizadas

 1. **Node.js**
 2. **Express.js**
 3. **Nunjucks**
 4. **Sequelize**
 5. **SQLite**
 6. **Jest**
 7. **better-sqlite3**

---

## Instalación

Sigue estos pasos para instalar y configurar el proyecto:

1. **Clona el repositorio**:
   ```bash
   git clone https://github.com/tu-usuario/Rent-a-car.git
   cd Rent-a-car
   ```
2. **Instala las dependencias**:
Asegúrate de tener Node.js instalado en tu máquina. Luego, ejecuta:
    ```bash
    npm install
    ```
3. **Configura las variables de entorno**:

Realiza una copia del .env.dist para crear un .env

4. **Inicializa la base de datos**:
Ejecuta el siguiente comando para configurar la base de datos:
    ```bash
    npm run schema:sync
    ```
## Inicialización

1. Inicia el servidor: Ejecuta el siguiente comando para iniciar la aplicación:
    ```
    npm start
    ```
2. Accede a la aplicación: Abre tu navegador y ve a http://localhost:4000.

## Estructura del proyecto
    ```bash
    Rent-a-car/
    ├── src/
    │   ├── app.js                # Configuración principal del servidor
    │   ├── config/               # Configuración de dependencias y base de datos
    │   ├── module/               # Módulos principales (car, client, rental)
    │   │   ├── car/              # Funcionalidad relacionada con autos
    │   │   ├── client/           # Funcionalidad relacionada con clientes
    │   │   ├── rental/           # Funcionalidad relacionada con rentas
    │   └── ...
    ├── public/                   # Archivos estáticos (CSS, JS)
    ├── .env                      # Variables de entorno
    ├── [package.json](http://_vscodecontentref_/0)              # Dependencias del proyecto
    └── [README.md](http://_vscodecontentref_/1)                 # Documentación
    ```
## Pruebas

El proyecto incluye pruebas unitarias para garantizar la calidad del código. Para ejecutar las pruebas, utiliza el siguiente comando:
    ```

    npm test
