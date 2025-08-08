export type SessionDto =  {
    usuarioId: number; 
    correo: string; 
    nombre : string,
    exp : number,
  }


export type RespSessionDto = { 
  success: boolean;
  message: string;
}
