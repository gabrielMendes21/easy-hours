'use client'

import { api } from '@/lib/api'
import { ArrowRight } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useContext, useState } from 'react'
import { useForm } from 'react-hook-form'
import FormSubmitButton from './FormSubmitButton'
import H2 from './H2'
import MyModal from './Modal'

import { PageContext } from '@/app/context/PageContext'

export default function SupportResponseModal({ supportRequest }) {
  // Modal control
  const [isOpen, setIsOpen] = useState(false)
  const handleOpen = () => setIsOpen(true)
  const handleClose = () => setIsOpen(false)

  const router = useRouter()
  const user = useContext(PageContext)

  // Form control
  const { register, handleSubmit } = useForm()
  const onSubmit = async (data) => {
    await api.post(
      `/solicitacaoSuporte/resposta?requestId=${supportRequest.id}&coordinatorId=${user?.user?.sub}`,
      {
        ...data,
      },
    )

    setIsOpen(false)
    router.refresh()
  }

  return (
    <>
      <button
        onClick={handleOpen}
        className="absolute invisible md:relative md:visible flex justify-between items-center w-full text-left font-light bg-highlighted hover:brightness-110 transition-all text-white mt-7 p-3"
      >
        Responder
        <ArrowRight strokeWidth={1} />
      </button>
      <MyModal isOpen={isOpen} handleClose={handleClose} onlyDesktop>
        <H2 title="Responder suporte" />

        <form
          action=""
          method="POST"
          onSubmit={handleSubmit(onSubmit)}
          className="mt-8"
        >
          <label htmlFor="assunto">Assunto</label>
          <input
            className="mt-3 mb-6 w-full resize-none border-b block border-black bg-[#F4F4F4] focus:outline-highlighted p-2"
            type="text"
            disabled
            value={supportRequest.titulo}
          />

          <label htmlFor="resposta">Resposta</label>
          <textarea
            id="resposta"
            cols="30"
            rows="10"
            className="mt-3 mb-6 w-full resize-none border-b block border-black bg-[#F4F4F4] focus:outline-highlighted p-2"
            placeholder="Digite a sua resposta"
            required
            {...register('responseMessage')}
          ></textarea>

          <FormSubmitButton title="Enviar resposta" />
        </form>
      </MyModal>
    </>
  )
}
