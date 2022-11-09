# Onepoint Ecommerce

## requisitos:

- node: 16/x
- docker
- prisma studio (opcional sirve para manipular la base de datos con un gestor)

## Como levantar el entorno dev

- yarn install.
- configure las variables de entorno requeridas en .env (mas adelante vera un ejemplo de algunas)
- ejecute el comando:

```
docker-compose up -d
```

Esto creara la base de datos en docker y la levantara,
para conectarse a esta base de datos configure la variable de entorno:

```
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/postgres?schema=public"
```

- ejecute el siguiente comando para crear los schema de Prisma en la base de datos, cada vez que cree un nuevo
  schema es necesario ejecutar el siguiente comando:

```
npx prisma db push
```

- Ejecute el siguiente comando para rellenar los datos iniciales en la base de datos:

```
npx prisma db seed
```

## NOTAS:

cada vez que cambie o modifique un schema recuerde ejecutar:

```
prisma migrate dev --name "puede poner la intencion ejemplo: added_new_field"
```

en cambio si genera cambios en la base de datos ejecute el siguiente comando para mantener la sincronizacion

```
prisma generate
```

## CLERK

Clerk es el sistema de Autenticacion utilizado, este conecta con SVIX via webhooks para recibir
los eventos de creacion de usuarios y demas y emitir acciones a los respectivos endpoints:

Para configurar el sistema de autenticacion en el entorno de desarrollo haga los siguientes pasos:

1- Instale ngrok esto le permite crear un puente entre su localhost y la integracion SVIX en Clerk Dashboard

```
https://ngrok.com/download

```

2- En Clerk Dashboard active la integracion con SVIX y clickee en manage integration, posteriormente haga click en add endpoint:
3- mas abajo esta el Message Filtering, aqui elegira el evento a leer actualmente es:

```
user.created
```

haga click en create

4- ejecute su yarn dev y levante el servidor de desarrollo de la app
5- en una terminal cualquiera ejecute ngrok http 3000 esto hara el puente entre el localhost:3000 y
un link que ngrok le proporcionara.
6- tome el link proporcionado por ngrok y agreguele la ruta que recibe los webhooks en esta app es:

```
/api/auth/webhook
```

## NOTAS:

Cada vez que levante ngrok http 3000, este genera una nueva url por lo que debera cambiarla en la
integracion de SVIX en Clerk Dashboard


## Al MOMENTO DE DESPLEGAR / DEPLOY
1- la variable de entorno "DATABASE_URL" esta configurada ya en el repositorio de Github con la url de produccion