PRUEBA SPS REACT
Crear un CRUD de usuarios
Reglas

************************************************************************** 
Crear la página de inicio de sesión (signIn) para autenticar al usuario (usar el usuario previamente registrado para validar).
RESPUESTA: Se creó la página y/o formulario para iniciar sesión o Login, para ingresar por primera vez lo puede hacer con el usuario solicitado "email": "admin@spsgroup.com.br", ""password": "1234"
Se valida el usuario según el archivo json que se ha usado como BD, también existe el CRUD conectado a una BD en SQL Server (servidor en la nube), pero valga recalcar que el json es el mandatorio para el login.

************************************************************************** 
Se puede utilizar cualquier tipo de almacenamiento para guardar el token.
RESPUESTA: Se está usando cookie para almacenar el token.

************************************************************************** 
Solo será posible registrar y/o visualizar usuarios si el usuario está autenticado.
RESPUESTA: El frontend controla según un middleware que si no tiene una sesión activa siempre lo manda a login y en login hace la validación a la BD usuarios (archivo json)

************************************************************************** 
Consumir la API creada anteriormente (test-sps-server).
Todo se basa bajo APIs, hasta para el loggueo se usa la API get de usuarios y haciendo un filtro según el correo y la clave para validar la existencia.

************************************************************************** 
NOTA: EL PROYECTO ESTÁ CONFIGURADO PARA QUE CORRA EN EL PUERTO 3000.


This is a [Next.js](https://nextjs.org) project bootstrapped with [`Usuario-Web-CRUD`](https://nextjs.org/docs/app/api-reference/cli/Usuario-Web-CRUD).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=Usuario-Web-CRUD&utm_campaign=Usuario-Web-CRUD-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
