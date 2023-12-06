import Footer from '@/components/Footer'
import Header from '@/components/Header'
import { PageProvider } from '@/providers/PageProvider'
import { Inter } from 'next/font/google'
import '../globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Easy hours',
  description:
    'Ambiente para alunos e coordenadores do programa P-TECH, da IBM',
}

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br">
      <body className={`${inter.className} min-h-screen grid`}>
        <PageProvider>
          <Header hasMenu />
          {children}
          <Footer />
        </PageProvider>
      </body>
    </html>
  )
}
