import { UsuarioDto } from "@/types/usuario-dto";


const usuarioPorDefecto: UsuarioDto = {
  id: 0,
  correo: "",
  clave: "",
  nombre: "",
  estado: "X"
};


export async function ValidaCuentaLogin(correo: string, clave: string): Promise<UsuarioDto>  {
  const apiBaseUrl = process.env.NEXT_PUBLIC_URLAPI_USUARIOJSON ?? "";

  try {
    const response = await fetch(apiBaseUrl);

    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }

    const data: UsuarioDto[] = await response.json();

    const usuario = data.find(
      (u) => u.correo === correo && u.clave === clave);

    return usuario ?? usuarioPorDefecto;

  } catch (error) {
    console.error("Error al validar cuenta:", error);
    return usuarioPorDefecto;
  }
}
