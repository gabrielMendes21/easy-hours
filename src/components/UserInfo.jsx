'use client'

import { PageContext } from '@/app/context/PageContext'
import { useContext } from 'react'

export default function UserInfo() {
  const { user } = useContext(PageContext)
  const firstName = user?.nome?.split(' ')[0]

  const coordinatorType =
    (user?.tipoUsuario === 'Coordenador ETEC' && user?.tipoUsuario) ||
    (user?.tipoUsuario === 'Coordenador IBM' && user?.tipoUsuario)

  return (
    <>
      <div className="flex justify-between items-center">
        <h1 className="text-xl md:text-3xl md:my-5 font-medium py-7">
          Olá, {firstName}!
        </h1>
        <span className="text-xs md:text-xl">
          {coordinatorType || `${user?.turma}, ${user?.escola?.nomeEscola}`}
        </span>
      </div>

      <hr className="border-[#C6C6C6] md:my-2" />
    </>
  )
}
