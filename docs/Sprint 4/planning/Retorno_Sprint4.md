Hola, Leandro!

Te cuento:

Github/Gitflow

El Readme está bastante bien.Solo echo de menos unas instrucciones detalladas de instalación.
No me creo que no seas capaz de trocear TODO el proyecto en más commits. Has hecho commits demasiado gruesos y poco detallados. Dejas una media de 2 commits por rama.
Claramente has separado responsabilidades en ramas, pero no sigues estrictamente Gitflow. Gitflow crea ramas en base a funcionalidades(features). Una funcionalidad es, por ejemplo en tu caso. hacer login.  O ver suscripciones. Aquí lo que tenemos son ramas muy grandes (crud-controllers, si hay crud, hay por lo menos 4 funcionalidades más pequeñas que podemos sacar de ahí) o con responsabilidades transversales a TODAS las funcionalidades como "blade-views". No es la idea.
Creo que puedes mejorar aún bastante en este aspecto antes de proyecto, Leandro. Cualquier duda al respecto, me dices.

Modelo de datos

El modelo se entiende muy claro.
Ya sabes que debemos tener cuidado con las restricciones de integridad del tipo CASCADE.
Echo de menos unos cuantos seeders.
Estilo gráfico/Navegabilidad

Se agradece mucho el navbar superior para mejora en la navegación.
El estilo gráfico es genérico y funcional. La web podría ser de subscripciones a servicios o de cualquier otra indistintamente.
Presenta la información de manera eficaz.
Funcionalidad

Las contraseñas de solo 8 carácteres no son seguras. Especialmente si, además, no exigen números o mayúsculas o caracteres especiales.
Un mail para confirmar el registro tampoco estaría mal :)
Con la categoría "Streaming" que has querido decir, reproducción de series...pelis?
Aquí estoy pidiendo mucho pero sería taaaaa bonito que la fecha de pago de las subscripciones se actualizara automáticamente...
Hasta donde he podido probar, la aplicación es estable y hace lo que tiene que hacer :)
Estilo código fuente

Buenísimo el uso de resources en las rutas!
No es que haya casos exageradamente largos PERO se puede simplificar mucho la cantidad de líneas de código de tus métodos en controller. Piensa que existen las clases Request, que puedes inyectar en esos métodos para que absorban la lógica de validación de una petición de cliente, ahorrándote así ahí esas líneas :D
Recuerda que en la capa de presentación puedes usar lógica para evitar repeticiones de líneas de código HTML mediante directivas de Blade!
En resumen, el trabajo está bien hecho, Leandro. Lo único que te diría es que no usaras este proyecto como portfolio frontend ya que, claramente, te has apoyado en los estilos de la librería de autenticación dando un aspecto gráfico bastante impersonal y poco detallado. Sin embargo, si es de cara a backend, sí que puede servir ya que funciona bien. Te invito a que lo sigas haciendo crecer con las ideas que tienes en mente. Ah! Y trata de mejorar tu trabajo con Gitflow en el Sprint 5!

Saludos!