import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET(req) {
  const { searchParams } = new URL(req.url)
  const schoolId = Number(searchParams.get('school'))

  const turmas = await prisma.turma.findMany({
    where: {
      codEscola: schoolId,
    },
  })

  console.log(schoolId)

  return NextResponse.json(turmas)
}
