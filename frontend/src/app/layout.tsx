import { AuthProvider } from '../context/AuthContext'; 
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Control de Habitos',
  description: 'App para seguimiento de habitos diarios',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider> {}
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}