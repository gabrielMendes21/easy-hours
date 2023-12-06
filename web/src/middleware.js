// import { pathToRegexp } from 'path-to-regexp'
// const regexp = pathToRegexp('/(authenticated)/:path*')

import { NextResponse } from 'next/server'

const loginUrl = `${process.env.NEXT_PUBLIC_WEB_URL}login`

export function middleware(req) {
  // Auth Token
  const token = req.cookies.get('auth-token')?.value

  // Se o token não existir, o usuário não está logado, logo, ele será redirecionado para a tela de login
  if (!token) {
    return NextResponse.redirect(loginUrl, {
      headers: {
        'Set-Cookie': `redirectTo=${req.url}; Path=/; HttpOnly; max-age=20;`,
      },
    })
  }
  return NextResponse.next()
}

export const config = {
  matcher: [
    '/aluno/:path*',
    '/coordenador-ETEC/:path*',
    '/coordenador-IBM/:path*',
    '/',
  ],
}
