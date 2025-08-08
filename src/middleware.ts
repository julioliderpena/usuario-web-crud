import { NextRequest, NextResponse } from 'next/server';

export default async function middleware(req: NextRequest) {

  const jwt = req.cookies.get("NextSessionNur");  
  if (!jwt){
    return NextResponse.redirect(new URL("/login", req.url));
  } 
  
  try {

    const { pathname } = new URL(req.url);
    if (pathname === '/') return NextResponse.next(); // Permitir acceso sin redirigir
    const cookieUrls = req.cookies.get('NextUrlsAUV');
    const urls = JSON.parse(cookieUrls?.value || "")
    const paths = pathname.slice(1).split("/")
    const pathsFiltrada = paths.filter(item => item !== 'new' && isNaN(Number(item)));
    const isValid = pathsFiltrada.every(item => urls.includes(item));

    if (isValid)
      return NextResponse.next();
    else
      return NextResponse.redirect(new URL('/', req.url));
    
  } catch (error) {
    console.log("error")
    console.log(error)
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

// Configuración del matcher para que este middleware se ejecute solo en las rutas específicas
export const config = {
  matcher: ['/', 
    // , '/usuariossql/:path*',
    // , '/usuariosjson/:path*'
    ],
};
