// Send student tasks

import prisma from '@/lib/prisma'
import { Storage } from '@google-cloud/storage'
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

export async function PUT(req) {
  const { searchParams } = new URL(req.url)
  const taskId = searchParams.get('taskId')

  const data = await req.formData()
  const knowledge = data.get('knowledge')
  let filesName = data.get('files')

  await prisma.entrega.update({
    where: {
      id: Number(taskId),
    },
    data: {
      conteudo: {
        conhecimento: knowledge,
        anexos: filesName,
      },
      dataEntrega: new Date(),
      entregue: true,
    },
  })

  filesName = filesName.split(',')

  filesName.forEach((filename) => {
    const path = join(
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

    fs.access(path, fs.constants.F_OK, (err) => {
      if (err) {
        return NextResponse.json(`O arquivo ${filename} não existe na pasta.`, {
          status: 500,
        })
      } else {
        fs.readFile(path, (err, buffer) => {
          if (err) {
            return NextResponse.json('Erro ao enviar arquivo', { status: 500 })
          } else {
            const blob = bucket.file(filename)
            const blobStream = blob.createWriteStream()
            blobStream.on('finish', () => {
              return NextResponse.json('Arquivo enviado', { status: 200 })
            })
            blobStream.end(buffer)
          }
        })
      }
    })
  })

  return NextResponse.json('Sucesso')
}
