import { AlertCircle } from 'lucide-react'

export default function LoginErrorMessages({ children }) {
  return (
    <div className="bg-red-100 py-3 px-2 flex gap-2">
      <AlertCircle color="red" strokeWidth={2} /> {children}
    </div>
  )
}
