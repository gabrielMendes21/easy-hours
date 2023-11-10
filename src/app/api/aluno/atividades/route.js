import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET(req) {
  const { searchParams } = new URL(req.url)
  const userId = searchParams.get('id')

  const atividades = await prisma.entrega.findMany({
    where: {
      codAluno: Number(userId),
    },

    include: {
      atividade: {
        include: {
          tipoAtividade: true,
        },
      },
    },
  })

  return NextResponse.json(atividades, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  })
}
