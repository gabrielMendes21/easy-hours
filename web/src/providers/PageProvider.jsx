'use client'

import { PageContextProvider } from '@/context/PageContext'

export const PageProvider = ({ children }) => {
  return <PageContextProvider>{children}</PageContextProvider>
}
