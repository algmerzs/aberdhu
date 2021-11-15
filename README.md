# aberdhu

## Proyecto media técnica SENA-CEFIT

"Somos una página de noticias financieras e indicadores económicos, nuestros servicios serán de gran ayuda a quienes deseen adentrarse superficialmente al mundo económico y financiero"

### Instalación
```
npm i
mysql -h localhost -u <user> -p <password>
mysql> source <\path\to\>aberdhu\database\tables.sql;
npm start
```
## Estructura archivos
- database, contiene todas las queries sql, como la estructura de las tablas
- views, contiene todas las vistas ejs
- env, contiene las variables de entorno
- lib, contiene aplicaciones de verificación (enviar correo, verificación logeo, encriptar contraseña usuario)
- public, archivos públicos
- routes, rutas necesarias para función aplicación

## Variables de entorno
- PORT

## Herramientas

- Nodejs
- Mysql
- Vue
- Bootstrap
- Ejs
