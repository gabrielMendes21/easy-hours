'use client'

import { api } from '@/lib/api'
import { ArrowRight, PlusCircle } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import H2 from './H2'
import LoadingIcon from './LoadingIcon'
import MyModal from './Modal'

export default function NewActivityModal({ classes }) {
  const [loadingIcon, setLoadingIcon] = useState(<ArrowRight strokeWidth={1} />)
  const [isOpen, setIsOpen] = useState()
  const handleClose = () => {
    setIsOpen(false)
  }

  const handleOpen = () => {
    setIsOpen(true)
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const router = useRouter()

  const onSubmit = async (data) => {
    setLoadingIcon(<LoadingIcon color="#FFF" />)
    await api.post('/atividade', data)

    setLoadingIcon(<ArrowRight />)

    setIsOpen(false)
    router.refresh()
  }

  return (
    <>
      <button
        onClick={handleOpen}
        className="flex gap-3 mt-5 invisible absolute md:visible md:relative"
      >
        <PlusCircle color="#C6C6C6" />
        Nova atividade
      </button>

      <MyModal isOpen={isOpen} handleClose={handleClose} onlyDesktop>
        <H2 title="Criar atividade" />

        <form
          action=""
          method="POST"
          onSubmit={handleSubmit(onSubmit)}
          className="mt-8"
        >
          <label htmlFor="class" className="text-sm">
            Turma
          </label>
          <select
            id="class"
            className="py-3 px-4 text-sm block mt-3 mb-6 w-full bg-[#F4F4F4]"
            defaultValue=""
            required
            {...register('class', { required: true })}
          >
            <option value="" disabled className="text-sm">
              Selecione uma turma
            </option>
            {classes.map((grade) => {
              return (
                <option key={grade.id} value={grade.nomeTurma}>
                  {grade.nomeTurma}
                </option>
              )
            })}
          </select>

          <label htmlFor="task-type" className="text-sm">
            Tipo da atividade
          </label>
          <select
            id="task-type"
            className="py-3 px-4 text-sm block mt-3 mb-6 w-full bg-[#F4F4F4]"
            defaultValue=""
            required
            {...register('taskType', { required: true })}
          >
            <option value="" disabled className="text-sm">
              Selecione o tipo da atividade
            </option>
            <option value="1" className="text-sm">
              Sessão
            </option>
            <option value="2" className="text-sm">
              Horas flexíveis
            </option>
            <option value="3" className="text-sm">
              Palestra
            </option>
          </select>

          <label htmlFor="task-name" className="text-sm block mt-6">
            Nome da atividade
          </label>
          <input
            type="text"
            id="task-name"
            className="mt-3 border-b block w-full border-black bg-[#F4F4F4] focus:outline-highlighted rounded-none p-2"
            placeholder="Digite o nome da atividade"
            {...register('taskName', { required: true })}
          />
          {errors.taskName?.type === 'required' && (
            <p role="alert" className="text-red-500 text-xs font-bold mt-2">
              *Não deixe o campo vazio
            </p>
          )}

          <label htmlFor="task-details" className="text-sm block mt-6">
            Detalhes da atividade
          </label>
          <textarea
            id="task-details"
            cols="30"
            rows="5"
            className="mt-3 w-full resize-none border-b block border-black bg-[#F4F4F4] focus:outline-highlighted p-2"
            placeholder="Digite os detalhes da atividade"
            {...register('taskDetails', { required: true })}
          ></textarea>
          {errors.taskDetails?.type === 'required' && (
            <p role="alert" className="text-red-500 text-xs font-bold mt-2">
              *Não deixe o campo vazio
            </p>
          )}

          <label htmlFor="task-date" className="text-sm block mt-6">
            Data de entrega
          </label>
          <input
            type="date"
            id="task-date"
            className="mt-3 border-b block w-full border-black bg-[#F4F4F4] focus:outline-highlighted p-2"
            {...register('taskDueDate', { required: true })}
          />
          {errors.taskDueDate?.type === 'required' && (
            <p role="alert" className="text-red-500 text-xs font-bold mt-2">
              *Não deixe o campo vazio
            </p>
          )}

          <label htmlFor="task-hours" className="text-sm block mt-6">
            Horas da atividade
          </label>
          <input
            type="text"
            id="task-hours"
            className="mt-3 border-b block w-full border-black bg-[#F4F4F4] focus:outline-highlighted p-2"
            placeholder="Digite a quantidade de horas desta atividade"
            {...register('taskHours', { pattern: /^\d+$/, required: true })}
          />
          {errors.taskHours?.type === 'required' && (
            <p role="alert" className="text-red-500 text-xs font-bold mt-2">
              *Não deixe o campo vazio
            </p>
          )}
          {errors.taskHours?.type === 'pattern' && (
            <p role="alert" className="text-red-500 text-xs font-bold mt-2">
              *Digite apenas números
            </p>
          )}

          {/* <label htmlFor="task-files" className="text-sm">
            Anexar materiais de apoio
          </label>
          <input
            id="task-files"
            type="file"
            multiple
            className="mt-3 mb-6 border-b block w-full border-black bg-[#F4F4F4] focus:outline-highlighted rounded-none p-2 text-sm"
          /> */}
          <button
            type="submit"
            className="flex justify-between items-center w-full text-left font-light bg-highlighted hover:brightness-110 transition-all text-white mt-7 mb-2 p-3"
          >
            Cadastrar Atividade
            {loadingIcon}
          </button>
        </form>
      </MyModal>
    </>
  )
}
