import { UsuarioDto } from "@/types/usuario-dto";


const usuarioPorDefecto: UsuarioDto = {
  id: 0,
  correo: "",
  clave: "",
  nombre: "",
  tipo: "",
  estado: "X"
};


export async function ValidaCuentaLogin(correo: string, clave: string): Promise<UsuarioDto>  {
  const apiBaseUrl = process.env.NEXT_PUBLIC_URLAPI_LOGIN ?? "";

  try {
    // const response = await fetch(apiBaseUrl);
    const response = await fetch(apiBaseUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ correo, clave })
    });

    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }

    //const data: UsuarioDto[] = await response.json();
    // const usuario = data.find(
    //   (u) => u.correo === correo && u.clave === clave);
    const usuario: UsuarioDto = await response.json();

    return usuario ?? usuarioPorDefecto;

  } catch (error) {
    console.error("Error al validar cuenta:", error);
    return usuarioPorDefecto;
  }
}
