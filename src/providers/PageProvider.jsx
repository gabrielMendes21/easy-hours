'use client'

import { PageContextProvider } from '@/app/context/PageContext'

export const PageProvider = ({ children }) => {
  return <PageContextProvider>{children}</PageContextProvider>
}
