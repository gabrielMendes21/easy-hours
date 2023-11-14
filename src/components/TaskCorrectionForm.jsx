'use client'

import { PageContext } from '@/app/context/PageContext'
import { api } from '@/lib/api'
import { ArrowRight } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'
import { useContext } from 'react'

export default function TaskCorrectionForm({ taskDelivery }) {
  const router = useRouter()
  const pathname = usePathname()
  const segments = pathname.split('/')
  const taskDeliveryId = segments[segments.length - 1]

  const { user } = useContext(PageContext)

  const handleSubmit = async (e) => {
    e.preventDefault()

    const formData = new FormData(e.target)
    const data = Object.fromEntries(formData)

    await api.post(
      `/correcao?taskDeliveryId=${taskDeliveryId}&coordinatorId=${user.sub}`,
      data,
    )

    router.refresh()
  }

  return (
    <form action="" className="mt-6" onSubmit={handleSubmit} method="POST">
      <label htmlFor="assessment">Avaliação</label>
      {taskDelivery.Correcao ? (
        <>
          <textarea
            name="assessment"
            id="assessment"
            cols="30"
            rows="10"
            className="mt-3 mb-8 border-b block resize-none border-black w-full bg-[#F4F4F4] focus:outline-highlighted rounded-none p-2"
            placeholder="Digite o feedback da atividade"
            required
            value={taskDelivery.Correcao ? taskDelivery.Correcao.conteudo : ''}
            disabled
          ></textarea>
          <span className="block">Validação da atividade</span>
          <span className="text-sm text-black/60">
            {taskDelivery.Correcao.entregaAprovada
              ? 'Atividade aprovada'
              : 'Atividade reprovada'}
          </span>
        </>
      ) : (
        <>
          <textarea
            name="assessment"
            id="assessment"
            cols="30"
            rows="10"
            className="mt-3 mb-8 border-b block resize-none border-black w-full bg-[#F4F4F4] focus:outline-highlighted rounded-none p-2"
            placeholder="Digite o feedback da atividade"
            required
          ></textarea>
          <div className="mb-6">
            <span className="block">Validação da atividade</span>
            <div className="mb-3">
              <input
                className="mt-3 mb-2 mr-3"
                type="radio"
                name="taskVal"
                id="approve"
                value="approve"
              />
              <label htmlFor="approve">Aprovar atividade</label>
            </div>
            <div>
              <input
                value="reprove"
                type="radio"
                className="mr-3"
                name="taskVal"
                id="reprove"
              />
              <label htmlFor="reprove">Reprovar atividade</label>
            </div>
          </div>
        </>
      )}

      <button
        type="submit"
        className={`flex justify-between items-center w-full text-left font-light hover:brightness-110 transition-all text-white mt-7 mb-2 p-3 ${
          taskDelivery.Correcao ? 'bg-gray-500' : 'bg-highlighted'
        }`}
        disabled={taskDelivery.Correcao}
      >
        {taskDelivery.Correcao ? 'Correção realizada' : 'Enviar correção'}
        <ArrowRight strokeWidth={1} />
      </button>
    </form>
  )
}
