'use client'

import { api } from '@/lib/api'
import { FileText, Upload } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import { BarLoader } from 'react-spinners'
import ImageModal from './ImageModal'

export default function FileField({ disabled }) {
  const [filesName, setFilesName] = useState([])
  const [icon, setIcon] = useState(<Upload />)

  const handleChange = async (e) => {
    const files = e.target.files

    setIcon(<BarLoader color="#000" width="50" />)

    for (const file of files) {
      const formData = new FormData()
      formData.set('file', file)
      const response = await api.post('/aluno/entrega/upload', formData)
      setFilesName((prevValue) => [...prevValue, response.data])
    }

    setIcon(<Upload />)
  }

  return (
    <>
      <label
        htmlFor="files"
        className="border-2 border-highlighted text-highlighted p-3 flex gap-2 items-center hover:underline hover:cursor-pointer hover:text-white  hover:bg-highlighted transition-all"
      >
        {icon}
        Anexar arquivo
      </label>
      <input
        multiple
        accept="image/png, image/jpeg, application/pdf"
        type="file"
        id="files"
        name="files"
        className="invisible absolute w-0"
        onChange={handleChange}
        disabled={disabled}
      />

      {/* Files */}
      {filesName.length === 0 ? (
        <></>
      ) : (
        filesName.map((filename) => {
          const segments = filename.split('-')
          const filenameWithoutID = segments.slice(1).join('-')
          return filename.includes('.pdf') || filename.includes('.PDF') ? (
            <Link
              href={`/${filename}`}
              target="_blank"
              className="bg-highlighted flex gap-3 text-white px-3 py-2 w-max mt-5 hover:brightness-110 transition-all"
              key={filename.split('-', 1)}
            >
              <FileText />
              {filenameWithoutID}
            </Link>
          ) : (
            <ImageModal filename={filename} key={filename.split('-', 1)} />
          )
        })
      )}
    </>
  )
}
