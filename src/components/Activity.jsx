'use client'

import { api } from '@/lib/api'
import crypto from 'crypto'
import { ArrowRight, FileText, Upload } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { BarLoader } from 'react-spinners'
import ImageModal from './ImageModal'
import LoadingIcon from './LoadingIcon'

export default function Activity({ task }) {
  const [knowledge, setKnowledge] = useState('')
  const [taskSentFiles, setTaskSentFiles] = useState([])
  const [filesName, setFilesName] = useState([])
  const [uploadIcon, setUploadIcon] = useState(<Upload />)
  const [sendIcon, setSendIcon] = useState(<ArrowRight strokeWidth={1} />)
  const [loadingFiles, setLoadingFiles] = useState('Carregando anexos...')

  const router = useRouter()

  useEffect(() => {
    api
      .get(`/aluno/entrega/anexos?taskId=${task.id}`)
      .then((response) => {
        setTaskSentFiles(response.data)
      })
      .finally(() => {
        setLoadingFiles('Você não possui anexos')
      })
  }, [])

  const handleChangeKnowledge = (e) => {
    setKnowledge(e.target.value)
  }

  const handleChangeFileList = async (e) => {
    const files = e.target.files

    setUploadIcon(<BarLoader color="#000" width="50px" />)

    for (const file of files) {
      const formData = new FormData()
      formData.set('file', file)
      const response = await api.post('/aluno/entrega/upload', formData)
      setFilesName((prevValue) => [...prevValue, response.data])
    }

    setUploadIcon(<Upload />)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSendIcon(<LoadingIcon color="#FFF" />)

    const formData = new FormData()
    formData.set('knowledge', knowledge)
    formData.set('files', filesName)

    const response = await api.put(`/aluno/entrega?taskId=${task.id}`, formData)

    setSendIcon(<ArrowRight strokeWidth={1} />)

    console.log(response.data)
    router.refresh()
    router.push('../atividades')
  }

  // Get task due date
  const taskDueDate = new Date(task.atividade.prazoEntrega)
  const now = new Date()
  now.setHours(now.getHours() - 3)

  // Verify if task is sent, overdue or pending
  const sent = task.entregue
  const overdue = taskDueDate < now && !sent
  const pending = !sent && !overdue

  return (
    <div className="space-y-10">
      <div className="pt-7">
        <h1 className="text-center font-medium text-xl">
          {task.atividade.titulo}
        </h1>
        <span className="block text-center">
          {new Date(task.atividade.prazoEntrega).toLocaleDateString()}
        </span>
      </div>

      <hr className="border-[#C6C6C6]" />

      <form action="" onSubmit={handleSubmit}>
        <label htmlFor="knowledge">O que você aprendeu nessa atividade?</label>
        <textarea
          name="knowledge"
          id="knowledge"
          cols="30"
          rows="10"
          className="mt-3 mb-8 border-b block resize-none border-black w-full bg-[#F4F4F4] focus:outline-highlighted rounded-none p-2"
          placeholder="Digite o que você aprendeu"
          value={sent ? task.conteudo.conhecimento : knowledge}
          disabled={!!(sent || overdue)}
          onChange={handleChangeKnowledge}
          required
        ></textarea>

        {sent ? (
          taskSentFiles ? (
            <>
              <span className="block">Anexos</span>
              {taskSentFiles.length > 0 ? (
                <>
                  {taskSentFiles.map((file) => {
                    const id = crypto.randomBytes(256, (err, buffer) => {
                      if (err) throw err
                      return buffer.toString('hex')
                    })

                    const segments = file.split('-')
                    const filenameWithoutID = segments.slice(1).join('-')

                    return file.includes('.pdf') ? (
                      <Link
                        href={`/${file}`}
                        target="_blank"
                        className="bg-highlighted flex gap-3 text-white px-3 py-2 w-max mt-5 hover:brightness-110 transition-all"
                        key={id}
                      >
                        <FileText />
                        {filenameWithoutID}
                      </Link>
                    ) : (
                      <ImageModal filename={file} key={id} />
                    )
                  })}
                </>
              ) : (
                <span className="text-black/60">{loadingFiles}</span>
              )}
            </>
          ) : (
            ''
          )
        ) : pending ? (
          <>
            <span className="block mb-3">
              Anexe uma prova da sua presença nesta atividade
            </span>
            {/* File field */}
            <label
              htmlFor="files"
              className="border-2 border-highlighted text-highlighted p-3 flex gap-2 items-center hover:underline hover:cursor-pointer hover:text-white  hover:bg-highlighted transition-all"
            >
              {uploadIcon}
              Anexar arquivo
            </label>
            <input
              multiple
              accept="image/png, image/jpeg, application/pdf"
              type="file"
              id="files"
              name="files"
              className="invisible absolute w-0"
              onChange={handleChangeFileList}
              disabled={overdue}
            />

            {/* Files */}
            {filesName.length === 0 ? (
              <></>
            ) : (
              filesName.map((filename) => {
                const segments = filename.split('-')
                const filenameWithoutID = segments.slice(1).join('-')
                return filename.includes('.pdf') ||
                  filename.includes('.PDF') ? (
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
                  <ImageModal
                    filename={filename}
                    key={filename.split('-', 1)}
                  />
                )
              })
            )}
          </>
        ) : (
          ''
        )}

        <button
          type="submit"
          className={`flex justify-between items-center w-full text-left font-light bg-highlighted hover:brightness-110 transition-all text-white mt-7 p-3 ${
            overdue ? 'bg-red-700' : sent ? 'bg-gray-400' : ''
          }`}
          disabled={!!(sent || overdue)}
        >
          {overdue
            ? 'Atividade atrasada'
            : sent
            ? 'Atividade enviada'
            : 'Enviar'}
          {sendIcon}
        </button>
      </form>
    </div>
  )
}
