'use client'

import { PageContext } from '@/app/context/PageContext'
import { api } from '@/lib/api'
import { PlusCircle } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useContext, useState } from 'react'
import { useForm } from 'react-hook-form'
import FormSubmitButton from './FormSubmitButton'
import H2 from './H2'
import MyModal from './Modal'

export default function NewSupportRequestModal() {
  // Modal control
  const [isOpen, setIsOpen] = useState(false)
  const handleOpen = () => setIsOpen(true)
  const handleClose = () => setIsOpen(false)

  const router = useRouter()

  const user = useContext(PageContext)

  // Form control
  const { register, handleSubmit } = useForm()
  const onSubmit = async (data) => {
    await api.post(`/solicitacaoSuporte?studentId=${user?.user?.sub}`, {
      ...data,
    })

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
        Nova solicitação
      </button>
      <MyModal isOpen={isOpen} handleClose={handleClose} onlyDesktop>
        <H2 title="Criar solicitação de suporte" />

        <form
          action=""
          method="POST"
          className="mt-8"
          onSubmit={handleSubmit(onSubmit)}
        >
          <label htmlFor="subject" className="text-sm">
            Assunto
          </label>
          <input
            type="text"
            id="subject"
            placeholder="Digite o assunto da sua solicitação"
            className="mt-3 mb-8 border-b block border-black w-full bg-[#F4F4F4] focus:outline-highlighted rounded-none p-2"
            required
            {...register('subject')}
          />

          <label htmlFor="message" className="text-sm">
            Mensagem
          </label>
          <textarea
            id="message"
            cols="30"
            rows="10"
            className="mt-3 mb-8 border-b block resize-none border-black w-full bg-[#F4F4F4] focus:outline-highlighted rounded-none p-2"
            placeholder="Digite sua mensagem"
            required
            {...register('message')}
          ></textarea>

          <hr className="border[#C6C6C6]" />

          <FormSubmitButton title="Enviar" />
        </form>
      </MyModal>
    </>
  )
}
