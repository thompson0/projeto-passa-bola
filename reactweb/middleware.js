// middleware.js
import { NextResponse } from 'next/server';

export function middleware(request) {
  // Em ambiente de desenvolvimento, permitir acesso sem autenticação
  if (process.env.NODE_ENV === 'development') {
    return NextResponse.next();
  }
  
  const path = request.nextUrl.pathname;
  
  // Define as rotas públicas (que não precisam de autenticação)
  const publicPaths = ['/login', '/register', '/login-torcedora', '/login-jogadora', '/register-torcedora', '/register-jogadora', '/esqueci-senha'];
  const isPublicPath = publicPaths.some(publicPath => path.startsWith(publicPath));
  
  // Obtém o token do cookie ou localStorage
  const token = request.cookies.get('token')?.value || '';
  
  // Se o usuário estiver tentando acessar uma rota protegida sem estar autenticado
  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  
  // Se o usuário estiver autenticado e tentando acessar uma rota pública
  if (isPublicPath && token) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }
  
  return NextResponse.next();
}

// Configuração para quais rotas o middleware deve ser executado
export const config = {
  matcher: [
    '/dashboard/:path*',
    '/login',
    '/register',
    '/login-torcedora',
    '/login-jogadora',
    '/register-torcedora',
    '/register-jogadora',
    '/esqueci-senha'
  ],
};