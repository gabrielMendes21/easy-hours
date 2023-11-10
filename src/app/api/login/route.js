import Escola from '@/classes/Escola'
import Usuario from '@/classes/Usuario'
import prisma from '@/lib/prisma'
import jwt from 'jsonwebtoken'
import { NextResponse } from 'next/server'

// Get the user JWT
export async function GET(req) {
  const { searchParams } = new URL(req.url)
  const token = searchParams.get('token')

  try {
    const userTokenInfo = jwt.verify(token, process.env.NEXT_PUBLIC_TOKENSECRET)

    const user = await prisma.usuario.findFirst({
      where: {
        id: Number(userTokenInfo.sub),
      },
      include: {
        Horas: true,
      },
    })

    const hours = user.Horas.find(
      (hours) => hours.ano === new Date().getFullYear(),
    )

    if (user.codTipoUsuario === 1) {
      userTokenInfo.horasAnuais = hours.horasAnuais
      userTokenInfo.horasConcluidas = hours.horasConcluidas
    }

    return NextResponse.json(userTokenInfo)
  } catch (err) {
    return NextResponse.json({ error: err }, { status: 401 })
  }
}

// Create a new login session
export async function POST(req) {
  // Get the request params
  const body = await req.json()
  const { email, password } = body

  // Call login function
  const user = new Usuario()
  const loginResponse = await user.fazerLogin(email, password)

  // Response can be true of false
  if (loginResponse) {
    let schoolInfo = null
    if (
      user.tipoUsuario === 'Coordenador ETEC' ||
      user.tipoUsuario === 'Aluno'
    ) {
      // Get user school
      const schoolResponse = await prisma.escola.findFirst({
        where: {
          id: user.escola,
        },
      })

      schoolInfo = new Escola(schoolResponse.id, schoolResponse.nomeEscola)
    }

    // Generate token
    const token = jwt.sign(
      {
        nome: user.nome,
        email: user.email,
        horasAnuais: user.horasAnuais,
        horasConcluidas: user.horasConcluidas,
        turma: user.turma,
        escola: schoolInfo,
        tipoUsuario: user.tipoUsuario,
      },
      process.env.NEXT_PUBLIC_TOKENSECRET,
      {
        subject: user.codUsuario.toString(),
        expiresIn: '7 days',
      },
    )

    return NextResponse.json({
      token,
      user,
      schoolInfo,
    })
  } else {
    return NextResponse.json(
      {
        error: 'Informações incorretas. Por favor, verifique seu email e senha',
      },
      { status: 400 },
    )
  }
}
