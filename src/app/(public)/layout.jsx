import '../globals.css'
import { PageContextProvider } from '../context/PageContext'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Easy hours',
  description:
    'Ambiente para alunos e coordenadores do programa P-TECH, da IBM',
}

export default function LoginLayout({ children }) {
  return (
    <html lang="pt-br">
      <PageContextProvider>
        <body className={`${inter.className} min-h-screen grid`}>
          {children}
        </body>
      </PageContextProvider>
    </html>
  )
}
