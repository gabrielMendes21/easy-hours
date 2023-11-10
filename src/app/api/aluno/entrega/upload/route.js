// Upload user files

import crypto from 'crypto'
import { writeFile } from 'fs/promises'
import { NextResponse } from 'next/server'
import { join } from 'path'

export async function POST(req) {
  try {
    const data = await req.formData()

    const file = data.get('file')

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    const filePrefix = crypto.randomBytes(16)
    const filename = `${filePrefix.toString('hex')}-${file.name}`

    const path = join(
      __dirname,
      '..',
      '..',
      '..',
      '..',
      '..',
      '..',
      '..',
      'public',
      filename,
    )
    await writeFile(path, buffer)

    return NextResponse.json(filename)
  } catch (err) {
    console.log(err)
    return NextResponse.json('Falha ao carregar o arquivo', { status: 500 })
  }
}
