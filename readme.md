# To-Do List 


Aplicación donde se pueda administrar un To-Do List 

Este proyecto consiste en una prueba técnica, la cual está estructurada de la siguiente forma:

<ul>
  <li>DB - Objetos creados en base de datos (SQL SERVER)</li>
  <li>todo-app-test-client - Cliente desarrollado en ReactJS y Ant Desing.</li>
  <li>TodoTestAPI - API Desarrollada con NetCore 6</li>
</ul>

Se desarrolla este proyecto teniendo en cuenta las versiones más actuales y estables de las tecnologías anteriormente mencionadas. Se tienen en cuenta patrones de desarrollo y código limpio para que sea escalable en el futuro. Además, se realiza el proyecto en inglés para una mejor comprensión.

Se integra arquitectura limpia en los dos proyectos.

### Desarrollo de la prueba

Para que la aplicación funcione correctamente, es necesario tener en cuenta los siguientes pasos:

Obtener el repositorio <link> https://github.com/Katlan9808/TodoApp-test.git


### Base de datos
Ejecutar los scripts en base de datos SQL Server:
<ul>
  <li>script.sql</li>
</ul>

En estos scripts se encuentra la forma de crear la tabla necesaria para almacenar los datos.

### todo-app-test-client
En este proyecto se encuentra la estructura del cliente, que se desarrolló en ReactJS. Se integró el framework <strong>Ant Design</strong><br>
En la ruta de la carpeta <strong>\todo-app-test-client</strong> ejecutar <code>npm install</code>, para obtener todos los paquetes requeridos para que el cliente funcione. 
Terminado este proceso procedemos a ejecutar el comando <code>npm start</code>, para ejecutar el cliente.
En el cliente, se pueden realizar las operaciones CRUD.

Para el consumo de la API desde el cliente se, utilizo la libreria `axios`, ya que con este objeto se realizan solicitudes HTTP y se maneja la respuesta del servidor.

### TodoTestAPI
En este proyecto se encuentra el backend de la aplicación, desarrollado implementando la arquitectura hexagonal. Esta arquitectura nos expone una aplicación totalmente independiente que puede ser usada de la misma forma por usuarios, programas, pruebas automatizadas o scripts, y puede ser desarrollada y probada de forma aislada de sus eventuales dispositivos y bases de datos en tiempo de ejecución.

Se integra el ORM (Object Relational Mapping) Entity Framework, el cual nos ayuda a mapear las entidades de la base de datos en nuestra API.

El archivo encargado de realizar este proceso se encuentra en la capa <strong>TodoTest.Domain/Bat</strong>
<code>TodoTestContext.bat</code>

Es importante ejecutar el fichero <code>TodoTestContext.bat</code>, cuando se realice algún cambio a nivel de base de datos, para así tener mapeadas las entidades del modelo de negocio.

Ejecutar la aplicación para que el cliente pueda recibir las peticiones. En la API, se evidencia la estructura completa de la Arquitectura Hexagonal.







