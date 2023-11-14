import { ArrowRight } from 'lucide-react'

export default function FormSubmitButton({ title }) {
  return (
    <button
      type="submit"
      className="flex justify-between items-center w-full text-left font-light bg-highlighted hover:brightness-110 transition-all text-white mt-7 mb-2 p-3"
    >
      {title}
      <ArrowRight strokeWidth={1} />
    </button>
  )
}
