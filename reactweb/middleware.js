// reactweb/middleware.js
import { NextResponse } from 'next/server';

export function middleware(request) {
  const path = request.nextUrl.pathname;
  
  // Define as rotas públicas (que não precisam de autenticação)
  const publicPaths = ['/login', '/register', '/login-torcedora', '/login-jogadora', '/register-torcedora', '/register-jogadora', '/esqueci-senha'];
  const isPublicPath = publicPaths.some(publicPath => path.startsWith(publicPath));
  
  // Obtém o token do cookie
  const token = request.cookies.get('token')?.value;
  
  // Se o usuário estiver tentando acessar uma rota protegida sem estar autenticado
  if (!isPublicPath && !token) {
    const loginUrl = new URL('/login', request.url);
    // Adiciona a URL original como parâmetro de redirecionamento
    loginUrl.searchParams.set('from', path);
    return NextResponse.redirect(loginUrl);
  }
  
  // Se o usuário estiver autenticado e tentando acessar uma rota pública
  if (isPublicPath && token && !path.includes('from=')) {
    return NextResponse.redirect(new URL('/inicio-jogadora', request.url));
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/inicio-jogadora',
    '/inicio',
    '/login',
    '/register',
    '/login-torcedora',
    '/login-jogadora',
    '/register-torcedora',
    '/register-jogadora',
    '/esqueci-senha'
  ],
};