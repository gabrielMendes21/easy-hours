'use client'

import { PageContext } from '@/app/context/PageContext'
import { api } from '@/lib/api'
import { PlusCircle, Upload } from 'lucide-react'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import { useContext, useState } from 'react'
import { useForm } from 'react-hook-form'
import * as XLSX from 'xlsx'
import FormSubmitButton from './FormSubmitButton'
import H2 from './H2'
import MyModal from './Modal'

export default function NewStudentModal() {
  // Modal control
  const [isOpen, setIsOpen] = useState(false)
  const handleOpen = () => setIsOpen(true)
  const handleClose = () => setIsOpen(false)

  const pathname = usePathname()

  // user Data form page context
  const user = useContext(PageContext)
  const schoolId = user?.user?.escola?.codEscola

  // students class
  let classId = pathname.split('/')
  classId = Number(classId[classId.length - 1])

  const router = useRouter()

  // Read excel function
  const readExcel = (file) => {
    const promise = new Promise((resolve, reject) => {
      const fileReader = new FileReader()
      fileReader.readAsArrayBuffer(file)

      fileReader.onload = (event) => {
        const bufferArray = event.target.result

        const wb = XLSX.read(bufferArray, { type: 'buffer' })
        const wsname = wb.SheetNames[0]
        const ws = wb.Sheets[wsname]
        const data = XLSX.utils.sheet_to_json(ws)

        resolve(data)
      }

      fileReader.onerror = (error) => {
        reject(error)
      }
    })

    promise
      .then((response) => {
        api
          .post(`/alunos?school=${schoolId}&class=${classId}`, [...response])
          .then(() => {
            setIsOpen(false)
            router.refresh()
          })
          .catch((err) => console.log(err))
      })
      .catch((err) => console.log(err))
  }

  // Form control
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  // Submit function
  const onSubmit = async (data) => {
    await api.post(`/aluno?class=${classId}&school=${schoolId}`, {
      ...data,
    })

    setIsOpen(false)
    router.refresh()
  }

  return (
    <>
      {/* New student button (tablets and PC's) */}
      <button
        onClick={handleOpen}
        className="flex gap-3 mt-5 absolute invisible md:static md:visible"
      >
        <PlusCircle color="#C6C6C6" />
        Adicionar aluno
      </button>

      {/* Modal */}
      <MyModal isOpen={isOpen} handleClose={handleClose} onlyDesktop>
        <H2 title="Adicionar aluno" />

        <form
          action=""
          method="POST"
          className="mt-8"
          encType="multipart/form-data"
          onSubmit={handleSubmit(onSubmit)}
        >
          <label htmlFor="name">Nome do aluno</label>
          <input
            className="mt-3 w-full resize-none border-b block border-black bg-[#F4F4F4] focus:outline-highlighted p-2"
            type="text"
            placeholder="Digite o nome do aluno"
            id="name"
            {...register('nome')}
          />

          <label htmlFor="email" className="block mt-6">
            Email
          </label>
          <input
            className="mt-3 w-full resize-none border-b block border-black bg-[#F4F4F4] focus:outline-highlighted p-2"
            type="text"
            placeholder="Digite o email institucional do aluno"
            id="email"
            required
            {...register('email', { pattern: /.*@.*\.*/i })}
          />
          {errors.email?.type === 'pattern' && (
            <p
              role="alert"
              className="text-red-500 text-xs font-bold mt-2 mb-4"
            >
              *Exemplo: nome@dominio.com
            </p>
          )}

          <label htmlFor="rm" className="block mt-6">
            RM
          </label>
          <input
            className="mt-3 w-full resize-none border-b block border-black bg-[#F4F4F4] focus:outline-highlighted p-2"
            type="text"
            placeholder="Digite o RM do aluno"
            id="rm"
            required
            {...register('rm', { pattern: /^\d+$/ })}
          />
          {errors.rm?.type === 'pattern' && (
            <p
              role="alert"
              className="text-red-500 text-xs font-bold mt-2 mb-4"
            >
              *O RM do aluno deve ser composto apenas por números
            </p>
          )}

          <label htmlFor="rm" className="block mt-6">
            Meta anual de horas
          </label>
          <input
            className="mt-3 w-full resize-none border-b block border-black bg-[#F4F4F4] focus:outline-highlighted p-2"
            type="text"
            placeholder="Digite as horas que o aluno deve ter este ano"
            id="rm"
            required
            {...register('horasAnuais', { pattern: /^\d+$/ })}
          />
          {errors.horasAnuais?.type === 'pattern' && (
            <p role="alert" className="text-red-500 text-xs font-bold mt-2">
              *Por favor, digite apenas números
            </p>
          )}

          <label htmlFor="rm" className="block mt-6">
            Horas concluídas
          </label>
          <input
            className="mt-3 w-full resize-none border-b block border-black bg-[#F4F4F4] focus:outline-highlighted p-2"
            type="text"
            placeholder="Digite as horas que o aluno concluiu este ano"
            id="rm"
            required
            {...register('horasConcluidas', { pattern: /^\d+$/ })}
          />
          {errors.horasAnuais?.type === 'pattern' && (
            <p role="alert" className="text-red-500 text-xs font-bold mt-2">
              *Por favor, digite apenas números
            </p>
          )}

          <FormSubmitButton title="Adicionar aluno" />

          <label
            htmlFor="fileInput"
            className="hover:cursor-pointer flex justify-between items-center w-full text-left font-light bg-[#008000] hover:brightness-110 transition-all text-white p-3"
          >
            Importar planilha
            <Upload strokeWidth={1} />
          </label>
          <input
            type="file"
            name="fileInput"
            id="fileInput"
            accept=".xlsx"
            className="invisible"
            onChange={(event) => {
              event.preventDefault()
              const file = event.target.files[0]

              readExcel(file)
            }}
          />
          <figure>
            <Image
              src="/excel-model.png"
              alt=""
              width={1000}
              height={1000}
              className="w-full"
              quality={100}
            />
            <figcaption className="text-black/60 text-xs">
              Exemplo de planilha a ser anexada
            </figcaption>
          </figure>
          <div className="flex items-center gap-3 mt-2">
            <div className="w-5 h-5 bg-red-500 rounded"></div>
            Obrigatório
          </div>
        </form>
      </MyModal>
    </>
  )
}
