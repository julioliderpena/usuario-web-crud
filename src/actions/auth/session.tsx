"use server"

import jwt, { sign } from "jsonwebtoken";
import { cookies } from "next/headers";
import { createHash } from "crypto";
import { RespSessionDto, SessionDto } from "@/types/auth/session-dto";
import { ValidaCuentaLogin } from "@/app/login/validaCuentaLogin";

//import { getDateNow } from "@/utils/date-now";

const AUTH_SECRET = process.env.AUTH_SECRET || "";
const COOKIE_MAX_AGE = process.env.COOKIE_MAX_AGE;

// import ldap from 'ldapjs';
//var LdapClient = require('ldapjs-client');

export const createSession = async (correo: string, clave: string): Promise<RespSessionDto> => {
  try {
    console.log(correo + ", " + clave);
    return ValidarAcceso(correo, clave);

    return { message: "Credenciales Invalidas", success: false };

  } catch (error) {
    throw new Error((error as { message?: string }).message);
  }
};


export const verifySession = async () => {
  try {
    console.log("verifySession")

    const cookieStore = await cookies();
    const token = cookieStore.get("NextSessionNur");
    if (!token) {
      console.log("verifySession token null")
      return null;
    }
    const userDto = jwt.verify(token.value, AUTH_SECRET) as SessionDto;
    return userDto
  } catch (error) {
    throw new Error((error as { message?: string }).message);
  }
};


export const deleteSession = async () => {
  try {
    console.log("deleteSession")
    const cookieStore = await cookies()
    const token = cookieStore.get("NextSessionNur");
    if (!token) throw new Error("token null");

    const userDto = jwt.verify(token.value, AUTH_SECRET) as SessionDto;
    // Crear objeto para la bitácora

    cookieStore.delete('NextSessionNur')
  } catch (error) {
    throw new Error((error as { message?: string }).message);
  }
}

export const obtainToken = async (): Promise<SessionDto | null> => {
  try {
    console.log("obtainToken")
    const cookieStore = await cookies();
    const token = cookieStore.get("NextSessionNur");

    if (!token) {
      console.log("token null")
      return null;
    }
    const userDto = jwt.verify(token.value, AUTH_SECRET) as SessionDto;
    return userDto
  } catch (error) {
    console.log(`Failed to fetch user ${error}`)
    return null
  }
};


// export function getSessionToken(): string | null {
//     return document.cookie
//         .split('; ')
//         .find(row => row.startsWith('token='))
//         ?.split('=')[1] || null;
// }


const ValidarAcceso = async (correo: string, clave: string): Promise<RespSessionDto> => {
  const resp: RespSessionDto = { message: "Credenciales Invalidas", success: false };

  try {
    const apiBaseUrl = process.env.NEXT_PUBLIC_URLAPI_LOGIN ?? "";

    const usuario = await ValidaCuentaLogin(correo, clave);
    if (usuario.id > 0) {
      if (usuario.estado === "A") {
        const user: SessionDto = {
          usuarioId: typeof usuario.id === "number" ? usuario.id : 0,
          correo: typeof usuario.correo === "string" ? usuario.correo : "",
          nombre: typeof usuario.nombre === "string" ? usuario.nombre : "",
          tipo: typeof usuario.tipo === "string" ? usuario.tipo : "",
          exp: Math.floor(Date.now() / 1000) + Number(COOKIE_MAX_AGE)
        }

        const token = sign({
          ...user
        }, AUTH_SECRET);

        const cookieToken = await cookies()
        cookieToken.set({
          name: "NextSessionNur",
          value: token,
          httpOnly: true,
          secure: false,
          // sameSite: "strict",
          sameSite: "lax",
          maxAge: Number(COOKIE_MAX_AGE),
          path: "/",
        });

        resp.success = true;
        resp.message = "Connected Succesfully";
      } else {
        resp.message = "Usuario no Activo!";
      }
      // Aquí podrías redireccionar o guardar la sesión
    } else {
      resp.message = "Combinación Correo y Contraseña incorrecta!";
    }

  } catch (err: unknown) {
    console.error("Error en el login:", err);
    return resp;
  }

  return resp;
};

const getMd5Hash = (input: string): string => {
  input = input.trim();
  const hashBuffer = createHash('md5').update(input).digest();
  const hashBigInt = BigInt('0x' + hashBuffer.toString('hex'));
  const inputString = hashBigInt.toString(16);
  return inputString;
};
