'use client'

import { FileText } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import LoadingIcon from './LoadingIcon'

export default function GenerateReportButton() {
  const [icon, setIcon] = useState(<FileText strokeWidth={1} />)

  const pathname = usePathname()
  const segments = pathname.split('/')
  const classId = Number(segments[segments.length - 1])
  const coordinator = segments[segments.length - 3].split('-')[1]

  const handleChangeIcon = () => {
    setIcon(<LoadingIcon color="#FFF" />)
  }

  return (
    <Link
      href={`/api/relatorio/gerarPDF?classId=${classId}&coordinator=${coordinator}`}
      className="flex justify-between items-center w-full text-left font-light bg-highlighted hover:brightness-110 transition-all text-white mt-7 p-3"
      onClick={handleChangeIcon}
    >
      Gerar relatório
      {icon}
    </Link>
  )
}
