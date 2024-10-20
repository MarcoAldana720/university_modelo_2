import { NextResponse } from "next/server";
import { jwtVerify } from 'jose';

const secret = new TextEncoder().encode('secret');
const publicRoutes = ['/']; // Defino las rutas públicas

// Defino los roles requeridos para cada tipo de ruta
const roleRequired = {
  '/main': 1,       // Administradores
  '/usuario': 2     // Usuarios
};

export async function middleware(req) {
  const { pathname } = req.nextUrl;

  // Si la ruta es pública, no necesito autenticación
  if (publicRoutes.includes(pathname)) {
    return NextResponse.next();
  }

  // Obtengo la cookie del token JWT
  const token = req.cookies.get('myTokenName')?.value;

  if (!token || typeof token !== 'string') {
    // Si no hay token o no es una cadena, redirijo a la página de inicio
    return NextResponse.redirect(new URL('/', req.url));
  }

  try {
    // Verifico el token JWT
    const { payload } = await jwtVerify(token, secret);
    req.user = payload; // Puedo usar req.user en mis manejadores de rutas

    // Determino el rol requerido para la ruta actual
    const requiredRole = Object.keys(roleRequired).find(route => pathname.startsWith(route));

    if (requiredRole && req.user.role.id !== roleRequired[requiredRole]) {
      // Si la ruta requiere un rol específico y el usuario no tiene el rol adecuado redirijo a la página de inicio
      return NextResponse.redirect(new URL('/', req.url));
    }

    return NextResponse.next();
  } catch (error) {
    console.error('Falló la verificación del token:', error);
    // Si la verificación falla, redirijo a la página de inicio
    return NextResponse.redirect(new URL('/', req.url));
  }
}

export const config = {
  matcher: ['/main/:path*', '/usuario/:path*'],
};
