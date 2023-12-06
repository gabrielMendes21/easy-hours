import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

export default function TradLink({ to, size, children }) {
  return (
    <Link
      href={to}
      className={`text-highlighted text-[${
        size / 16
      }rem] underline flex items-center gap-1 mt-4 hover:brightness-110`}
    >
      {children}
      <ArrowRight size={size} />
    </Link>
  )
}
