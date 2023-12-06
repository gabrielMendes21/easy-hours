import prisma from '@/lib/prisma'
import bcrypt from 'bcrypt'
import { NextResponse } from 'next/server'

export async function POST(req) {
  const data = await req.json()

  const coordinatorPassword = await bcrypt.hash(data.coordinatorPassword, 10)

  await prisma.escola.create({
    data: {
      nomeEscola: data.schoolName,
      Usuario: {
        create: {
          nome: data.coordinatorName,
          email: data.coordinatorEmail,
          senha: coordinatorPassword,
          codTipoUsuario: 2,
        },
      },
      Turma: {
        createMany: {
          data: [
            {
              ano: new Date().getFullYear(),
              nomeTurma: '3º DS AMS',
            },
            {
              ano: new Date().getFullYear(),
              nomeTurma: '2º DS AMS',
            },
            {
              ano: new Date().getFullYear(),
              nomeTurma: '1º DS AMS',
            },
          ],
        },
      },
    },
  })

  return NextResponse.json('Sucesso')
}
