'use client'

import { api } from '@/lib/api'
import { Pen } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import FormSubmitButton from './FormSubmitButton'
import H2 from './H2'
import MyModal from './Modal'

export default function EditStudentModal({ studentData }) {
  // Input values
  const name = studentData.nome
  const email = studentData.email
  const rm = studentData.rm

  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  // Modal control
  const [isOpen, setIsOpen] = useState(false)
  const handleOpen = () => setIsOpen(true)
  const handleClose = () => setIsOpen(false)

  const onSubmit = async (data) => {
    await api.put(`/aluno?studentId=${studentData.id}`, {
      nome: data.nome || name,
      email: data.email || email,
      rm: data.rm || rm,
    })

    setIsOpen(false)
    router.refresh()
  }

  return (
    // PC Button
    <>
      <button
        onClick={handleOpen}
        className="absolute invisible w-0 md:static md:visible flex justify-between items-center md:w-full text-left font-light bg-highlighted hover:cursor-pointer hover:brightness-110 transition-all text-white p-3 my-3"
      >
        Editar aluno
        <Pen strokeWidth={1} />
      </button>

      {/* Modal */}
      <MyModal isOpen={isOpen} handleClose={handleClose} onlyDesktop>
        <H2 title="Editar aluno" />

        <form
          action=""
          method="POST"
          onSubmit={handleSubmit(onSubmit)}
          className="mt-8"
        >
          <label htmlFor="name">Nome do aluno</label>
          <input
            className="mt-3 mb-6 w-full resize-none border-b block border-black bg-[#F4F4F4] focus:outline-highlighted p-2"
            type="text"
            placeholder="Digite o nome do aluno"
            id="name"
            name="nome"
            defaultValue={name}
            {...register('nome')}
          />
          {errors.nome?.type === 'required' && (
            <p role="alert" className="text-red-500 text-xs font-bold mt-2">
              *Não deixe o campo vazio
            </p>
          )}

          <label htmlFor="email">Email</label>
          <input
            className="mt-3 mb-6 w-full resize-none border-b block border-black bg-[#F4F4F4] focus:outline-highlighted p-2"
            type="text"
            placeholder="Digite o email institucional do aluno"
            id="email"
            name="email"
            defaultValue={email}
            {...register('email')}
          />
          {errors.email?.type === 'required' && (
            <p role="alert" className="text-red-500 text-xs font-bold mt-2">
              *Não deixe o campo vazio
            </p>
          )}
          {errors.email?.type === 'pattern' && (
            <p role="alert" className="text-red-500 text-xs font-bold mt-2">
              *Exemplo: nome@dominio.com
            </p>
          )}

          <label htmlFor="rm">RM</label>
          <input
            className="mt-3 mb-6 w-full resize-none border-b block border-black bg-[#F4F4F4] focus:outline-highlighted p-2"
            type="text"
            placeholder="Digite o RM do aluno"
            id="rm"
            name="rm"
            defaultValue={rm}
            {...register('rm')}
          />
          {errors.rm?.type === 'required' && (
            <p role="alert" className="text-red-500 text-xs font-bold mt-2">
              *Não deixe o campo vazio
            </p>
          )}

          <FormSubmitButton title="Editar aluno" />
        </form>
      </MyModal>
    </>
  )
}
