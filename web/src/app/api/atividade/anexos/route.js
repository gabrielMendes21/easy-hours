import prisma from '@/lib/prisma'
import { Storage } from '@google-cloud/storage'
// import { writeFile } from 'fs/promises'
import fs from 'fs'
import { NextResponse } from 'next/server'
import { join } from 'path'

const storage = new Storage({
  keyFilename: join(
    __dirname,
    '..',
    '..',
    '..',
    '..',
    '..',
    '..',
    'fluid-axis-402017-05332102ad29.json',
  ),
  projectId: 'fluid-axis-402017',
})
const bucket = storage.bucket('easy-hours')

export async function GET(req) {
  const { searchParams } = new URL(req.url)
  const taskId = searchParams.get('taskId')

  const task = await prisma.atividade.findFirst({
    where: {
      id: Number(taskId),
    },
  })

  const files = []

  if (task.anexos) {
    const filesName = task.anexos.split(', ')

    for (const filename of filesName) {
      files.push(filename)
      // Path where file will be stored
      const filePath = join(
        __dirname,
        '..',
        '..',
        '..',
        '..',
        '..',
        '..',
        'public',
        filename,
      )
      if (fs.existsSync(filePath)) {
        console.log(`O arquivo ${filename} existe no diretório public.`)
      } else {
        const file = bucket.file(filename)
        const fileStream = file.createReadStream()

        const writeStream = fs.createWriteStream(filePath)

        fileStream.pipe(writeStream)

        writeStream.on('finish', () => {
          return NextResponse.json('Pronto')
        })

        writeStream.on('error', () => {
          return NextResponse.json('Erro ao puxar arquivo', { status: 500 })
        })
      }
    }
  }

  return NextResponse.json(files)
}
